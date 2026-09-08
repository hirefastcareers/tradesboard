import { CandidateOnboardingForm } from "@/components/candidate/CandidateOnboardingForm";
import { getDb, hasDatabase } from "@/db";
import { candidateProfiles } from "@/db/schema";
import { getSession } from "@/lib/session";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build your profile",
};

export const dynamic = "force-dynamic";

export default async function CandidateOnboardingPage() {
  const session = await getSession();
  if (!session?.user) redirect("/sign-in");
  if (session.user.accountType !== "candidate") {
    redirect("/employer/dashboard");
  }

  let initial:
    | {
        firstName: string;
        ageRange: string;
        postcode: string;
        town: string;
        tradeInterests: string[];
        currentlyStudying: string;
        workExperience: string;
        certifications: string[];
        bio: string;
        photoUrl: string;
      }
    | undefined;

  if (hasDatabase()) {
    try {
      const db = getDb();
      const [profile] = await db
        .select()
        .from(candidateProfiles)
        .where(eq(candidateProfiles.userId, session.user.id))
        .limit(1);
      if (profile) {
        initial = {
          firstName: profile.firstName,
          ageRange: profile.ageRange,
          postcode: profile.postcode,
          town: profile.town,
          tradeInterests: profile.tradeInterests ?? [],
          currentlyStudying: profile.currentlyStudying ?? "",
          workExperience: profile.workExperience ?? "",
          certifications: profile.certifications ?? [],
          bio: profile.bio ?? "",
          photoUrl: profile.photoUrl ?? "",
        };
      }
    } catch {
      // DB may be unreachable during scaffold
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="mb-6 text-center text-sm text-ink/60">
        Takes a few minutes. You can edit everything later.
      </p>
      <CandidateOnboardingForm initial={initial} />
    </div>
  );
}
