import Link from "next/link";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { SkillChip } from "@/components/shared/SkillChip";
import { TradeBadge } from "@/components/shared/TradeBadge";
import { Button } from "@/components/shared/Button";
import { getDb, hasDatabase } from "@/db";
import { candidateProfiles } from "@/db/schema";
import { getDemoCandidate, isDemoMode } from "@/lib/demo-data";
import { getSession } from "@/lib/session";
import { initials } from "@/lib/utils";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Candidate profile" };
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
        };
      }
    } catch {
      // fall through
    }
  }

  if (!profile) notFound();

  const canMessage =
    session?.user?.accountType === "employer" &&
    session.user.id !== profile.userId;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="rounded-2xl border border-ink/10 bg-card-white p-6 shadow-card sm:p-8">
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-hi-vis-yellow/70 font-display text-2xl font-bold">
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
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h1 className="font-display text-3xl font-bold text-ink">
                {profile.firstName}
              </h1>
              <span className="text-ink/55">{profile.ageRange}</span>
            </div>
            <p className="mt-1 text-sm text-ink/65">
              {profile.town} · {profile.postcode}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.tradeInterests.map((trade) => (
                <TradeBadge key={trade} trade={trade} />
              ))}
            </div>
          </div>
          {canMessage ? (
            <Link href={`/messages?to=${profile.userId}`}>
              <Button size="lg">Message</Button>
            </Link>
          ) : session?.user?.accountType === "candidate" ? null : (
            <Link href="/sign-in">
              <Button size="lg">Sign in to message</Button>
            </Link>
          )}
        </div>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="font-display text-xl font-bold">About</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-ink/80">
              {profile.bio || "No bio yet."}
            </p>
          </section>

          {profile.currentlyStudying ? (
            <section>
              <h2 className="font-display text-xl font-bold">Studying</h2>
              <p className="mt-2 text-sm text-ink/80">
                {profile.currentlyStudying}
              </p>
            </section>
          ) : null}

          {profile.workExperience ? (
            <section>
              <h2 className="font-display text-xl font-bold">Experience</h2>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-ink/80">
                {profile.workExperience}
              </p>
            </section>
          ) : null}

          {profile.certifications.length > 0 ? (
            <section>
              <h2 className="font-display text-xl font-bold">Certificates</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.certifications.map((cert) => (
                  <SkillChip key={cert} label={cert} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
