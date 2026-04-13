import { describe, it, expect } from "vitest";
import { PLATFORM_EMOJIS, EMOJI_CATEGORIES, getEmojiRenderConfig, getEmojisForCategory } from "@/lib/emojis";

describe("PLATFORM_EMOJIS", () => {
  it("has at least 20 emojis", () => {
    expect(PLATFORM_EMOJIS.length).toBeGreaterThanOrEqual(20);
  });

  it("each emoji has required fields", () => {
    PLATFORM_EMOJIS.forEach((e) => {
      expect(e.id).toBeTruthy();
      expect(e.symbol).toBeTruthy();
      expect(e.label).toBeTruthy();
      expect(e.animation2D).toBeTruthy();
      expect(e.animation3D).toBeTruthy();
    });
  });

  it("has flirty category emojis", () => {
    expect(getEmojisForCategory("flirty").length).toBeGreaterThanOrEqual(5);
  });

  it("has emojis with haptic pulses", () => {
    expect(PLATFORM_EMOJIS.filter((e) => e.hapticPulse).length).toBeGreaterThan(5);
  });

  it("has emojis with physics", () => {
    expect(PLATFORM_EMOJIS.filter((e) => e.hasPhysics).length).toBeGreaterThan(10);
  });

  it("has VR interactive emojis", () => {
    expect(PLATFORM_EMOJIS.filter((e) => e.interactiveInVR).length).toBeGreaterThan(5);
  });
});

describe("getEmojiRenderConfig", () => {
  it("2D mode uses enhanced 2D", () => {
    const config = getEmojiRenderConfig("2D");
    expect(config.enhanced2D).toBe(true);
    expect(config.use3DModels).toBe(false);
    expect(config.enablePhysics).toBe(false);
  });

  it("3D mode enables physics and 3D models", () => {
    const config = getEmojiRenderConfig("3D");
    expect(config.use3DModels).toBe(true);
    expect(config.enablePhysics).toBe(true);
    expect(config.enableHaptics).toBe(false);
  });

  it("IMMERSIVE enables everything", () => {
    const config = getEmojiRenderConfig("IMMERSIVE");
    expect(config.use3DModels).toBe(true);
    expect(config.enablePhysics).toBe(true);
    expect(config.enableHaptics).toBe(true);
    expect(config.enableVRInteraction).toBe(true);
    expect(config.particleCount).toBe(200);
  });

  it("VR enables VR interaction but not haptics", () => {
    const config = getEmojiRenderConfig("VR");
    expect(config.enableVRInteraction).toBe(true);
    expect(config.enableHaptics).toBe(false);
  });
});
