import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SagPipelinePage from "@/app/(dancer)/dancer/sag-pipeline/page";
import { useCastingStore } from "@/hooks/useCastingStore";
import { SAG_PIPELINE_STEPS } from "@/lib/casting";
import { act } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  useParams: () => ({})
}));

describe("SagPipelinePage", () => {
  beforeEach(() => {
    act(() => {
      useCastingStore.setState({
        sagPipeline: SAG_PIPELINE_STEPS.map((s) => ({ ...s, completed: false }))
      });
    });
  });

  it("renders the page heading", () => {
    render(<SagPipelinePage />);
    expect(screen.getByText("SAG Pipeline")).toBeInTheDocument();
  });

  it("renders all 10 pipeline steps", () => {
    render(<SagPipelinePage />);
    expect(screen.getByText("Check SAG-AFTRA Eligibility")).toBeInTheDocument();
    expect(screen.getByText("Join SAG-AFTRA")).toBeInTheDocument();
    expect(screen.getByText("Secure Representation")).toBeInTheDocument();
    expect(screen.getByText("Build Your Brand & Social Presence")).toBeInTheDocument();
  });

  it("shows 0% progress initially", () => {
    render(<SagPipelinePage />);
    expect(screen.getByText("0% Complete")).toBeInTheDocument();
  });

  it("renders Mark Complete buttons for incomplete steps", () => {
    render(<SagPipelinePage />);
    const buttons = screen.getAllByText("Mark Complete");
    expect(buttons).toHaveLength(10);
  });

  it("marks a step complete when button is clicked", async () => {
    render(<SagPipelinePage />);
    const buttons = screen.getAllByText("Mark Complete");
    await userEvent.click(buttons[0]);
    expect(screen.getByText("10% Complete")).toBeInTheDocument();
  });
});
