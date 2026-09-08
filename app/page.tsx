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
            The reverse of a normal job board
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink/75">
            On {APP_NAME}, candidates don&apos;t fire off applications into the
            void. You put your profile up (trade, location, certs, a short bio)
            and employers search, shortlist, and message you.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="space-y-2 border-l-4 border-signal-orange pl-4">
            <h3 className="font-display text-xl font-bold">For 16-24s in the trades</h3>
            <p className="text-sm leading-relaxed text-ink/70">
              Show what you can do, even if you&apos;re still at college. Get
              messaged by firms looking for apprentices and juniors.
            </p>
            <Link
              href="/sign-up?type=candidate"
              className="inline-block text-sm font-semibold text-signal-orange hover:underline"
            >
              Build your profile →
            </Link>
          </div>
          <div className="space-y-2 border-l-4 border-steel-blue pl-4">
            <h3 className="font-display text-xl font-bold">For employers</h3>
            <p className="text-sm leading-relaxed text-ink/70">
              Browse a grid of local candidates by trade, age range, and town.
              Message the ones who fit. No CV pile to wade through.
            </p>
            <Link
              href="/sign-up?type=employer"
              className="inline-block text-sm font-semibold text-steel-blue hover:underline"
            >
              Start hiring →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
