import {
  CandidateCard,
  type CandidateCardData,
} from "@/components/candidate/CandidateCard";
import { APP_NAME } from "@/lib/constants";
import Link from "next/link";

const PREVIEW_CANDIDATES: Array<
  CandidateCardData & { rotate: string; x: string; y: string; delay: string }
> = [
  {
    id: "preview-1",
    firstName: "Jamie",
    ageRange: "16-18",
    town: "Sheffield",
    tradeInterests: ["electrician"],
    certifications: ["First aid"],
    checks: {
      hasCscs: true,
      canDrive: false,
      hasEcs: false,
      hasGcseMaths: true,
      hasGcseEnglish: true,
    },
    rotate: "-8deg",
    x: "-12%",
    y: "10%",
    delay: "0ms",
  },
  {
    id: "preview-2",
    firstName: "Aisha",
    ageRange: "19-21",
    town: "Leeds",
    tradeInterests: ["plumber"],
    certifications: ["Manual handling"],
    checks: {
      hasCscs: true,
      canDrive: true,
      hasEcs: false,
      hasGcseMaths: true,
      hasGcseEnglish: true,
    },
    rotate: "2deg",
    x: "4%",
    y: "0%",
    delay: "140ms",
  },
  {
    id: "preview-3",
    firstName: "Tom",
    ageRange: "22-24",
    town: "Manchester",
    tradeInterests: ["joiner"],
    certifications: ["Working at height"],
    checks: {
      hasCscs: true,
      canDrive: true,
      hasEcs: false,
      hasGcseMaths: true,
      hasGcseEnglish: false,
    },
    rotate: "9deg",
    x: "18%",
    y: "-8%",
    delay: "280ms",
  },
];

export function HomeHero() {
  return (
    <section className="relative">
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-20">
        <div className="animate-fade-up space-y-6">
          <p className="font-display text-2xl font-bold text-signal-orange sm:text-3xl">
            {APP_NAME}
          </p>
          <h1 className="max-w-xl text-balance font-display text-3xl font-extrabold leading-[1.05] text-ink sm:text-[3.25rem]">
            Young tradespeople ready for work. Employers find them first.
          </h1>
          <p className="max-w-lg text-lg text-ink/75">
            Skip the job ads. Build a profile, get found, get messaged.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/sign-up?type=candidate"
              className="inline-flex items-center justify-center rounded-md bg-signal-orange px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              I&apos;m looking for work
            </Link>
            <Link
              href="/sign-up?type=employer"
              className="inline-flex items-center justify-center rounded-md border border-ink/20 bg-card-white px-5 py-3 text-base font-semibold text-ink transition hover:border-ink/40"
            >
              I&apos;m hiring
            </Link>
          </div>
        </div>

        <div className="relative mx-auto h-[360px] w-full max-w-md sm:h-[400px]">
          {PREVIEW_CANDIDATES.map((candidate, index) => (
            <div
              key={candidate.id}
              className="hero-card absolute left-1/2 top-1/2 w-[76%] max-w-[270px]"
              style={
                {
                  zIndex: index + 1,
                  "--hero-rotate": candidate.rotate,
                  "--hero-x": candidate.x,
                  "--hero-y": candidate.y,
                  animationDelay: candidate.delay,
                } as React.CSSProperties
              }
            >
              <CandidateCard candidate={candidate} interactive={false} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
