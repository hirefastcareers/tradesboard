import Link from "next/link";
import { TradeBadge } from "@/components/shared/TradeBadge";
import { CandidateChecksRow } from "@/components/candidate/CandidateChecks";
import {
  EMPTY_CANDIDATE_CHECKS,
  type CandidateChecks,
} from "@/lib/constants";
import { initials } from "@/lib/utils";
import { cn } from "@/lib/utils";

export type CandidateCardData = {
  id: string;
  firstName: string;
  ageRange: string;
  town: string;
  tradeInterests: string[];
  certifications: string[];
  photoUrl?: string | null;
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
  const checks: CandidateChecks = {
    ...EMPTY_CANDIDATE_CHECKS,
    ...candidate.checks,
  };
  const content = (
    <article
      style={style}
      className={cn(
        "group relative w-full origin-center rounded-2xl border border-ink/10 bg-card-white p-4 shadow-card transition duration-200",
        interactive &&
          "hover:-translate-y-1 hover:rotate-1 hover:shadow-lift active:-translate-y-1 active:rotate-1",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-hi-vis-yellow/60 font-display text-lg font-bold text-ink">
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
            <h3 className="truncate font-display text-lg font-bold text-ink">
              {candidate.firstName}
            </h3>
            <span className="text-sm text-ink/55">{candidate.ageRange}</span>
          </div>
          <div className="mt-1.5">
            <TradeBadge trade={primaryTrade} />
          </div>
        </div>
      </div>

      <CandidateChecksRow checks={checks} limit={3} />

      <p className="mt-3 text-sm text-ink/65">{candidate.town}</p>
    </article>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange focus-visible:ring-offset-2"
    >
      {content}
    </Link>
  );
}
