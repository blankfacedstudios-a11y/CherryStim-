import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StreamSetup from "@/app/(dancer)/dancer/stream-setup/page";
import { useStreamMode } from "@/hooks/useStreamMode";
import { act } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  useParams: () => ({})
}));

describe("StreamSetup", () => {
  beforeEach(() => {
    act(() => {
      useStreamMode.setState({ mode: "2D" });
    });
  });

  it("renders page heading", () => {
    render(<StreamSetup />);
    expect(screen.getByText("Stream Setup")).toBeInTheDocument();
  });

  it("renders all streaming mode buttons", () => {
    render(<StreamSetup />);
    expect(screen.getByText("2D")).toBeInTheDocument();
    expect(screen.getByText("3D")).toBeInTheDocument();
    expect(screen.getByText("VR")).toBeInTheDocument();
    expect(screen.getByText("IMMERSIVE")).toBeInTheDocument();
  });

  it("renders revenue split section with correct gear options", () => {
    render(<StreamSetup />);
    expect(screen.getByText("Cherrystim Provided")).toBeInTheDocument();
    expect(screen.getByText("Leased Gear")).toBeInTheDocument();
    expect(screen.getByText("My Own Gear")).toBeInTheDocument();
  });

  it("shows default revenue split (70/30 for cherrystim gear)", () => {
    render(<StreamSetup />);
    expect(screen.getByText(/Performer keeps 70%/)).toBeInTheDocument();
    expect(screen.getByText(/Platform keeps 30%/)).toBeInTheDocument();
  });

  it("updates stream mode when mode button is clicked", async () => {
    render(<StreamSetup />);
    await userEvent.click(screen.getByText("VR"));
    expect(useStreamMode.getState().mode).toBe("VR");
  });

  it("renders haptics toggle", () => {
    render(<StreamSetup />);
    expect(screen.getByText("Enable immersive touch feedback")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders Save & Go Live and Preview Stream buttons", () => {
    render(<StreamSetup />);
    expect(screen.getByRole("button", { name: "Save & Go Live" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Preview Stream/ })).toBeInTheDocument();
  });

  it("shows 55/45 split when dancer owns gear", async () => {
    render(<StreamSetup />);
    await userEvent.click(screen.getByText("My Own Gear"));
    expect(screen.getByText(/Performer keeps 55%/)).toBeInTheDocument();
    expect(screen.getByText(/Platform keeps 45%/)).toBeInTheDocument();
  });
});
