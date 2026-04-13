import { describe, it, expect } from "vitest";
import { sanitizeInput, sanitizeDisplayName, validateFileUpload, checkRateLimit, generateCSRFToken, SECURITY_HEADERS } from "@/lib/security";

describe("sanitizeInput", () => {
  it("escapes HTML entities", () => {
    expect(sanitizeInput('<script>alert("xss")</script>')).toBe("&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;");
  });

  it("escapes ampersands", () => {
    expect(sanitizeInput("a & b")).toBe("a &amp; b");
  });

  it("trims whitespace", () => {
    expect(sanitizeInput("  hello  ")).toBe("hello");
  });

  it("handles empty string", () => {
    expect(sanitizeInput("")).toBe("");
  });
});

describe("sanitizeDisplayName", () => {
  it("truncates to 50 chars", () => {
    const long = "a".repeat(100);
    expect(sanitizeDisplayName(long).length).toBe(50);
  });

  it("preserves short valid names", () => {
    expect(sanitizeDisplayName("Cherry Rose")).toBe("Cherry Rose");
  });
});

describe("validateFileUpload", () => {
  it("accepts JPEG", () => {
    expect(validateFileUpload({ type: "image/jpeg", size: 1024 }).valid).toBe(true);
  });

  it("accepts PNG", () => {
    expect(validateFileUpload({ type: "image/png", size: 1024 }).valid).toBe(true);
  });

  it("rejects GIF", () => {
    expect(validateFileUpload({ type: "image/gif", size: 1024 }).valid).toBe(false);
  });

  it("rejects oversized files", () => {
    expect(validateFileUpload({ type: "image/jpeg", size: 20 * 1024 * 1024 }).valid).toBe(false);
  });

  it("accepts files at exactly 10MB", () => {
    expect(validateFileUpload({ type: "image/jpeg", size: 10 * 1024 * 1024 }).valid).toBe(true);
  });
});

describe("checkRateLimit", () => {
  it("allows first request", () => {
    const result = checkRateLimit("test-key-1", 5, 60000);
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(4);
  });

  it("blocks after exceeding limit", () => {
    for (let i = 0; i < 5; i++) {
      checkRateLimit("test-key-2", 5, 60000);
    }
    const result = checkRateLimit("test-key-2", 5, 60000);
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });
});

describe("generateCSRFToken", () => {
  it("returns a 64-char hex string", () => {
    const token = generateCSRFToken();
    expect(token).toMatch(/^[0-9a-f]{64}$/);
  });

  it("generates unique tokens", () => {
    const t1 = generateCSRFToken();
    const t2 = generateCSRFToken();
    expect(t1).not.toBe(t2);
  });
});

describe("SECURITY_HEADERS", () => {
  it("includes X-Content-Type-Options", () => {
    expect(SECURITY_HEADERS["X-Content-Type-Options"]).toBe("nosniff");
  });

  it("includes X-Frame-Options", () => {
    expect(SECURITY_HEADERS["X-Frame-Options"]).toBe("DENY");
  });

  it("includes Permissions-Policy with xr-spatial-tracking", () => {
    expect(SECURITY_HEADERS["Permissions-Policy"]).toContain("xr-spatial-tracking");
  });
});
