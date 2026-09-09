import Link from "next/link";
import { HomeHero } from "@/components/shared/HomeHero";
import { APP_NAME } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-[1.75rem]">
            A candidate database built for the trades
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink/75">
            Instead of posting a vacancy and waiting for applications, employers
            search candidate profiles on {APP_NAME}. Candidates set out their
            trade, location, qualifications and experience, then employers get
            in touch.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="space-y-2 border-l-4 border-signal-orange pl-4">
            <h3 className="font-display text-xl font-bold">
              For candidates aged 16-24
            </h3>
            <p className="text-sm leading-relaxed text-ink/70">
              Create a free profile with your trade, town, tickets and
              experience. Make it easy for local employers to find you,
              whether you are at college or already on site.
            </p>
            <Link
              href="/sign-up?type=candidate"
              className="inline-block text-sm font-semibold text-signal-orange hover:underline"
            >
              Create your free profile →
            </Link>
          </div>
          <div className="space-y-2 border-l-4 border-steel-blue pl-4">
            <h3 className="font-display text-xl font-bold">For employers</h3>
            <p className="text-sm leading-relaxed text-ink/70">
              Search apprentices and junior tradespeople by trade, age range
              and location. Shortlist the profiles that fit, then contact
              candidates directly.
            </p>
            <Link
              href="/sign-up?type=employer"
              className="inline-block text-sm font-semibold text-steel-blue hover:underline"
            >
              Start searching candidates →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
