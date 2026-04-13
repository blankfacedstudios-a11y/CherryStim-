import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RatingBadge } from "@/components/profile/RatingBadge";

describe("RatingBadge", () => {
  it("renders rating percentage", () => {
    render(<RatingBadge rating={92} />);
    expect(screen.getByText("92%")).toBeInTheDocument();
  });

  it("renders low rating with warning styling", () => {
    const { container } = render(<RatingBadge rating={50} />);
    expect(container.innerHTML).toContain("text-red-400");
  });

  it("renders high rating with emerald styling", () => {
    const { container } = render(<RatingBadge rating={95} />);
    expect(container.innerHTML).toContain("text-emerald-400");
  });

  it("renders moderate rating with gold styling", () => {
    const { container } = render(<RatingBadge rating={80} />);
    expect(container.innerHTML).toContain("text-gold-400");
  });

  it("applies sm size", () => {
    const { container } = render(<RatingBadge rating={80} size="sm" />);
    expect(container.firstChild).toHaveClass("text-xs");
  });
});
