import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb, hasDatabase } from "@/db";
import { employerProfiles } from "@/db/schema";
import { getSession } from "@/lib/session";

const bodySchema = z.object({
  companyName: z.string().min(1),
  trade: z.string().min(1),
  town: z.string().min(1),
  postcode: z.string().min(1),
  logoUrl: z.string().optional().nullable(),
  bio: z.string().default(""),
});

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user?.id || session.user.accountType !== "employer") {
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
        { error: "Fill in the required company fields." },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const values = {
      userId: session.user.id,
      companyName: data.companyName,
      trade: data.trade,
      town: data.town,
      postcode: data.postcode,
      logoUrl: data.logoUrl || null,
      bio: data.bio ?? "",
    };

    const db = getDb();
    const [existing] = await db
      .select({ id: employerProfiles.id })
      .from(employerProfiles)
      .where(eq(employerProfiles.userId, session.user.id))
      .limit(1);

    const [profile] = existing
      ? await db
          .update(employerProfiles)
          .set(values)
          .where(eq(employerProfiles.userId, session.user.id))
          .returning()
      : await db.insert(employerProfiles).values(values).returning();

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("employer profile error", error);
    return NextResponse.json(
      { error: "Could not save company profile." },
      { status: 500 },
    );
  }
}
