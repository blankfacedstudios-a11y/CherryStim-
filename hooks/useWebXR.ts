"use client";

import { useCallback, useState } from "react";

export function useWebXR() {
  const [isInXR, setIsInXR] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enterXR = useCallback(async () => {
    if (!navigator.xr) {
      setError("WebXR is not supported in this browser.");
      return;
    }
    try {
      await navigator.xr.requestSession("immersive-vr", {
        optionalFeatures: ["local-floor", "hand-tracking"]
      });
      setIsInXR(true);
      setError(null);
    } catch {
      setError("Unable to enter immersive mode.");
    }
  }, []);

  const exitXR = useCallback(() => {
    setIsInXR(false);
  }, []);

  return { isInXR, enterXR, exitXR, error };
}
