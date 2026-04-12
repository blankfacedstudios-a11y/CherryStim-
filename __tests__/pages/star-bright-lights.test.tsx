import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StarBrightLightsPage from "@/app/(dancer)/dancer/star-bright-lights/page";
import { useCastingStore } from "@/hooks/useCastingStore";
import { act } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  useParams: () => ({})
}));

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
  Toaster: () => null
}));

describe("StarBrightLightsPage", () => {
  beforeEach(() => {
    act(() => {
      useCastingStore.setState({ applications: [], notifications: [] });
    });
  });

  it("renders the page heading", () => {
    render(<StarBrightLightsPage />);
    expect(screen.getByText("Star Bright Lights")).toBeInTheDocument();
  });

  it("renders casting opportunities", () => {
    render(<StarBrightLightsPage />);
    expect(screen.getByText(/Midnight Garden/)).toBeInTheDocument();
    expect(screen.getByText(/HBO Series/)).toBeInTheDocument();
    expect(screen.getByText(/Luxury Swimwear/)).toBeInTheDocument();
  });

  it("shows SAG-AFTRA badge on SAG opportunities", () => {
    render(<StarBrightLightsPage />);
    const sagBadges = screen.getAllByText("SAG-AFTRA");
    expect(sagBadges.length).toBeGreaterThan(0);
  });

  it("renders Apply Now buttons", () => {
    render(<StarBrightLightsPage />);
    const buttons = screen.getAllByText("Apply Now");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("shows application form when Apply Now is clicked", async () => {
    render(<StarBrightLightsPage />);
    const buttons = screen.getAllByText("Apply Now");
    await userEvent.click(buttons[0]);
    expect(screen.getByPlaceholderText(/Cover letter/)).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("filters by opportunity type", async () => {
    render(<StarBrightLightsPage />);
    const filmButtons = screen.getAllByText("Film");
    await userEvent.click(filmButtons[0]);
    expect(screen.getByText(/Midnight Garden/)).toBeInTheDocument();
    expect(screen.queryByText(/HBO Series/)).not.toBeInTheDocument();
  });

  it("renders the 64/36 split information", () => {
    render(<StarBrightLightsPage />);
    expect(screen.getByText(/64\/36/)).toBeInTheDocument();
  });
});
