import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DreamWishPage from "@/app/(dancer)/dancer/dream-wish/page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  useParams: () => ({})
}));

describe("DreamWishPage", () => {
  it("renders page heading", () => {
    render(<DreamWishPage />);
    expect(screen.getByText("Dream Wish Campaigns")).toBeInTheDocument();
  });

  it("renders campaign cards", () => {
    render(<DreamWishPage />);
    expect(screen.getByText("Mocap Studio Upgrade")).toBeInTheDocument();
    expect(screen.getByText("Dubai Flagship Residency")).toBeInTheDocument();
  });

  it("shows campaign progress percentages", () => {
    render(<DreamWishPage />);
    expect(screen.getByText("72% funded")).toBeInTheDocument();
    expect(screen.getByText("48% funded")).toBeInTheDocument();
  });

  it("shows raised amounts", () => {
    render(<DreamWishPage />);
    expect(screen.getByText(/\$8,600 raised of \$12,000/)).toBeInTheDocument();
    expect(screen.getByText(/\$11,950 raised of \$25,000/)).toBeInTheDocument();
  });

  it("renders Start New Campaign button", () => {
    render(<DreamWishPage />);
    expect(screen.getByRole("button", { name: "Start New Campaign" })).toBeInTheDocument();
  });
});
