import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "@/components/ui/card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies default classes", () => {
    render(<Card data-testid="card">Content</Card>);
    const card = screen.getByTestId("card");
    expect(card.className).toContain("rounded-3xl");
    expect(card.className).toContain("border");
  });

  it("merges custom className", () => {
    render(<Card className="my-custom" data-testid="card">Content</Card>);
    expect(screen.getByTestId("card").className).toContain("my-custom");
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Card ref={ref}>Content</Card>);
    expect(ref).toHaveBeenCalled();
  });

  it("passes through HTML attributes", () => {
    render(<Card data-testid="card" id="test-card">Content</Card>);
    expect(screen.getByTestId("card")).toHaveAttribute("id", "test-card");
  });
});
