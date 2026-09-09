import type { CandidateCardData } from "@/components/candidate/CandidateCard";
import type { AccountType, AgeRange } from "@/db/schema";
import { hasDatabase } from "@/db";

/** Demo mode when explicitly enabled, or when no real database is configured. */
export function isDemoMode() {
  if (process.env.DEMO_MODE === "true") return true;
  if (process.env.DEMO_MODE === "false") return false;
  return !hasDatabase();
}

export type DemoCandidate = CandidateCardData & {
  userId: string;
  postcode: string;
  currentlyStudying: string | null;
  workExperience: string | null;
  bio: string;
  ageRange: AgeRange;
};

export const DEMO_CANDIDATES: DemoCandidate[] = [
  {
    id: "demo-jamie",
    userId: "demo-user-jamie",
    firstName: "Jamie",
    ageRange: "16-18",
    town: "Sheffield",
    postcode: "S1",
    tradeInterests: ["electrician"],
    certifications: ["CSCS", "First aid"],
    currentlyStudying: "Level 2 Electrical Installation",
    workExperience: "Weekend labouring for a local sparks.",
    bio: "Keen to start an apprenticeship. Reliable, early, and happy on site.",
    photoUrl: null,
  },
  {
    id: "demo-aisha",
    userId: "demo-user-aisha",
    firstName: "Aisha",
    ageRange: "19-21",
    town: "Leeds",
    postcode: "LS1",
    tradeInterests: ["plumber"],
    certifications: ["CSCS", "Manual handling"],
    currentlyStudying: null,
    workExperience: "One-year college placement with a domestic plumber.",
    bio: "Looking for junior plumber or mature apprentice roles in West Yorkshire.",
    photoUrl: null,
  },
  {
    id: "demo-tom",
    userId: "demo-user-tom",
    firstName: "Tom",
    ageRange: "22-24",
    town: "Manchester",
    postcode: "M1",
    tradeInterests: ["joiner"],
    certifications: ["CSCS", "Working at height"],
    currentlyStudying: null,
    workExperience: "Two years fitting kitchens and first/second fix.",
    bio: "Site-ready joiner. Own basic tools. Can start next month.",
    photoUrl: null,
  },
  {
    id: "demo-ellie",
    userId: "demo-user-ellie",
    firstName: "Ellie",
    ageRange: "19-21",
    town: "Bradford",
    postcode: "BD1",
    tradeInterests: ["painter-decorator"],
    certifications: ["CSCS"],
    currentlyStudying: "Painting & Decorating Level 2",
    workExperience: "Helped on family renovation jobs.",
    bio: "Neat finisher looking for commercial or residential work.",
    photoUrl: null,
  },
  {
    id: "demo-noah",
    userId: "demo-user-noah",
    firstName: "Noah",
    ageRange: "16-18",
    town: "York",
    postcode: "YO1",
    tradeInterests: ["bricklayer"],
    certifications: ["First aid"],
    currentlyStudying: "Bricklaying at York College",
    workExperience: null,
    bio: "Strong and keen. Want a bricklaying apprenticeship close to York.",
    photoUrl: null,
  },
  {
    id: "demo-priya",
    userId: "demo-user-priya",
    firstName: "Priya",
    ageRange: "22-24",
    town: "Leeds",
    postcode: "LS6",
    tradeInterests: ["general-labour"],
    certifications: ["CSCS", "Manual handling", "Site safety"],
    currentlyStudying: null,
    workExperience: "Six months on a housing site as general labour.",
    bio: "Hard worker, CSCS ready, looking for steady site work.",
    photoUrl: null,
  },
  {
    id: "demo-callum",
    userId: "demo-user-callum",
    firstName: "Callum",
    ageRange: "19-21",
    town: "Huddersfield",
    postcode: "HD1",
    tradeInterests: ["electrician"],
    certifications: ["CSCS", "First aid", "Manual handling"],
    currentlyStudying: null,
    workExperience: "Domestic second fix with an uncle's firm over summer.",
    bio: "Finished college. Want a proper spark's mate role with day release.",
    photoUrl: null,
  },
  {
    id: "demo-mia",
    userId: "demo-user-mia",
    firstName: "Mia",
    ageRange: "16-18",
    town: "Wakefield",
    postcode: "WF1",
    tradeInterests: ["plumber", "general-labour"],
    certifications: ["CSCS"],
    currentlyStudying: "Plumbing Level 2",
    workExperience: "Saturday shifts in a builders' merchants.",
    bio: "Hands-on, learns fast, happy to graft. Looking for an apprenticeship.",
    photoUrl: null,
  },
  {
    id: "demo-reece",
    userId: "demo-user-reece",
    firstName: "Reece",
    ageRange: "22-24",
    town: "Barnsley",
    postcode: "S70",
    tradeInterests: ["bricklayer", "general-labour"],
    certifications: ["CSCS", "Working at height"],
    currentlyStudying: null,
    workExperience: "Eighteen months on new-build housing sites.",
    bio: "Can lay bricks to line. Own PPE. Available full time.",
    photoUrl: null,
  },
  {
    id: "demo-sophia",
    userId: "demo-user-sophia",
    firstName: "Sophia",
    ageRange: "19-21",
    town: "Doncaster",
    postcode: "DN1",
    tradeInterests: ["joiner"],
    certifications: ["CSCS", "First aid"],
    currentlyStudying: "Site Carpentry Level 3",
    workExperience: "College workshop plus two site placements.",
    bio: "Careful with finishes. Prefer joinery over rough carpentry.",
    photoUrl: null,
  },
  {
    id: "demo-dylan",
    userId: "demo-user-dylan",
    firstName: "Dylan",
    ageRange: "16-18",
    town: "Rotherham",
    postcode: "S60",
    tradeInterests: ["painter-decorator"],
    certifications: ["Manual handling"],
    currentlyStudying: "Painter & Decorator Level 2",
    workExperience: null,
    bio: "Neat, tidy, and proud of clean edges. Want weekend or apprentice work.",
    photoUrl: null,
  },
  {
    id: "demo-hana",
    userId: "demo-user-hana",
    firstName: "Hana",
    ageRange: "22-24",
    town: "Halifax",
    postcode: "HX1",
    tradeInterests: ["electrician"],
    certifications: ["CSCS", "IPAF", "First aid"],
    currentlyStudying: null,
    workExperience: "Three years as an electrician's mate on commercial fit-outs.",
    bio: "Ready for a junior electrician role. Own tools and van access.",
    photoUrl: null,
  },
];

