import Link from "next/link";
import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import type { CandidateCardData } from "@/components/candidate/CandidateCard";
import { EmployerBrowse } from "@/components/employer/EmployerBrowse";
import { Button } from "@/components/shared/Button";
import { getDb, hasDatabase } from "@/db";
import { candidateProfiles } from "@/db/schema";
import { getSession } from "@/lib/session";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse candidates",
};

export const dynamic = "force-dynamic";

const DEMO_CANDIDATES: CandidateCardData[] = [
  {
    id: "demo-jamie",
    firstName: "Jamie",
    ageRange: "16-18",
    town: "Sheffield",
    tradeInterests: ["electrician"],
    certifications: ["CSCS", "First aid"],
    photoUrl: null,
  },
  {
    id: "demo-aisha",
    firstName: "Aisha",
    ageRange: "19-21",
    town: "Leeds",
    tradeInterests: ["plumber"],
    certifications: ["CSCS", "Manual handling"],
    photoUrl: null,
  },
  {
    id: "demo-tom",
    firstName: "Tom",
    ageRange: "22-24",
    town: "Manchester",
    tradeInterests: ["joiner"],
    certifications: ["CSCS", "Working at height"],
    photoUrl: null,
  },
  {
    id: "demo-ellie",
    firstName: "Ellie",
    ageRange: "19-21",
    town: "Bradford",
    tradeInterests: ["painter-decorator"],
    certifications: ["CSCS"],
    photoUrl: null,
  },
  {
    id: "demo-noah",
    firstName: "Noah",
    ageRange: "16-18",
    town: "York",
    tradeInterests: ["bricklayer"],
    certifications: ["First aid"],
    photoUrl: null,
  },
  {
    id: "demo-priya",
    firstName: "Priya",
    ageRange: "22-24",
    town: "Leeds",
    tradeInterests: ["general-labour"],
    certifications: ["CSCS", "Manual handling", "Site safety"],
    photoUrl: null,
  },
];

export default async function EmployerDashboardPage() {
  const session = await getSession();
  if (!session?.user) redirect("/sign-in");
  if (session.user.accountType !== "employer") {
    redirect("/candidate/dashboard");
  }

  let candidates: CandidateCardData[] = DEMO_CANDIDATES;
  if (hasDatabase()) {
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
        })
        .from(candidateProfiles)
        .orderBy(desc(candidateProfiles.createdAt))
        .limit(60);
      if (rows.length > 0) {
        candidates = rows;
      }
    } catch {
      // keep demo data for scaffold/preview
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
