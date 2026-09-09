import Link from "next/link";
import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import type { CandidateCardData } from "@/components/candidate/CandidateCard";
import { EmployerBrowse } from "@/components/employer/EmployerBrowse";
import { Button } from "@/components/shared/Button";
import { getDb, hasDatabase } from "@/db";
import { candidateProfiles } from "@/db/schema";
import { getDemoCandidateCards, isDemoMode } from "@/lib/demo-data";
import { getSession } from "@/lib/session";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse candidates",
};

export const dynamic = "force-dynamic";

export default async function EmployerDashboardPage() {
  const session = await getSession();
  if (!session?.user) redirect("/sign-in");
  if (session.user.accountType !== "employer") {
    redirect("/candidate/dashboard");
  }

  let candidates: CandidateCardData[] = getDemoCandidateCards();
  if (hasDatabase() && !isDemoMode()) {
    try {
      const db = getDb();
      const rows = await db
        .select({
          id: candidateProfiles.id,
          firstName: candidateProfiles.firstName,
          ageRange: candidateProfiles.ageRange,
          town: candidateProfiles.town,
          tradeInterests: candidateProfiles.tradeInterests,
          certifications: candidateProfiles.certifications,
          photoUrl: candidateProfiles.photoUrl,
          bio: candidateProfiles.bio,
          currentlyStudying: candidateProfiles.currentlyStudying,
          hasCscs: candidateProfiles.hasCscs,
          canDrive: candidateProfiles.canDrive,
          hasEcs: candidateProfiles.hasEcs,
          hasGcseMaths: candidateProfiles.hasGcseMaths,
          hasGcseEnglish: candidateProfiles.hasGcseEnglish,
        })
        .from(candidateProfiles)
        .orderBy(desc(candidateProfiles.createdAt))
        .limit(60);
      if (rows.length > 0) {
        candidates = rows.map((row) => ({
          id: row.id,
          firstName: row.firstName,
          ageRange: row.ageRange,
          town: row.town,
          tradeInterests: row.tradeInterests,
          certifications: row.certifications,
          photoUrl: row.photoUrl,
          bio: row.bio,
          currentlyStudying: row.currentlyStudying,
          checks: {
            hasCscs: row.hasCscs,
            canDrive: row.canDrive,
            hasEcs: row.hasEcs,
            hasGcseMaths: row.hasGcseMaths,
            hasGcseEnglish: row.hasGcseEnglish,
          },
        }));
      }
    } catch {
      // keep demo data
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">
            Find your next hire
          </h1>
          <p className="mt-1 text-ink/70">
            Browse profiles, then message the people who fit.
            {isDemoMode() ? " Demo candidates are loaded for testing." : null}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/messages">
            <Button variant="outline">Inbox</Button>
          </Link>
          <Link href="/employer/onboarding">
            <Button variant="secondary">Edit company</Button>
          </Link>
        </div>
      </div>
      <EmployerBrowse candidates={candidates} />
    </div>
  );
}
