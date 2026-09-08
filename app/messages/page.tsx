import { Suspense } from "react";
import { redirect } from "next/navigation";
import { MessagesInbox } from "@/components/shared/MessagesInbox";
import { getSession } from "@/lib/session";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages",
};

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const session = await getSession();
  if (!session?.user?.id || !session.user.accountType) {
    redirect("/sign-in");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 font-display text-3xl font-bold text-ink">Messages</h1>
      <Suspense fallback={<p className="text-sm text-ink/55">Loading inbox…</p>}>
        <MessagesInbox
          userId={session.user.id}
          accountType={session.user.accountType}
        />
      </Suspense>
    </div>
  );
}
