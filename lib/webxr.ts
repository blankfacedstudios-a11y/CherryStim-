export async function isImmersiveVrSupported() {
  if (typeof navigator === "undefined" || !("xr" in navigator)) {
    return false;
  }
  // @ts-expect-error XR typing differs by browser implementation.
  return navigator.xr.isSessionSupported?.("immersive-vr") ?? false;
}

export function createHapticPulse(strength = 0.7, duration = 35) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(Math.max(10, Math.floor(duration * strength)));
  }
}
