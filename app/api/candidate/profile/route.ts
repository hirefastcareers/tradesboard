import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb, hasDatabase } from "@/db";
import { candidateProfiles } from "@/db/schema";
import { getSession } from "@/lib/session";
import { profileCompleteness } from "@/lib/utils";

const bodySchema = z.object({
  firstName: z.string().min(1),
  ageRange: z.enum(["16-18", "19-21", "22-24"]),
  postcode: z.string().min(1),
  town: z.string().min(1),
  tradeInterests: z.array(z.string()).default([]),
  currentlyStudying: z.string().optional().nullable(),
  workExperience: z.string().optional().nullable(),
  certifications: z.array(z.string()).default([]),
  bio: z.string().default(""),
  photoUrl: z.string().optional().nullable(),
  complete: z.boolean().optional(),
});

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user?.id || session.user.accountType !== "candidate") {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  if (!hasDatabase()) {
    return NextResponse.json(
      { error: "Database is not configured yet." },
      { status: 503 },
    );
  }

  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Fill in the required profile fields." },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const values = {
      userId: session.user.id,
      firstName: data.firstName,
      ageRange: data.ageRange,
      postcode: data.postcode,
      town: data.town,
      tradeInterests: data.tradeInterests,
      currentlyStudying: data.currentlyStudying || null,
      workExperience: data.workExperience || null,
      certifications: data.certifications,
      bio: data.bio ?? "",
      photoUrl: data.photoUrl || null,
      profileComplete:
        data.complete ??
        profileCompleteness({
          firstName: data.firstName,
          ageRange: data.ageRange,
          postcode: data.postcode,
          town: data.town,
          tradeInterests: data.tradeInterests,
          currentlyStudying: data.currentlyStudying,
          workExperience: data.workExperience,
          certifications: data.certifications,
          bio: data.bio,
          photoUrl: data.photoUrl,
        }) >= 80,
    };

    const db = getDb();
    const [existing] = await db
      .select({ id: candidateProfiles.id })
      .from(candidateProfiles)
      .where(eq(candidateProfiles.userId, session.user.id))
      .limit(1);

    const [profile] = existing
      ? await db
          .update(candidateProfiles)
          .set(values)
          .where(eq(candidateProfiles.userId, session.user.id))
          .returning()
      : await db.insert(candidateProfiles).values(values).returning();

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("candidate profile error", error);
    return NextResponse.json(
      { error: "Could not save profile." },
      { status: 500 },
    );
  }
}
