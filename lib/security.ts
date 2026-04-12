export interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now - entry.windowStart > windowMs) {
    rateLimitMap.set(key, { count: 1, windowStart: now });
    return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.windowStart + windowMs };
  }

  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count, resetAt: entry.windowStart + windowMs };
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\\/g, "\\\\")
    .trim();
}

export function sanitizeDisplayName(name: string): string {
  const sanitized = sanitizeInput(name);
  if (sanitized.length < 2) return sanitized;
  if (sanitized.length > 50) return sanitized.slice(0, 50);
  return sanitized;
}

export function validateFileUpload(file: { type: string; size: number }): { valid: boolean; message: string } {
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];
  const MAX_SIZE = 10 * 1024 * 1024;

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, message: "Only JPEG, PNG, WebP, and HEIC images are allowed." };
  }
  if (file.size > MAX_SIZE) {
    return { valid: false, message: "File size must be under 10MB." };
  }
  return { valid: true, message: "OK" };
}

export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  } else {
    for (let i = 0; i < 32; i++) array[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

export const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=self, microphone=self, xr-spatial-tracking=self"
} as const;

export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' blob: data: https://images.unsplash.com",
  "media-src 'self' blob: https://storage.googleapis.com",
  "connect-src 'self' wss: https:",
  "frame-src 'self'"
].join("; ");
