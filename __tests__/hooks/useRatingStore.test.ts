import { describe, it, expect, beforeEach } from "vitest";
import { act } from "@testing-library/react";
import { useRatingStore } from "@/hooks/useRatingStore";

describe("useRatingStore", () => {
  beforeEach(() => {
    act(() => {
      useRatingStore.setState({ ratings: [], blockedClientIds: new Set() });
    });
  });

  it("starts with empty ratings", () => {
    expect(useRatingStore.getState().ratings).toHaveLength(0);
  });

  it("adds a rating", () => {
    useRatingStore.getState().addRating({
      fromUserId: "c1",
      toUserId: "d1",
      fromRole: "client",
      toRole: "dancer",
      score: 85
    });
    expect(useRatingStore.getState().ratings).toHaveLength(1);
  });

  it("returns 100 for user with no ratings", () => {
    expect(useRatingStore.getState().getRatingForUser("nobody", "dancer")).toBe(100);
  });

  it("computes dancer rating from client ratings with 0.25 weight", () => {
    useRatingStore.getState().addRating({
      fromUserId: "c1",
      toUserId: "d1",
      fromRole: "client",
      toRole: "dancer",
      score: 50
    });
    expect(useRatingStore.getState().getRatingForUser("d1", "dancer")).toBe(50);
  });

  it("returns full access for good rating client", () => {
    expect(useRatingStore.getState().getClientAccess("c1", false)).toBe("full");
  });

  it("blocks client with bad rating pattern", () => {
    const store = useRatingStore.getState();
    for (let i = 0; i < 8; i++) {
      store.addRating({
        fromUserId: "toxic-client",
        toUserId: `d${i}`,
        fromRole: "client",
        toRole: "dancer",
        score: 10
      });
    }
    expect(useRatingStore.getState().isClientBlocked("toxic-client")).toBe(true);
  });

  it("prevents blocked client from rating", () => {
    const store = useRatingStore.getState();
    store.blockClient("blocked-1");
    store.addRating({
      fromUserId: "blocked-1",
      toUserId: "d1",
      fromRole: "client",
      toRole: "dancer",
      score: 10
    });
    const ratings = useRatingStore.getState().ratings.filter((r) => r.fromUserId === "blocked-1");
    expect(ratings).toHaveLength(0);
  });

  it("can unblock a client", () => {
    const store = useRatingStore.getState();
    store.blockClient("c1");
    expect(useRatingStore.getState().isClientBlocked("c1")).toBe(true);
    store.unblockClient("c1");
    expect(useRatingStore.getState().isClientBlocked("c1")).toBe(false);
  });

  it("returns full visibility for dancer with good rating", () => {
    expect(useRatingStore.getState().getDancerVis("d1")).toBe("full");
  });
});
