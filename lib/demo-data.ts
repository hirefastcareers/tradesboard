import type { CandidateCardData } from "@/components/candidate/CandidateCard";
import type { AccountType, AgeRange } from "@/db/schema";
import type { CandidateChecks } from "@/lib/constants";
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
  checks: CandidateChecks;
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
    certifications: ["First aid"],
    currentlyStudying: "Level 2 Electrical Installation",
    workExperience: "Weekend labouring for a local electrician.",
    bio: "Reliable and punctual candidate seeking an electrical apprenticeship. Available for site work and college day release.",
    photoUrl: null,
    checks: {
      hasCscs: true,
      canDrive: false,
      hasEcs: false,
      hasGcseMaths: true,
      hasGcseEnglish: true,
    },
  },
  {
    id: "demo-aisha",
    userId: "demo-user-aisha",
    firstName: "Aisha",
    ageRange: "19-21",
    town: "Leeds",
    postcode: "LS1",
    tradeInterests: ["plumber"],
    certifications: ["Manual handling"],
    currentlyStudying: null,
    workExperience: "One-year college placement with a domestic plumber.",
    bio: "Seeking a junior plumber or mature apprenticeship role in West Yorkshire. Placement experience with domestic plumbing.",
    photoUrl: null,
    checks: {
      hasCscs: true,
      canDrive: true,
      hasEcs: false,
      hasGcseMaths: true,
      hasGcseEnglish: true,
    },
  },
  {
    id: "demo-tom",
    userId: "demo-user-tom",
    firstName: "Tom",
    ageRange: "22-24",
    town: "Manchester",
    postcode: "M1",
    tradeInterests: ["joiner"],
    certifications: ["Working at height"],
    currentlyStudying: null,
    workExperience: "Two years fitting kitchens and first/second fix.",
    bio: "Experienced junior joiner with kitchen fitting and first/second fix experience. Own basic tools and available to start next month.",
    photoUrl: null,
    checks: {
      hasCscs: true,
      canDrive: true,
      hasEcs: false,
      hasGcseMaths: true,
      hasGcseEnglish: false,
    },
  },
  {
    id: "demo-ellie",
    userId: "demo-user-ellie",
    firstName: "Ellie",
    ageRange: "19-21",
    town: "Bradford",
    postcode: "BD1",
    tradeInterests: ["painter-decorator"],
    certifications: [],
    currentlyStudying: "Painting & Decorating Level 2",
    workExperience: "Helped on family renovation jobs.",
    bio: "Painter and decorator seeking commercial or residential roles. Strong attention to finish quality.",
    photoUrl: null,
    checks: {
      hasCscs: true,
      canDrive: false,
      hasEcs: false,
      hasGcseMaths: true,
      hasGcseEnglish: true,
    },
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
    bio: "Motivated candidate seeking a bricklaying apprenticeship in the York area.",
    photoUrl: null,
    checks: {
      hasCscs: false,
      canDrive: false,
      hasEcs: false,
      hasGcseMaths: true,
      hasGcseEnglish: true,
    },
  },
  {
    id: "demo-priya",
    userId: "demo-user-priya",
    firstName: "Priya",
    ageRange: "22-24",
    town: "Leeds",
    postcode: "LS6",
    tradeInterests: ["general-labour"],
    certifications: ["Manual handling", "Site safety"],
    currentlyStudying: null,
    workExperience: "Six months on a housing site as general labour.",
    bio: "CSCS-qualified general labourer seeking regular site work. Experience on housing developments.",
    photoUrl: null,
    checks: {
      hasCscs: true,
      canDrive: true,
      hasEcs: false,
      hasGcseMaths: true,
      hasGcseEnglish: true,
    },
  },
  {
    id: "demo-callum",
    userId: "demo-user-callum",
    firstName: "Callum",
    ageRange: "19-21",
    town: "Huddersfield",
    postcode: "HD1",
    tradeInterests: ["electrician"],
    certifications: ["First aid", "Manual handling"],
    currentlyStudying: null,
    workExperience: "Domestic second fix with an uncle's firm over summer.",
    bio: "College-qualified candidate seeking an electrician's mate role with day release.",
    photoUrl: null,
    checks: {
      hasCscs: true,
      canDrive: true,
      hasEcs: true,
      hasGcseMaths: true,
      hasGcseEnglish: true,
    },
  },
  {
    id: "demo-mia",
    userId: "demo-user-mia",
    firstName: "Mia",
    ageRange: "16-18",
    town: "Wakefield",
    postcode: "WF1",
    tradeInterests: ["plumber", "general-labour"],
    certifications: [],
    currentlyStudying: "Plumbing Level 2",
    workExperience: "Saturday shifts in a builders' merchants.",
    bio: "Practical and quick to learn. Seeking a plumbing apprenticeship or entry-level site role.",
    photoUrl: null,
    checks: {
      hasCscs: true,
      canDrive: false,
      hasEcs: false,
      hasGcseMaths: true,
      hasGcseEnglish: true,
    },
  },
  {
    id: "demo-reece",
    userId: "demo-user-reece",
    firstName: "Reece",
    ageRange: "22-24",
    town: "Barnsley",
    postcode: "S70",
    tradeInterests: ["bricklayer", "general-labour"],
    certifications: ["Working at height"],
    currentlyStudying: null,
    workExperience: "Eighteen months on new-build housing sites.",
    bio: "Bricklayer with new-build housing experience. Own PPE and available full time.",
    photoUrl: null,
    checks: {
      hasCscs: true,
      canDrive: true,
      hasEcs: false,
      hasGcseMaths: false,
      hasGcseEnglish: true,
    },
  },
  {
    id: "demo-sophia",
    userId: "demo-user-sophia",
    firstName: "Sophia",
    ageRange: "19-21",
    town: "Doncaster",
    postcode: "DN1",
    tradeInterests: ["joiner"],
    certifications: ["First aid"],
    currentlyStudying: "Site Carpentry Level 3",
    workExperience: "College workshop plus two site placements.",
    bio: "Site carpentry student seeking joinery roles with a focus on quality finishes.",
    photoUrl: null,
    checks: {
      hasCscs: true,
      canDrive: false,
      hasEcs: false,
      hasGcseMaths: true,
      hasGcseEnglish: true,
    },
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
    bio: "Painter and decorator student seeking weekend or apprenticeship opportunities.",
    photoUrl: null,
    checks: {
      hasCscs: false,
      canDrive: false,
      hasEcs: false,
      hasGcseMaths: true,
      hasGcseEnglish: true,
    },
  },
  {
    id: "demo-hana",
    userId: "demo-user-hana",
    firstName: "Hana",
    ageRange: "22-24",
    town: "Halifax",
    postcode: "HX1",
    tradeInterests: ["electrician"],
    certifications: ["IPAF", "First aid"],
    currentlyStudying: null,
    workExperience: "Three years as an electrician's mate on commercial fit-outs.",
    bio: "Experienced electrician's mate seeking a junior electrician role. Own tools and van access.",
    photoUrl: null,
    checks: {
      hasCscs: true,
      canDrive: true,
      hasEcs: true,
      hasGcseMaths: true,
      hasGcseEnglish: true,
    },
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
    ({
      id,
      firstName,
      ageRange,
      town,
      tradeInterests,
      certifications,
      photoUrl,
      checks,
      bio,
      currentlyStudying,
    }) => ({
      id,
      firstName,
      ageRange,
      town,
      tradeInterests,
      certifications,
      photoUrl,
      checks,
      bio,
      currentlyStudying,
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
