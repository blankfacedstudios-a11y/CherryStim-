export interface ModerationResult {
  clean: boolean;
  flaggedTerms: string[];
  severity: "none" | "warning" | "block" | "ban";
  sanitized: string;
}

const BLOCKED_EXACT_PHRASES = [
  "pay for sex", "how much for sex", "how much for head",
  "how much for a bj", "how much for a blowjob",
  "sex for money", "cash for sex", "money for sex",
  "buy sex", "sell sex", "sex work", "escort service",
  "happy ending", "full service", "pay to play",
  "how much for everything", "what are your rates",
  "come to my hotel", "come to my room",
  "meet up for fun", "meet in person"
];

const BLOCKED_WORDS = [
  "sex", "fuck", "blowjob", "bj", "handjob", "hj",
  "prostitute", "prostitution", "hooker", "whore",
  "escort", "pimp", "trick",
  "anal", "cum", "dick", "cock", "pussy", "tits",
  "nude", "nudes", "naked",
  "orgasm", "orgy", "threesome", "foursome",
  "masturbate", "masturbation", "jerk off",
  "suck me", "ride me", "bang me",
  "onlyfans", "fansly",
  "cashapp me", "venmo me", "paypal me",
  "flowers"
];

const SOLICITATION_PATTERNS = [
  /how much (?:for|to|do you charge)/i,
  /what(?:'s| is) your (?:rate|price|fee)/i,
  /(?:can|will) you (?:meet|come|visit)/i,
  /(?:do you|can you) (?:do|offer) (?:extra|more|private)/i,
  /pay(?:ing)? (?:you|for) (?:extra|private|special)/i,
  /\$\d+.*(?:for|to get|hour|hr|session)/i,
  /(?:send|give|get) (?:me )?(?:your|my) (?:number|address|location|snap|insta)/i
];

function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .replace(/[0-9]/g, (d) => {
      const map: Record<string, string> = { "0": "o", "1": "i", "3": "e", "4": "a", "5": "s", "7": "t", "8": "b" };
      return map[d] ?? d;
    })
    .replace(/[@]/g, "a")
    .replace(/[!|]/g, "i")
    .replace(/[$]/g, "s")
    .replace(/[*_]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function generateVariants(word: string): string[] {
  const variants = [word];
  const substitutions: Record<string, string[]> = {
    a: ["@", "4"], e: ["3"], i: ["1", "!", "|"], o: ["0"], s: ["$", "5"], t: ["7"], b: ["8"],
    u: ["v"], c: ["k"], ck: ["k", "cc"]
  };
  let current = word;
  for (const [letter, replacements] of Object.entries(substitutions)) {
    for (const rep of replacements) {
      if (current.includes(letter)) {
        variants.push(current.replace(new RegExp(letter, "g"), rep));
      }
    }
  }
  return variants;
}

const BLOCKED_WORD_VARIANTS = new Set<string>();
for (const word of BLOCKED_WORDS) {
  BLOCKED_WORD_VARIANTS.add(word);
  for (const variant of generateVariants(word)) {
    BLOCKED_WORD_VARIANTS.add(variant);
  }
}

export function moderateText(input: string): ModerationResult {
  const normalized = normalizeText(input);
  const flaggedTerms: string[] = [];

  for (const phrase of BLOCKED_EXACT_PHRASES) {
    if (normalized.includes(phrase.toLowerCase())) {
      flaggedTerms.push(phrase);
    }
  }

  const words = normalized.split(/\s+/);
  for (const word of words) {
    const cleanWord = word.replace(/[^a-z]/g, "");
    for (const blocked of BLOCKED_WORDS) {
      if (cleanWord === blocked || cleanWord.includes(blocked)) {
        if (!flaggedTerms.includes(blocked)) {
          flaggedTerms.push(blocked);
        }
      }
    }
  }

  const rawLower = input.toLowerCase().replace(/\s+/g, " ").trim();
  const rawWords = rawLower.split(/\s+/);
  for (const word of rawWords) {
    const cleanWord = word.replace(/[^a-z0-9@$!|*_]/g, "");
    if (BLOCKED_WORD_VARIANTS.has(cleanWord)) {
      const original = BLOCKED_WORDS.find((b) => generateVariants(b).includes(cleanWord)) ?? cleanWord;
      if (!flaggedTerms.includes(original)) {
        flaggedTerms.push(original);
      }
    }
  }

  for (const pattern of SOLICITATION_PATTERNS) {
    if (pattern.test(input)) {
      flaggedTerms.push(`[pattern: ${pattern.source.slice(0, 30)}...]`);
    }
  }

  if (flaggedTerms.length === 0) {
    return { clean: true, flaggedTerms: [], severity: "none", sanitized: input };
  }

  let sanitized = input;
  for (const term of flaggedTerms) {
    if (!term.startsWith("[pattern:")) {
      const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
      sanitized = sanitized.replace(regex, "***");
    }
  }

  const severity = flaggedTerms.some((t) =>
    BLOCKED_EXACT_PHRASES.some((p) => t.toLowerCase() === p.toLowerCase())
  ) ? "ban" as const : flaggedTerms.length >= 3 ? "block" as const : "warning" as const;

  return { clean: false, flaggedTerms, severity, sanitized };
}

export function moderateVoiceTranscript(transcript: string): ModerationResult {
  return moderateText(transcript);
}

export interface ModerationAction {
  type: "allow" | "warn" | "block_message" | "mute_user" | "temp_ban";
  duration?: number;
  reason: string;
}

export function getModerationAction(result: ModerationResult, priorViolations: number): ModerationAction {
  if (result.clean) return { type: "allow", reason: "" };

  if (result.severity === "ban" || priorViolations >= 3) {
    return {
      type: "temp_ban",
      duration: 24 * 60 * 60 * 1000,
      reason: `Solicitation or repeated violations detected. Temporary ban for 24 hours. Flagged: ${result.flaggedTerms.join(", ")}`
    };
  }

  if (result.severity === "block" || priorViolations >= 1) {
    return {
      type: "mute_user",
      duration: 10 * 60 * 1000,
      reason: `Multiple prohibited terms detected. Muted for 10 minutes. Flagged: ${result.flaggedTerms.join(", ")}`
    };
  }

  return {
    type: "block_message",
    reason: `Message blocked. Prohibited content: ${result.flaggedTerms.join(", ")}`
  };
}

export const MODERATION_RULES = {
  maxViolationsBeforeTempBan: 3,
  tempBanDurationMs: 24 * 60 * 60 * 1000,
  muteDurationMs: 10 * 60 * 1000,
  voiceFlaggingEnabled: true,
  realTimeTextScanEnabled: true
} as const;
