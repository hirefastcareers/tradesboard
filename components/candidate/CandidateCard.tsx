import Link from "next/link";
import { TradeBadge } from "@/components/shared/TradeBadge";
import { CandidateChecksRow } from "@/components/candidate/CandidateChecks";
import {
  EMPTY_CANDIDATE_CHECKS,
  TRADE_COLORS,
  type CandidateChecks,
} from "@/lib/constants";
import { cn, initials, isTrade } from "@/lib/utils";

export type CandidateCardData = {
  id: string;
  firstName: string;
  ageRange: string;
  town: string;
  tradeInterests: string[];
  certifications: string[];
  photoUrl?: string | null;
  bio?: string | null;
  currentlyStudying?: string | null;
  checks?: Partial<CandidateChecks>;
};

type CandidateCardProps = {
  candidate: CandidateCardData;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  interactive?: boolean;
};

export function CandidateCard({
  candidate,
  href,
  className,
  style,
  interactive = true,
}: CandidateCardProps) {
  const primaryTrade = candidate.tradeInterests[0] ?? "other";
  const tradeKey = isTrade(primaryTrade) ? primaryTrade : "other";
  const trade = TRADE_COLORS[tradeKey];
  const checks: CandidateChecks = {
    ...EMPTY_CANDIDATE_CHECKS,
    ...candidate.checks,
  };
  const teaser =
    candidate.bio?.trim() ||
    (candidate.currentlyStudying
      ? `Studying ${candidate.currentlyStudying}`
      : null);

  const content = (
    <article
      style={style}
      className={cn(
        "group relative flex h-full w-full origin-center flex-col overflow-hidden rounded-2xl border border-ink/10 bg-card-white shadow-card transition duration-200",
        interactive &&
          "hover:-translate-y-1 hover:rotate-1 hover:shadow-lift active:-translate-y-1 active:rotate-1",
        className,
      )}
    >
      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: trade.accent }}
        aria-hidden
      />

      <div className="flex flex-1 flex-col p-4 pt-3.5">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 font-display text-lg font-bold text-ink",
              trade.soft,
            )}
            style={{ borderColor: trade.accent }}
          >
            {candidate.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={candidate.photoUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              initials(candidate.firstName)
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <h3 className="truncate font-display text-xl font-bold leading-tight text-ink">
                {candidate.firstName}
              </h3>
              <span className="text-sm font-medium text-ink/50">
                {candidate.ageRange}
              </span>
            </div>
            <div className="mt-1.5">
              <TradeBadge trade={primaryTrade} />
            </div>
          </div>
        </div>

        {teaser ? (
          <p className="mt-3 line-clamp-2 text-sm leading-snug text-ink/70">
            {teaser}
          </p>
        ) : null}

        <CandidateChecksRow checks={checks} limit={3} className="mt-3" />

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-ink/8 pt-3">
          <p className="truncate text-sm font-medium text-ink/65">
            {candidate.town}
          </p>
          {href ? (
            <span className="shrink-0 text-xs font-semibold text-signal-orange transition group-hover:translate-x-0.5">
              View profile →
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange focus-visible:ring-offset-2"
    >
      {content}
    </Link>
  );
}