export const DEMO_USERS: Array<{
  id: string;
  email: string;
  password: string;
  accountType: AccountType;
  name: string;
}> = [
  {
    id: "demo-user-employer",
    email: "employer@demo.local",
    password: "password123",
    accountType: "employer",
    name: "Demo Employer",
  },
  {
    id: "demo-user-candidate",
    email: "candidate@demo.local",
    password: "password123",
    accountType: "candidate",
    name: "Jamie",
  },
];

export function getDemoCandidate(id: string) {
  return DEMO_CANDIDATES.find((c) => c.id === id) ?? null;
}

export function getDemoCandidateCards(): CandidateCardData[] {
  return DEMO_CANDIDATES.map(
    ({ id, firstName, ageRange, town, tradeInterests, certifications, photoUrl }) => ({
      id,
      firstName,
      ageRange,
      town,
      tradeInterests,
      certifications,
      photoUrl,
    }),
  );
}

/** Profile shown on the logged-in candidate dashboard in demo mode. */
export function getDemoCandidateForSession(userId: string) {
  if (userId === "demo-user-candidate") {
    return DEMO_CANDIDATES.find((c) => c.id === "demo-jamie") ?? null;
  }
  return DEMO_CANDIDATES.find((c) => c.userId === userId) ?? null;
}

export const DEMO_NEXTAUTH_SECRET =
  "tradesboard-demo-secret-not-for-real-auth-use-32chars";
