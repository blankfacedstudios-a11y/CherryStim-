import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ClientDashboardPage from "@/app/(client)/dashboard/page";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { fill, priority, ...rest } = props;
    return <img {...rest} />;
  }
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  useParams: () => ({})
}));

describe("ClientDashboardPage", () => {
  it("renders Client Vault heading", () => {
    render(<ClientDashboardPage />);
    expect(screen.getByText("Client Vault")).toBeInTheDocument();
  });

  it("renders stat cards", () => {
    render(<ClientDashboardPage />);
    expect(screen.getByText("Active Crushes")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("Minutes Remaining")).toBeInTheDocument();
    expect(screen.getByText("86")).toBeInTheDocument();
    expect(screen.getByText("NFT Gifts Owned")).toBeInTheDocument();
    expect(screen.getByText("19")).toBeInTheDocument();
    expect(screen.getByText("This Month Spend")).toBeInTheDocument();
    expect(screen.getByText("$328")).toBeInTheDocument();
  });

  it("renders action cards", () => {
    render(<ClientDashboardPage />);
    expect(screen.getByText("Private Session Queue")).toBeInTheDocument();
    expect(screen.getByText("Tier Membership")).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(<ClientDashboardPage />);
    expect(screen.getByRole("button", { name: "Request a Private Room" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Upgrade Tier" })).toBeInTheDocument();
  });
});
