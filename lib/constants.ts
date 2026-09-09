export const TRADE_OPTIONS = [
  "electrician",
  "plumber",
  "joiner",
  "bricklayer",
  "painter-decorator",
  "general-labour",
  "other",
] as const;

export type Trade = (typeof TRADE_OPTIONS)[number];

export const TRADE_LABELS: Record<Trade, string> = {
  electrician: "Electrician",
  plumber: "Plumber",
  joiner: "Joiner",
  bricklayer: "Bricklayer",
  "painter-decorator": "Painter & decorator",
  "general-labour": "General labour",
  other: "Other",
};

/** Colour tokens mapped to trades for badges */
export const TRADE_COLORS: Record<
  Trade,
  { bg: string; text: string; border: string; accent: string; soft: string }
> = {
  electrician: {
    bg: "bg-steel-blue/15",
    text: "text-steel-blue",
    border: "border-steel-blue/30",
    accent: "#3A6EA5",
    soft: "bg-steel-blue/10",
  },
  plumber: {
    bg: "bg-[#1F6F8B]/15",
    text: "text-[#1F6F8B]",
    border: "border-[#1F6F8B]/30",
    accent: "#1F6F8B",
    soft: "bg-[#1F6F8B]/10",
  },
  joiner: {
    bg: "bg-[#8B5E3C]/15",
    text: "text-[#8B5E3C]",
    border: "border-[#8B5E3C]/30",
    accent: "#8B5E3C",
    soft: "bg-[#8B5E3C]/10",
  },
  bricklayer: {
    bg: "bg-[#A65D3F]/15",
    text: "text-[#A65D3F]",
    border: "border-[#A65D3F]/30",
    accent: "#A65D3F",
    soft: "bg-[#A65D3F]/10",
  },
  "painter-decorator": {
    bg: "bg-signal-orange/15",
    text: "text-signal-orange",
    border: "border-signal-orange/30",
    accent: "#FF5A1F",
    soft: "bg-signal-orange/10",
  },
  "general-labour": {
    bg: "bg-ink/10",
    text: "text-ink/80",
    border: "border-ink/20",
    accent: "#21262B",
    soft: "bg-ink/5",
  },
  other: {
    bg: "bg-ink/8",
    text: "text-ink/70",
    border: "border-ink/15",
    accent: "#21262B",
    soft: "bg-ink/5",
  },
};

export const AGE_RANGES = ["16-18", "19-21", "22-24"] as const;

/** Tick-box attributes employers scan for. Short labels keep cards calm. */
export const CANDIDATE_CHECKS = [
  { key: "hasCscs", label: "CSCS", cardLabel: "CSCS" },
  { key: "canDrive", label: "Can drive", cardLabel: "Drive" },
  { key: "hasEcs", label: "ECS card", cardLabel: "ECS" },
  { key: "hasGcseMaths", label: "GCSE Maths", cardLabel: "Maths" },
  { key: "hasGcseEnglish", label: "GCSE English", cardLabel: "English" },
] as const;

export type CandidateCheckKey = (typeof CANDIDATE_CHECKS)[number]["key"];

export type CandidateChecks = Record<CandidateCheckKey, boolean>;

export const EMPTY_CANDIDATE_CHECKS: CandidateChecks = {
  hasCscs: false,
  canDrive: false,
  hasEcs: false,
  hasGcseMaths: false,
  hasGcseEnglish: false,
};

/** Prefer site cards / drive / ECS first so the card stays uncluttered. */
export const CARD_CHECK_PRIORITY: CandidateCheckKey[] = [
  "hasCscs",
  "canDrive",
  "hasEcs",
  "hasGcseMaths",
  "hasGcseEnglish",
];

export const CERT_OPTIONS = [
  "First aid",
  "Manual handling",
  "Working at height",
  "PASMA",
  "IPAF",
  "Asbestos awareness",
  "Site safety",
] as const;

export const APP_NAME = "TradeStart";

export const CANDIDATE_PROFILE_FIELDS = [
  "firstName",
  "ageRange",
  "postcode",
  "town",
  "tradeInterests",
  "currentlyStudying",
  "workExperience",
  "certifications",
  "bio",
  "photoUrl",
  "hasCscs",
  "canDrive",
  "hasEcs",
  "hasGcseMaths",
  "hasGcseEnglish",
] as const;
