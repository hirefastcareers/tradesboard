"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { APP_NAME } from "@/lib/constants";

const HIDE_ON = ["/candidate/onboarding", "/employer/onboarding"];

export function SiteHeader() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (HIDE_ON.some((path) => pathname.startsWith(path))) {
    return null;
  }

  const signedIn = status === "authenticated" && Boolean(session?.user);
  const dashboardHref =
    session?.user?.accountType === "employer"
      ? "/employer/dashboard"
      : "/candidate/dashboard";

  return (
    <header className="relative z-20 border-b border-ink/10 bg-workshop-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl"
        >
          {APP_NAME}
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          {status === "loading" ? (
            <span className="px-3 py-2 text-sm text-ink/40">…</span>
          ) : signedIn ? (
            <>
              <Link
                href={dashboardHref}
                className="rounded-md px-3 py-2 text-sm font-medium text-ink/80 transition hover:text-ink"
              >
                Dashboard
              </Link>
              <Link
                href="/messages"
                className="rounded-md px-3 py-2 text-sm font-medium text-ink/80 transition hover:text-ink"
              >
                Inbox
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-md border border-ink/15 bg-card-white px-3.5 py-2 text-sm font-semibold text-ink transition hover:border-ink/30"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-md px-3 py-2 text-sm font-medium text-ink/80 transition hover:text-ink"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="rounded-md bg-signal-orange px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
              >
                Get started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
