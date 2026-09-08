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
  { bg: string; text: string; border: string }
> = {
  electrician: {
    bg: "bg-steel-blue/15",
    text: "text-steel-blue",
    border: "border-steel-blue/30",
  },
  plumber: {
    bg: "bg-[#1F6F8B]/15",
    text: "text-[#1F6F8B]",
    border: "border-[#1F6F8B]/30",
  },
  joiner: {
    bg: "bg-[#8B5E3C]/15",
    text: "text-[#8B5E3C]",
    border: "border-[#8B5E3C]/30",
  },
  bricklayer: {
    bg: "bg-[#A65D3F]/15",
    text: "text-[#A65D3F]",
    border: "border-[#A65D3F]/30",
  },
  "painter-decorator": {
    bg: "bg-signal-orange/15",
    text: "text-signal-orange",
    border: "border-signal-orange/30",
  },
  "general-labour": {
    bg: "bg-ink/10",
    text: "text-ink/80",
    border: "border-ink/20",
  },
  other: {
    bg: "bg-ink/8",
    text: "text-ink/70",
    border: "border-ink/15",
  },
};

export const AGE_RANGES = ["16-18", "19-21", "22-24"] as const;

export const CERT_OPTIONS = [
  "CSCS",
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
] as const;
