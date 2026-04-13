import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useStreamMode } from "@/hooks/useStreamMode";

describe("useStreamMode", () => {
  beforeEach(() => {
    act(() => {
      useStreamMode.setState({ mode: "2D" });
    });
  });

  it("defaults to 2D mode", () => {
    const { result } = renderHook(() => useStreamMode());
    expect(result.current.mode).toBe("2D");
  });

  it("updates mode to 3D", () => {
    const { result } = renderHook(() => useStreamMode());
    act(() => result.current.setMode("3D"));
    expect(result.current.mode).toBe("3D");
  });

  it("updates mode to VR", () => {
    const { result } = renderHook(() => useStreamMode());
    act(() => result.current.setMode("VR"));
    expect(result.current.mode).toBe("VR");
  });

  it("updates mode to IMMERSIVE", () => {
    const { result } = renderHook(() => useStreamMode());
    act(() => result.current.setMode("IMMERSIVE"));
    expect(result.current.mode).toBe("IMMERSIVE");
  });

  it("persists mode across multiple renders", () => {
    const { result, rerender } = renderHook(() => useStreamMode());
    act(() => result.current.setMode("VR"));
    rerender();
    expect(result.current.mode).toBe("VR");
  });
});
