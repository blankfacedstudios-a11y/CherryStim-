import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HapticsPanel } from "@/components/stream/HapticsPanel";

vi.mock("@/lib/webxr", () => ({
  createHapticPulse: vi.fn()
}));

import { createHapticPulse } from "@/lib/webxr";

describe("HapticsPanel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the title", () => {
    render(<HapticsPanel />);
    expect(screen.getByText("Immersive Touch Feedback")).toBeInTheDocument();
  });

  it("renders the Test Pulse button", () => {
    render(<HapticsPanel />);
    expect(screen.getByRole("button", { name: "Test Pulse" })).toBeInTheDocument();
  });

  it("renders intensity label with default 70%", () => {
    render(<HapticsPanel />);
    expect(screen.getByText("Intensity: 70%")).toBeInTheDocument();
  });

  it("renders a switch toggle", () => {
    render(<HapticsPanel />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("calls createHapticPulse when Test Pulse is clicked and enabled", async () => {
    render(<HapticsPanel />);
    await userEvent.click(screen.getByRole("button", { name: "Test Pulse" }));
    expect(createHapticPulse).toHaveBeenCalledWith(0.7, 60);
  });

  it("does not call createHapticPulse when disabled", async () => {
    render(<HapticsPanel />);
    await userEvent.click(screen.getByRole("switch"));
    await userEvent.click(screen.getByRole("button", { name: "Test Pulse" }));
    expect(createHapticPulse).not.toHaveBeenCalled();
  });
});
