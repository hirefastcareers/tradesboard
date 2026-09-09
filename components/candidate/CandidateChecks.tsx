import {
  CANDIDATE_CHECKS,
  CARD_CHECK_PRIORITY,
  type CandidateChecks,
  type CandidateCheckKey,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

export function picksForCard(checks: CandidateChecks, limit = 3) {
  return CARD_CHECK_PRIORITY.filter((key) => checks[key]).slice(0, limit);
}

function CheckMark({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border",
        on
          ? "border-signal-orange bg-signal-orange text-white"
          : "border-ink/25 bg-transparent text-transparent",
      )}
    >
      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
        <path
          d="M2.5 6.2 L4.8 8.5 L9.5 3.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** Compact row for browse cards: only ticked items, capped. */
export function CandidateChecksRow({
  checks,
  limit = 3,
  className,
}: {
  checks: CandidateChecks;
  limit?: number;
  className?: string;
}) {
  const keys = picksForCard(checks, limit);
  if (keys.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-x-3 gap-y-1.5", className ?? "mt-3")}>
      {keys.map((key) => {
        const item = CANDIDATE_CHECKS.find((c) => c.key === key)!;
        return (
          <li
            key={key}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-ink/75"
          >
            <CheckMark on />
            {item.cardLabel}
          </li>
        );
      })}
    </ul>
  );
}

/** Full checklist for the public profile. */
export function CandidateChecksList({
  checks,
  className,
}: {
  checks: CandidateChecks;
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-2 sm:grid-cols-2", className)}>
      {CANDIDATE_CHECKS.map((item) => {
        const on = checks[item.key as CandidateCheckKey];
        return (
          <li
            key={item.key}
            className={cn(
              "inline-flex items-center gap-2 rounded-md px-2.5 py-2 text-sm",
              on ? "bg-signal-orange/8 text-ink" : "bg-ink/[0.03] text-ink/45",
            )}
          >
            <CheckMark on={on} />
            <span className={cn("font-medium", on ? "text-ink" : "text-ink/45")}>
              {item.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
