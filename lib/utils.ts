import type { CandidateProfile } from "@/db/schema";
import { CANDIDATE_PROFILE_FIELDS } from "@/lib/constants";
import type { Trade } from "@/lib/constants";
import { TRADE_OPTIONS } from "@/lib/constants";

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function isTrade(value: string): value is Trade {
  return (TRADE_OPTIONS as readonly string[]).includes(value);
}

export function profileCompleteness(
  profile: Partial<CandidateProfile> | null | undefined,
): number {
  if (!profile) return 0;

  let filled = 0;
  for (const field of CANDIDATE_PROFILE_FIELDS) {
    const value = profile[field as keyof typeof profile];
    if (Array.isArray(value)) {
      if (value.length > 0) filled += 1;
    } else if (typeof value === "string") {
      if (value.trim().length > 0) filled += 1;
    } else if (typeof value === "boolean") {
      if (value) filled += 1;
    } else if (value != null) {
      filled += 1;
    }
  }

  return Math.round((filled / CANDIDATE_PROFILE_FIELDS.length) * 100);
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
