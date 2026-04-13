import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useWebXR } from "@/hooks/useWebXR";

describe("useWebXR", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(navigator, "xr", {
      value: undefined,
      configurable: true,
      writable: true
    });
  });

  it("starts with isInXR false and no error", () => {
    const { result } = renderHook(() => useWebXR());
    expect(result.current.isInXR).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("sets error when WebXR is not supported", async () => {
    const { result } = renderHook(() => useWebXR());
    await act(async () => {
      await result.current.enterXR();
    });
    expect(result.current.error).toBe("WebXR is not supported in this browser.");
    expect(result.current.isInXR).toBe(false);
  });

  it("enters XR when navigator.xr is available and session succeeds", async () => {
    Object.defineProperty(navigator, "xr", {
      value: {
        requestSession: vi.fn().mockResolvedValue({})
      },
      configurable: true
    });

    const { result } = renderHook(() => useWebXR());
    await act(async () => {
      await result.current.enterXR();
    });
    expect(result.current.isInXR).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it("sets error when requestSession throws", async () => {
    Object.defineProperty(navigator, "xr", {
      value: {
        requestSession: vi.fn().mockRejectedValue(new Error("denied"))
      },
      configurable: true
    });

    const { result } = renderHook(() => useWebXR());
    await act(async () => {
      await result.current.enterXR();
    });
    expect(result.current.error).toBe("Unable to enter immersive mode.");
    expect(result.current.isInXR).toBe(false);
  });

  it("exitXR sets isInXR to false", async () => {
    Object.defineProperty(navigator, "xr", {
      value: {
        requestSession: vi.fn().mockResolvedValue({})
      },
      configurable: true
    });

    const { result } = renderHook(() => useWebXR());
    await act(async () => {
      await result.current.enterXR();
    });
    expect(result.current.isInXR).toBe(true);

    act(() => {
      result.current.exitXR();
    });
    expect(result.current.isInXR).toBe(false);
  });
});
