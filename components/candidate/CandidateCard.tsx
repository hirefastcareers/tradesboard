import Link from "next/link";
import { TradeBadge } from "@/components/shared/TradeBadge";
import { SkillChip } from "@/components/shared/SkillChip";
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
  const chips = candidate.certifications.slice(0, 3);
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

      {chips.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {chips.map((chip) => (
            <SkillChip key={chip} label={chip} />
          ))}
        </div>
      ) : null}

      <p className="mt-3 text-sm text-ink/65">{candidate.town}</p>
    </article>
  );

  if (!href) return content;

  return (
    <Link href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange focus-visible:ring-offset-2 rounded-2xl">
      {content}
    </Link>
  );
}
