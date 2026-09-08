import { EmployerOnboardingForm } from "@/components/employer/EmployerOnboardingForm";
import { getDb, hasDatabase } from "@/db";
import { employerProfiles } from "@/db/schema";
import { getSession } from "@/lib/session";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company setup",
};

export const dynamic = "force-dynamic";

export default async function EmployerOnboardingPage() {
  const session = await getSession();
  if (!session?.user) redirect("/sign-in");
  if (session.user.accountType !== "employer") {
    redirect("/candidate/dashboard");
  }

  let initial: Record<string, string> | undefined;
  if (hasDatabase()) {
    try {
      const db = getDb();
      const [profile] = await db
        .select()
        .from(employerProfiles)
        .where(eq(employerProfiles.userId, session.user.id))
        .limit(1);
      if (profile) {
        initial = {
          companyName: profile.companyName,
          trade: profile.trade,
          town: profile.town,
          postcode: profile.postcode,
          logoUrl: profile.logoUrl ?? "",
          bio: profile.bio ?? "",
        };
      }
    } catch {
      // ignore
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <EmployerOnboardingForm initial={initial} />
    </div>
  );
}
