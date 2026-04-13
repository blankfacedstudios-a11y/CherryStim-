import { describe, it, expect, vi, beforeEach } from "vitest";
import { isImmersiveVrSupported, createHapticPulse } from "@/lib/webxr";

describe("isImmersiveVrSupported", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns false when navigator.xr is absent", async () => {
    const result = await isImmersiveVrSupported();
    expect(result).toBe(false);
  });

  it("returns true when isSessionSupported resolves to true", async () => {
    Object.defineProperty(navigator, "xr", {
      value: { isSessionSupported: vi.fn().mockResolvedValue(true) },
      configurable: true
    });
    const result = await isImmersiveVrSupported();
    expect(result).toBe(true);
  });

  it("returns false when isSessionSupported resolves to false", async () => {
    Object.defineProperty(navigator, "xr", {
      value: { isSessionSupported: vi.fn().mockResolvedValue(false) },
      configurable: true
    });
    const result = await isImmersiveVrSupported();
    expect(result).toBe(false);
  });

  it("returns false when isSessionSupported is undefined", async () => {
    Object.defineProperty(navigator, "xr", {
      value: {},
      configurable: true
    });
    const result = await isImmersiveVrSupported();
    expect(result).toBe(false);
  });
});

describe("createHapticPulse", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("calls navigator.vibrate with computed duration", () => {
    const vibrateSpy = vi.fn();
    Object.defineProperty(navigator, "vibrate", {
      value: vibrateSpy,
      configurable: true
    });

    createHapticPulse(0.7, 35);
    expect(vibrateSpy).toHaveBeenCalledWith(Math.max(10, Math.floor(35 * 0.7)));
  });

  it("uses default parameters when none provided", () => {
    const vibrateSpy = vi.fn();
    Object.defineProperty(navigator, "vibrate", {
      value: vibrateSpy,
      configurable: true
    });

    createHapticPulse();
    expect(vibrateSpy).toHaveBeenCalledWith(Math.max(10, Math.floor(35 * 0.7)));
  });

  it("enforces minimum duration of 10ms", () => {
    const vibrateSpy = vi.fn();
    Object.defineProperty(navigator, "vibrate", {
      value: vibrateSpy,
      configurable: true
    });

    createHapticPulse(0.01, 1);
    expect(vibrateSpy).toHaveBeenCalledWith(10);
  });

  it("does not throw when navigator.vibrate is absent", () => {
    const descriptor = Object.getOwnPropertyDescriptor(navigator, "vibrate");
    if (descriptor) {
      delete (navigator as Record<string, unknown>)["vibrate"];
    }
    expect(() => createHapticPulse()).not.toThrow();
  });
});
