"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { APP_NAME } from "@/lib/constants";

const HIDE_ON = ["/candidate/onboarding", "/employer/onboarding"];

export function SiteHeader() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (HIDE_ON.some((path) => pathname.startsWith(path))) {
    return null;
  }

  const signedIn = status === "authenticated" && Boolean(session?.user);
  const dashboardHref =
    session?.user?.accountType === "employer"
      ? "/employer/dashboard"
      : "/candidate/dashboard";

  return (
    <header className="relative z-20 border-b border-ink/10 bg-workshop-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="min-w-0 truncate font-display text-lg font-bold tracking-tight text-ink sm:text-2xl"
        >
          {APP_NAME}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-3 md:flex">
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

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          {status === "loading" ? (
            <span className="px-2 text-sm text-ink/40">…</span>
          ) : signedIn ? (
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-ink/15 bg-card-white text-ink"
            >
              {menuOpen ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-md px-2.5 py-2 text-sm font-medium text-ink/80"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="rounded-md bg-signal-orange px-3 py-2 text-sm font-semibold text-white"
              >
                Join
              </Link>
            </>
          )}
        </div>
      </div>

      {signedIn && menuOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-ink/10 bg-workshop-white md:hidden"
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            <Link
              href={dashboardHref}
              className="rounded-md px-3 py-3 text-sm font-medium text-ink hover:bg-ink/5"
            >
              Dashboard
            </Link>
            <Link
              href="/messages"
              className="rounded-md px-3 py-3 text-sm font-medium text-ink hover:bg-ink/5"
            >
              Inbox
            </Link>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-md px-3 py-3 text-left text-sm font-semibold text-signal-orange hover:bg-signal-orange/5"
            >
              Sign out
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
