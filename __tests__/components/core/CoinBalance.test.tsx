import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { CoinBalance } from "@/components/core/CoinBalance";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { fill, priority, ...rest } = props;
    return <img {...rest} />;
  }
}));

describe("CoinBalance", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders initial balance of 2,840", () => {
    render(<CoinBalance />);
    expect(screen.getByText("2,840")).toBeInTheDocument();
  });

  it("shows Cherrystim Coins label", () => {
    render(<CoinBalance />);
    expect(screen.getByText("Cherrystim Coins")).toBeInTheDocument();
  });

  it("shows Buy button", () => {
    render(<CoinBalance />);
    expect(screen.getByRole("button", { name: "Buy" })).toBeInTheDocument();
  });

  it("increments balance over time", () => {
    vi.useFakeTimers();
    render(<CoinBalance />);
    expect(screen.getByText("2,840")).toBeInTheDocument();

    vi.spyOn(Math, "random").mockReturnValue(0.5);

    act(() => {
      vi.advanceTimersByTime(45_000);
    });

    expect(screen.getByText("2,841")).toBeInTheDocument();
    vi.spyOn(Math, "random").mockRestore();
  });
});
