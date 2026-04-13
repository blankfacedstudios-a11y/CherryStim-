import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GiftThrower, { useGiftStore } from "@/components/stream/GiftThrower";
import { act } from "@testing-library/react";

vi.mock("@/lib/webxr", () => ({
  createHapticPulse: vi.fn()
}));

vi.mock("@react-three/fiber", () => ({
  useFrame: vi.fn()
}));

describe("GiftThrower (panel mode)", () => {
  beforeEach(() => {
    act(() => {
      useGiftStore.setState({ gifts: [] });
    });
    vi.clearAllMocks();
  });

  it("renders gift buttons", () => {
    render(<GiftThrower dancerId="1" />);
    expect(screen.getByText(/Diamond NFT/)).toBeInTheDocument();
    expect(screen.getByText(/Luxury Bag NFT/)).toBeInTheDocument();
    expect(screen.getByText(/Supercar NFT/)).toBeInTheDocument();
  });

  it("shows dancer ID in header", () => {
    render(<GiftThrower dancerId="42" />);
    expect(screen.getByText(/Dancer #42/)).toBeInTheDocument();
  });

  it("adds a gift to the store when button is clicked", async () => {
    render(<GiftThrower dancerId="1" />);
    await userEvent.click(screen.getByText(/Diamond NFT/));
    expect(useGiftStore.getState().gifts).toHaveLength(1);
    expect(useGiftStore.getState().gifts[0].type).toBe("diamond");
  });

  it("calls onGiftThrown callback when a gift is thrown", async () => {
    const handler = vi.fn();
    render(<GiftThrower dancerId="1" onGiftThrown={handler} />);
    await userEvent.click(screen.getByText(/Luxury Bag NFT/));
    expect(handler).toHaveBeenCalledWith("bag");
  });

  it("shows prices for each gift type", () => {
    render(<GiftThrower dancerId="1" />);
    expect(screen.getByText(/120 C/)).toBeInTheDocument();
    expect(screen.getByText(/180 C/)).toBeInTheDocument();
    expect(screen.getByText(/400 C/)).toBeInTheDocument();
  });
});

describe("useGiftStore", () => {
  beforeEach(() => {
    act(() => {
      useGiftStore.setState({ gifts: [] });
    });
  });

  it("throwGift adds to gifts array", () => {
    const gift = useGiftStore.getState().throwGift("diamond");
    expect(gift.type).toBe("diamond");
    expect(useGiftStore.getState().gifts).toHaveLength(1);
  });

  it("removeGift removes a specific gift", () => {
    const gift = useGiftStore.getState().throwGift("bag");
    useGiftStore.getState().removeGift(gift.id);
    expect(useGiftStore.getState().gifts).toHaveLength(0);
  });

  it("multiple gifts can be added", () => {
    useGiftStore.getState().throwGift("diamond");
    useGiftStore.getState().throwGift("car");
    useGiftStore.getState().throwGift("bag");
    expect(useGiftStore.getState().gifts).toHaveLength(3);
  });
});
