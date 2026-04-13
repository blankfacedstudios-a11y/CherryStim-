import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const mockToJwt = vi.fn().mockReturnValue("header.payload.signature");
const mockAddGrant = vi.fn();

vi.mock("livekit-server-sdk", () => {
  return {
    AccessToken: class MockAccessToken {
      constructor(...args: unknown[]) {
        MockAccessToken._constructorArgs.push(args);
      }
      static _constructorArgs: unknown[][] = [];
      addGrant = mockAddGrant;
      toJwt = mockToJwt;
    }
  };
});

import { AccessToken } from "livekit-server-sdk";

describe("createLiveKitToken", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    (AccessToken as unknown as { _constructorArgs: unknown[][] })._constructorArgs = [];
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("throws when LIVEKIT_API_KEY is missing", async () => {
    delete process.env.LIVEKIT_API_KEY;
    delete process.env.LIVEKIT_API_SECRET;
    const { createLiveKitToken } = await import("@/lib/livekit");
    expect(() =>
      createLiveKitToken({ roomName: "room-1", participantName: "user-1" })
    ).toThrow("Missing LiveKit credentials.");
  });

  it("throws when LIVEKIT_API_SECRET is missing", async () => {
    process.env.LIVEKIT_API_KEY = "test-key";
    delete process.env.LIVEKIT_API_SECRET;
    const { createLiveKitToken } = await import("@/lib/livekit");
    expect(() =>
      createLiveKitToken({ roomName: "room-1", participantName: "user-1" })
    ).toThrow("Missing LiveKit credentials.");
  });

  it("creates AccessToken with correct credentials", async () => {
    process.env.LIVEKIT_API_KEY = "devkey";
    process.env.LIVEKIT_API_SECRET = "devsecret";
    const { createLiveKitToken } = await import("@/lib/livekit");
    createLiveKitToken({
      roomName: "room-42",
      participantName: "alice"
    });
    const args = (AccessToken as unknown as { _constructorArgs: unknown[][] })._constructorArgs;
    expect(args[0]).toEqual(["devkey", "devsecret", { identity: "alice" }]);
  });

  it("returns the JWT from AccessToken.toJwt()", async () => {
    process.env.LIVEKIT_API_KEY = "devkey";
    process.env.LIVEKIT_API_SECRET = "devsecret";
    const { createLiveKitToken } = await import("@/lib/livekit");
    const token = createLiveKitToken({
      roomName: "room-42",
      participantName: "bob"
    });
    expect(token).toBe("header.payload.signature");
  });

  it("passes canPublish=false and canSubscribe=true by default", async () => {
    process.env.LIVEKIT_API_KEY = "devkey";
    process.env.LIVEKIT_API_SECRET = "devsecret";
    const { createLiveKitToken } = await import("@/lib/livekit");
    createLiveKitToken({
      roomName: "room-42",
      participantName: "charlie"
    });
    expect(mockAddGrant).toHaveBeenCalledWith({
      roomJoin: true,
      room: "room-42",
      canPublish: false,
      canSubscribe: true
    });
  });

  it("passes custom canPublish and canSubscribe values", async () => {
    process.env.LIVEKIT_API_KEY = "devkey";
    process.env.LIVEKIT_API_SECRET = "devsecret";
    const { createLiveKitToken } = await import("@/lib/livekit");
    createLiveKitToken({
      roomName: "room-99",
      participantName: "dave",
      canPublish: true,
      canSubscribe: false
    });
    expect(mockAddGrant).toHaveBeenCalledWith({
      roomJoin: true,
      room: "room-99",
      canPublish: true,
      canSubscribe: false
    });
  });
});
