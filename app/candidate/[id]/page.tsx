import Link from "next/link";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { SkillChip } from "@/components/shared/SkillChip";
import { TradeBadge } from "@/components/shared/TradeBadge";
import { Button } from "@/components/shared/Button";
import { CandidateChecksList } from "@/components/candidate/CandidateChecks";
import { getDb, hasDatabase } from "@/db";
import { candidateProfiles } from "@/db/schema";
import {
  EMPTY_CANDIDATE_CHECKS,
  TRADE_COLORS,
  TRADE_LABELS,
} from "@/lib/constants";
import { getDemoCandidate, isDemoMode } from "@/lib/demo-data";
import { getSession } from "@/lib/session";
import { initials, isTrade } from "@/lib/utils";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const profile = getDemoCandidate(params.id);
  return {
    title: profile ? `${profile.firstName} · ${profile.town}` : "Candidate profile",
  };
}

export default async function CandidatePublicProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  let profile = getDemoCandidate(params.id);

  if (!profile && hasDatabase() && !isDemoMode()) {
    try {
      const db = getDb();
      const [row] = await db
        .select()
        .from(candidateProfiles)
        .where(eq(candidateProfiles.id, params.id))
        .limit(1);
      if (row) {
        profile = {
          id: row.id,
          userId: row.userId,
          firstName: row.firstName,
          ageRange: row.ageRange,
          town: row.town,
          postcode: row.postcode,
          tradeInterests: row.tradeInterests ?? [],
          certifications: row.certifications ?? [],
          currentlyStudying: row.currentlyStudying,
          workExperience: row.workExperience,
          bio: row.bio,
          photoUrl: row.photoUrl,
          checks: {
            hasCscs: row.hasCscs,
            canDrive: row.canDrive,
            hasEcs: row.hasEcs,
            hasGcseMaths: row.hasGcseMaths,
            hasGcseEnglish: row.hasGcseEnglish,
          },
        };
      }
    } catch {
      // fall through
    }
  }

  if (!profile) notFound();

  const checks = {
    ...EMPTY_CANDIDATE_CHECKS,
    ...profile.checks,
  };

  const primaryTrade = profile.tradeInterests[0] ?? "other";
  const tradeKey = isTrade(primaryTrade) ? primaryTrade : "other";
  const trade = TRADE_COLORS[tradeKey];

  const canMessage =
    session?.user?.accountType === "employer" &&
    session.user.id !== profile.userId;

  const readyBits = [
    checks.hasCscs ? "CSCS" : null,
    checks.canDrive ? "Can drive" : null,
    checks.hasEcs ? "ECS" : null,
  ].filter(Boolean);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-card-white shadow-card">
        {/* Trade-coloured banner */}
        <div
          className="relative px-5 pb-14 pt-6 sm:px-8 sm:pb-16 sm:pt-8"
          style={{
            background: `linear-gradient(135deg, ${trade.accent} 0%, ${trade.accent}cc 55%, #FFD23F 140%)`,
          }}
        >
          <p className="text-sm font-semibold text-white/85">
            {TRADE_LABELS[tradeKey]} · {profile.ageRange}
          </p>
          <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {profile.firstName}
          </h1>
          <p className="mt-1 text-sm font-medium text-white/85">
            {profile.town}
            {profile.postcode ? ` · ${profile.postcode}` : ""}
          </p>
          {readyBits.length > 0 ? (
            <p className="mt-3 inline-flex rounded-md bg-black/15 px-2.5 py-1 text-xs font-semibold text-white">
              {readyBits.join(" · ")}
            </p>
          ) : null}
        </div>

        <div className="relative px-5 pb-6 sm:px-8 sm:pb-8">
          <div className="-mt-10 flex flex-wrap items-end justify-between gap-4">
            <div
              className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border-4 border-card-white font-display text-2xl font-bold text-ink shadow-card sm:h-24 sm:w-24 sm:text-3xl"
              style={{ backgroundColor: "#FFD23F" }}
            >
              {profile.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.photoUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                initials(profile.firstName)
              )}
            </div>

            <div className="flex flex-wrap gap-2 pb-1">
              {canMessage ? (
                <Link href={`/messages?to=${profile.userId}`}>
                  <Button size="lg">Contact {profile.firstName}</Button>
                </Link>
              ) : session?.user?.accountType === "candidate" ? null : (
                <Link href="/sign-in">
                  <Button size="lg">Sign in to contact</Button>
                </Link>
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {profile.tradeInterests.map((t) => (
              <TradeBadge key={t} trade={t} />
            ))}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.9fr]">
            <div className="space-y-7">
              <section>
                <h2 className="font-display text-xl font-bold text-ink">
                  About
                </h2>
                <p className="mt-2 whitespace-pre-wrap text-base leading-relaxed text-ink/80">
                  {profile.bio || "No bio yet."}
                </p>
              </section>

              {profile.currentlyStudying ? (
                <section className="rounded-xl border-l-4 border-hi-vis-yellow bg-hi-vis-yellow/15 px-4 py-3">
                  <h2 className="font-display text-lg font-bold text-ink">
                    Studying
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-ink/80">
                    {profile.currentlyStudying}
                  </p>
                </section>
              ) : null}

              {profile.workExperience ? (
                <section>
                  <h2 className="font-display text-xl font-bold text-ink">
                    Experience
                  </h2>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-ink/80">
                    {profile.workExperience}
                  </p>
                </section>
              ) : null}

              {profile.certifications.length > 0 ? (
                <section>
                  <h2 className="font-display text-xl font-bold text-ink">
                    Other certificates
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profile.certifications.map((cert) => (
                      <SkillChip key={cert} label={cert} />
                    ))}
                  </div>
                </section>
              ) : null}
            </div>

            <aside className="space-y-3">
              <div className="rounded-2xl border border-ink/10 bg-workshop-white p-4 sm:p-5">
                <h2 className="font-display text-lg font-bold text-ink">
                  Licences and qualifications
                </h2>
                <p className="mt-1 text-xs text-ink/55">
                  Key checks employers look for on site.
                </p>
                <div className="mt-3">
                  <CandidateChecksList checks={checks} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
