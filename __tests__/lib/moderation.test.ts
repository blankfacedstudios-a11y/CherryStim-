import { describe, it, expect } from "vitest";
import { moderateText, getModerationAction, MODERATION_RULES } from "@/lib/moderation";

describe("moderateText", () => {
  it("allows clean messages", () => {
    const result = moderateText("Hey beautiful, love your show tonight!");
    expect(result.clean).toBe(true);
    expect(result.severity).toBe("none");
  });

  it("blocks the word 'sex'", () => {
    const result = moderateText("let's have sex");
    expect(result.clean).toBe(false);
    expect(result.flaggedTerms).toContain("sex");
  });

  it("blocks the word 'fuck'", () => {
    const result = moderateText("what the fuck");
    expect(result.clean).toBe(false);
    expect(result.flaggedTerms).toContain("fuck");
  });

  it("blocks 'blowjob'", () => {
    const result = moderateText("give me a blowjob");
    expect(result.clean).toBe(false);
    expect(result.flaggedTerms).toContain("blowjob");
  });

  it("blocks 'flowers'", () => {
    const result = moderateText("bring me flowers");
    expect(result.clean).toBe(false);
    expect(result.flaggedTerms).toContain("flowers");
  });

  it("blocks solicitation phrases", () => {
    const result = moderateText("how much for sex");
    expect(result.clean).toBe(false);
    expect(result.severity).toBe("ban");
  });

  it("blocks 'pay for sex' with ban severity", () => {
    const result = moderateText("I want to pay for sex");
    expect(result.clean).toBe(false);
    expect(result.severity).toBe("ban");
  });

  it("blocks 'how much for a bj'", () => {
    const result = moderateText("how much for a bj");
    expect(result.clean).toBe(false);
    expect(result.severity).toBe("ban");
  });

  it("blocks 'how much for head'", () => {
    const result = moderateText("how much for head");
    expect(result.clean).toBe(false);
    expect(result.severity).toBe("ban");
  });

  it("detects leet speak evasion (s3x -> sex)", () => {
    const result = moderateText("let's have s3x");
    expect(result.clean).toBe(false);
  });

  it("detects $ substitution (s3x)", () => {
    const result = moderateText("want some s3x");
    expect(result.clean).toBe(false);
  });

  it("sanitizes blocked words to ***", () => {
    const result = moderateText("you're so sexy");
    expect(result.clean).toBe(false);
    expect(result.sanitized).not.toContain("sex");
  });

  it("blocks solicitation patterns", () => {
    const result = moderateText("What's your rate for a private?");
    expect(result.clean).toBe(false);
  });

  it("allows normal compliments", () => {
    expect(moderateText("You're amazing dancer!").clean).toBe(true);
    expect(moderateText("Great moves tonight!").clean).toBe(true);
    expect(moderateText("You're so talented").clean).toBe(true);
  });

  it("allows tipping language", () => {
    expect(moderateText("Sending you a big tip!").clean).toBe(true);
    expect(moderateText("You deserve all the gifts").clean).toBe(true);
  });
});

describe("getModerationAction", () => {
  it("allows clean messages", () => {
    const result = moderateText("hello!");
    const action = getModerationAction(result, 0);
    expect(action.type).toBe("allow");
  });

  it("blocks message on first warning", () => {
    const result = moderateText("you're sexy");
    const action = getModerationAction(result, 0);
    expect(action.type).toBe("block_message");
  });

  it("mutes user on second violation", () => {
    const result = moderateText("you're sexy");
    const action = getModerationAction(result, 1);
    expect(action.type).toBe("mute_user");
  });

  it("temp bans on 3+ violations", () => {
    const result = moderateText("you're sexy");
    const action = getModerationAction(result, 3);
    expect(action.type).toBe("temp_ban");
  });

  it("temp bans immediately for solicitation", () => {
    const result = moderateText("pay for sex");
    const action = getModerationAction(result, 0);
    expect(action.type).toBe("temp_ban");
  });
});

describe("MODERATION_RULES", () => {
  it("has voice flagging enabled", () => {
    expect(MODERATION_RULES.voiceFlaggingEnabled).toBe(true);
  });

  it("has real-time text scan enabled", () => {
    expect(MODERATION_RULES.realTimeTextScanEnabled).toBe(true);
  });

  it("temp ban is 24 hours", () => {
    expect(MODERATION_RULES.tempBanDurationMs).toBe(24 * 60 * 60 * 1000);
  });
});
