import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Logo } from "@/components/core/Logo";
import { vi } from "vitest";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { fill, priority, ...rest } = props;
    return <img {...rest} />;
  }
}));

describe("Logo", () => {
  it("renders an image with alt text Cherrystim", () => {
    render(<Logo />);
    const img = screen.getByAltText("Cherrystim");
    expect(img).toBeInTheDocument();
  });

  it("uses the correct logo source path", () => {
    render(<Logo />);
    const img = screen.getByAltText("Cherrystim");
    expect(img).toHaveAttribute("src", "/logo/cherrystim-logo.png");
  });

  it("applies custom className to wrapper", () => {
    const { container } = render(<Logo className="my-class" />);
    expect(container.firstChild).toHaveClass("my-class");
  });
});
