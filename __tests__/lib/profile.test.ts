import { describe, it, expect } from "vitest";
import { validatePhotoCount, PROFILE_RULES } from "@/lib/profile";

describe("validatePhotoCount", () => {
  it("allows adding within limit", () => {
    const result = validatePhotoCount(3, 2);
    expect(result.success).toBe(true);
  });

  it("allows adding up to exactly max", () => {
    const result = validatePhotoCount(5, 2);
    expect(result.success).toBe(true);
  });

  it("rejects adding beyond limit", () => {
    const result = validatePhotoCount(6, 2);
    expect(result.success).toBe(false);
    expect(result.message).toContain("Maximum");
  });

  it("allows adding 0 photos", () => {
    const result = validatePhotoCount(7, 0);
    expect(result.success).toBe(true);
  });
});

describe("PROFILE_RULES", () => {
  it("has max 7 photos", () => {
    expect(PROFILE_RULES.maxPhotos).toBe(7);
  });

  it("requires professional photos for dancers", () => {
    expect(PROFILE_RULES.dancerRequiresProfessionalPhotos).toBe(true);
  });

  it("does not require professional photos for clients", () => {
    expect(PROFILE_RULES.clientRequiresProfessionalPhotos).toBe(false);
  });
});
