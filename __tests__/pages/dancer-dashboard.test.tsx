import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DancerDashboard from "@/app/(dancer)/dancer/dashboard/page";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useParams: () => ({})
}));

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { fill, priority, ...rest } = props;
    return <img {...rest} />;
  }
}));

describe("DancerDashboard", () => {
  it("renders greeting", () => {
    render(<DancerDashboard />);
    expect(screen.getByText("Good Evening, Cherry")).toBeInTheDocument();
  });

  it("renders stat cards", () => {
    render(<DancerDashboard />);
    expect(screen.getByText("Total Earned")).toBeInTheDocument();
    expect(screen.getByText("$38,429")).toBeInTheDocument();
    expect(screen.getByText("Active Fans")).toBeInTheDocument();
    expect(screen.getByText("1,284")).toBeInTheDocument();
    expect(screen.getByText("Leaderboard")).toBeInTheDocument();
    expect(screen.getByText("#3")).toBeInTheDocument();
    expect(screen.getByText("School Progress")).toBeInTheDocument();
    expect(screen.getByText("87%")).toBeInTheDocument();
  });

  it("renders navigation cards including new modules", () => {
    render(<DancerDashboard />);
    expect(screen.getByText("Start Streaming")).toBeInTheDocument();
    expect(screen.getByText("Star Bright Lights")).toBeInTheDocument();
    expect(screen.getByText("SAG Pipeline")).toBeInTheDocument();
    expect(screen.getByText("Dream Wish Campaign")).toBeInTheDocument();
    expect(screen.getByText("My Profile")).toBeInTheDocument();
    expect(screen.getByText("School of Economics")).toBeInTheDocument();
  });

  it("renders Go Live Now button", () => {
    render(<DancerDashboard />);
    expect(screen.getByRole("button", { name: "Go Live Now" })).toBeInTheDocument();
  });

  it("shows tier badge and rating", () => {
    render(<DancerDashboard />);
    expect(screen.getByText("Elite")).toBeInTheDocument();
    expect(screen.getByText("92%")).toBeInTheDocument();
  });

  it("navigates to star-bright-lights", async () => {
    render(<DancerDashboard />);
    await userEvent.click(screen.getByText("Star Bright Lights"));
    expect(mockPush).toHaveBeenCalledWith("/dancer/star-bright-lights");
  });

  it("navigates to sag-pipeline", async () => {
    render(<DancerDashboard />);
    await userEvent.click(screen.getByText("SAG Pipeline"));
    expect(mockPush).toHaveBeenCalledWith("/dancer/sag-pipeline");
  });

  it("navigates to profile", async () => {
    render(<DancerDashboard />);
    await userEvent.click(screen.getByText("My Profile"));
    expect(mockPush).toHaveBeenCalledWith("/dancer/profile");
  });
});
