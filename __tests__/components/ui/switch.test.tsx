import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from "@/components/ui/switch";

describe("Switch", () => {
  it("renders with role switch", () => {
    render(<Switch checked={false} onCheckedChange={() => {}} />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("reflects checked state via aria-checked", () => {
    render(<Switch checked={true} onCheckedChange={() => {}} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("reflects unchecked state via aria-checked", () => {
    render(<Switch checked={false} onCheckedChange={() => {}} />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("calls onCheckedChange with toggled value when clicked", async () => {
    const handler = vi.fn();
    render(<Switch checked={false} onCheckedChange={handler} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(handler).toHaveBeenCalledWith(true);
  });

  it("calls onCheckedChange with false when currently checked", async () => {
    const handler = vi.fn();
    render(<Switch checked={true} onCheckedChange={handler} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(handler).toHaveBeenCalledWith(false);
  });

  it("applies cherry-600 class when checked", () => {
    render(<Switch checked={true} onCheckedChange={() => {}} />);
    expect(screen.getByRole("switch").className).toContain("bg-cherry-600");
  });

  it("applies custom className", () => {
    render(<Switch checked={false} onCheckedChange={() => {}} className="extra" />);
    expect(screen.getByRole("switch").className).toContain("extra");
  });
});
