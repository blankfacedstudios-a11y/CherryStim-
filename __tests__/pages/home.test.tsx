import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/app/page";
import { useStreamMode } from "@/hooks/useStreamMode";
import { act } from "@testing-library/react";

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

describe("Home page", () => {
  beforeEach(() => {
    mockPush.mockClear();
    act(() => {
      useStreamMode.setState({ mode: "2D" });
    });
  });

  it("renders CHERRYSTIM heading", () => {
    render(<Home />);
    expect(screen.getByText("CHERRYSTIM")).toBeInTheDocument();
  });

  it("renders all four mode cards", () => {
    render(<Home />);
    expect(screen.getByText("2D Classic")).toBeInTheDocument();
    expect(screen.getByText("3D Experience")).toBeInTheDocument();
    expect(screen.getByText("VR Mode")).toBeInTheDocument();
    expect(screen.getByText("Full Immersive")).toBeInTheDocument();
  });

  it("does not show Enter button until a mode is clicked", () => {
    render(<Home />);
    expect(screen.queryByText(/Enter Cherrystim/)).not.toBeInTheDocument();
  });

  it("shows Enter button after clicking a mode", async () => {
    render(<Home />);
    await userEvent.click(screen.getByText("3D Experience"));
    expect(screen.getByText(/Enter Cherrystim/)).toBeInTheDocument();
  });

  it("navigates to /browse when Enter is clicked", async () => {
    render(<Home />);
    await userEvent.click(screen.getByText("VR Mode"));
    await userEvent.click(screen.getByText(/Enter Cherrystim/));
    expect(mockPush).toHaveBeenCalledWith("/browse");
  });

  it("updates the stream mode store when a mode is selected", async () => {
    render(<Home />);
    await userEvent.click(screen.getByText("Full Immersive"));
    expect(useStreamMode.getState().mode).toBe("IMMERSIVE");
  });

  it("renders mode descriptions", () => {
    render(<Home />);
    expect(screen.getByText("Ultra-smooth cinema stream")).toBeInTheDocument();
    expect(screen.getByText("Spatial depth + dynamic camera")).toBeInTheDocument();
    expect(screen.getByText("Headset-ready session room")).toBeInTheDocument();
    expect(screen.getByText("VR + touch feedback + live gifts")).toBeInTheDocument();
  });
});
