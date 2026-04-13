import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GatePage from "@/app/gate/page";
import { useStreamMode } from "@/hooks/useStreamMode";
import { act } from "@testing-library/react";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useParams: () => ({})
}));

describe("GatePage", () => {
  beforeEach(() => {
    mockPush.mockClear();
    act(() => {
      useStreamMode.setState({ mode: "2D" });
    });
  });

  it("renders CHERRYSTIM heading", () => {
    render(<GatePage />);
    expect(screen.getByText("CHERRYSTIM")).toBeInTheDocument();
  });

  it("shows role selection first (viewer and dancer)", () => {
    render(<GatePage />);
    expect(screen.getByText("I'm a Viewer")).toBeInTheDocument();
    expect(screen.getByText("I'm a Dancer")).toBeInTheDocument();
  });

  it("shows mode cards after selecting viewer role", async () => {
    render(<GatePage />);
    await userEvent.click(screen.getByText("I'm a Viewer"));
    expect(screen.getByText("2D Classic")).toBeInTheDocument();
    expect(screen.getByText("3D Experience")).toBeInTheDocument();
    expect(screen.getByText("VR Mode")).toBeInTheDocument();
    expect(screen.getByText("Full Immersive")).toBeInTheDocument();
  });

  it("navigates to home page when viewer selects a mode", async () => {
    render(<GatePage />);
    await userEvent.click(screen.getByText("I'm a Viewer"));
    await userEvent.click(screen.getByText("3D Experience"));
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("navigates to dancer dashboard when dancer selects a mode", async () => {
    render(<GatePage />);
    await userEvent.click(screen.getByText("I'm a Dancer"));
    await userEvent.click(screen.getByText("2D Classic"));
    expect(mockPush).toHaveBeenCalledWith("/dancer/dashboard");
  });

  it("shows mobile compatibility note", async () => {
    render(<GatePage />);
    await userEvent.click(screen.getByText("I'm a Viewer"));
    expect(screen.getByText("All modes work on mobile")).toBeInTheDocument();
  });

  it("allows changing role selection", async () => {
    render(<GatePage />);
    await userEvent.click(screen.getByText("I'm a Viewer"));
    await userEvent.click(screen.getByText(/Change role/));
    expect(screen.getByText("I'm a Viewer")).toBeInTheDocument();
    expect(screen.getByText("I'm a Dancer")).toBeInTheDocument();
  });
});
