"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const HIDE_ON = ["/candidate/onboarding", "/employer/onboarding"];

export function SiteHeader() {
  const pathname = usePathname();
  if (HIDE_ON.some((path) => pathname.startsWith(path))) {
    return null;
  }

  return (
    <header className="relative z-20 border-b border-ink/10 bg-workshop-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl"
        >
          {APP_NAME}
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/sign-in"
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium text-ink/80 transition hover:text-ink",
            )}
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="rounded-md bg-signal-orange px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
          >
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
}
