import Link from "next/link";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { CandidateCard } from "@/components/candidate/CandidateCard";
import { ProfileCompleteness } from "@/components/candidate/ProfileCompleteness";
import { Button } from "@/components/shared/Button";
import { EmptyState } from "@/components/shared/EmptyState";
import { getDb, hasDatabase } from "@/db";
import { candidateProfiles } from "@/db/schema";
import {
  getDemoCandidateForSession,
  isDemoMode,
} from "@/lib/demo-data";
import { getSession } from "@/lib/session";
import { profileCompleteness } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your dashboard",
};

export const dynamic = "force-dynamic";

export default async function CandidateDashboardPage() {
  const session = await getSession();
  if (!session?.user) redirect("/sign-in");
  if (session.user.accountType !== "candidate") {
    redirect("/employer/dashboard");
  }

  let profile = null;
  if (hasDatabase() && !isDemoMode()) {
    try {
      const db = getDb();
      const [row] = await db
        .select()
        .from(candidateProfiles)
        .where(eq(candidateProfiles.userId, session.user.id))
        .limit(1);
      profile = row ?? null;
    } catch {
      profile = null;
    }
  }

  if (!profile && isDemoMode()) {
    const demo = getDemoCandidateForSession(session.user.id);
    if (demo) {
      profile = {
        id: demo.id,
        userId: demo.userId,
        firstName: demo.firstName,
        ageRange: demo.ageRange,
        postcode: demo.postcode,
        town: demo.town,
        tradeInterests: demo.tradeInterests,
        currentlyStudying: demo.currentlyStudying,
        workExperience: demo.workExperience,
        certifications: demo.certifications,
        bio: demo.bio,
        photoUrl: demo.photoUrl,
        canDrive: demo.checks.canDrive,
        hasCscs: demo.checks.hasCscs,
        hasEcs: demo.checks.hasEcs,
        hasGcseMaths: demo.checks.hasGcseMaths,
        hasGcseEnglish: demo.checks.hasGcseEnglish,
        profileComplete: true,
        createdAt: new Date(),
      };
    }
  }

  const percent = profileCompleteness(profile);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">
            Hey{profile?.firstName ? `, ${profile.firstName}` : ""}
          </h1>
          <p className="mt-1 text-ink/70">
            Your profile is what employers browse. Keep it sharp.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/messages">
            <Button variant="outline">Inbox</Button>
          </Link>
          <Link href="/candidate/onboarding">
            <Button>{profile ? "Edit profile" : "Finish profile"}</Button>
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <ProfileCompleteness percent={percent} />
        {profile ? (
          <CandidateCard
            candidate={{
              id: profile.id,
              firstName: profile.firstName,
              ageRange: profile.ageRange,
              town: profile.town,
              tradeInterests: profile.tradeInterests ?? [],
              certifications: profile.certifications ?? [],
              photoUrl: profile.photoUrl,
              bio: profile.bio,
              currentlyStudying: profile.currentlyStudying,
              checks: {
                hasCscs: profile.hasCscs,
                canDrive: profile.canDrive,
                hasEcs: profile.hasEcs,
                hasGcseMaths: profile.hasGcseMaths,
                hasGcseEnglish: profile.hasGcseEnglish,
              },
            }}
            href={`/candidate/${profile.id}`}
          />
        ) : (
          <EmptyState
            title="Your profile isn't live yet"
            description="Add your trade, town, and a short bio so employers can find you."
            actionLabel="Start your profile"
            actionHref="/candidate/onboarding"
          />
        )}
      </div>
    </div>
  );
}
