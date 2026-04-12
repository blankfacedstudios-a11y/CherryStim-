import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BrowsePage from "@/app/(client)/browse/page";
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

describe("BrowsePage", () => {
  beforeEach(() => {
    mockPush.mockClear();
    act(() => {
      useStreamMode.setState({ mode: "2D" });
    });
  });

  it("renders Discover Cherries heading", () => {
    render(<BrowsePage />);
    expect(screen.getByText("Discover Cherries")).toBeInTheDocument();
  });

  it("renders all sample dancers", () => {
    render(<BrowsePage />);
    expect(screen.getByText("Luna Rose")).toBeInTheDocument();
    expect(screen.getByText("Scarlet Noir")).toBeInTheDocument();
    expect(screen.getByText("Diamond Jade")).toBeInTheDocument();
    expect(screen.getByText("Velvet Siren")).toBeInTheDocument();
  });

  it("shows current mode", () => {
    render(<BrowsePage />);
    expect(screen.getByText("Selected Mode: 2D")).toBeInTheDocument();
  });

  it("filters dancers by search term", async () => {
    render(<BrowsePage />);
    await userEvent.type(screen.getByPlaceholderText("Search dancers..."), "Luna");
    expect(screen.getByText("Luna Rose")).toBeInTheDocument();
    expect(screen.queryByText("Scarlet Noir")).not.toBeInTheDocument();
  });

  it("filters dancers by tier", async () => {
    render(<BrowsePage />);
    await userEvent.click(screen.getByRole("button", { name: "Pro" }));
    expect(screen.getByText("Diamond Jade")).toBeInTheDocument();
    expect(screen.queryByText("Luna Rose")).not.toBeInTheDocument();
  });

  it("shows All tier by default (all dancers visible)", () => {
    render(<BrowsePage />);
    const articles = screen.getAllByRole("article");
    expect(articles).toHaveLength(4);
  });

  it("renders Crush and Sprung buttons for each dancer", () => {
    render(<BrowsePage />);
    const crushButtons = screen.getAllByText("Crush ($4)");
    expect(crushButtons).toHaveLength(4);
    const sprungButtons = screen.getAllByText("Sprung ($10/mo)");
    expect(sprungButtons).toHaveLength(4);
  });
});
