import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TierBadge } from "@/components/profile/TierBadge";

describe("TierBadge", () => {
  it("renders dancer tier label", () => {
    render(<TierBadge tier="virtuoso" type="dancer" />);
    expect(screen.getByText("Virtuoso")).toBeInTheDocument();
  });

  it("renders pro tier", () => {
    render(<TierBadge tier="pro" type="dancer" />);
    expect(screen.getByText("Pro")).toBeInTheDocument();
  });

  it("renders rising tier", () => {
    render(<TierBadge tier="rising" type="dancer" />);
    expect(screen.getByText("Rising")).toBeInTheDocument();
  });

  it("applies sm size class", () => {
    const { container } = render(<TierBadge tier="elite" type="dancer" size="sm" />);
    expect(container.firstChild).toHaveClass("text-xs");
  });
});
