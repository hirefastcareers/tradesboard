import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb, hasDatabase } from "@/db";
import { users } from "@/db/schema";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  accountType: z.enum(["candidate", "employer"]),
});

export async function POST(request: Request) {
  if (!hasDatabase()) {
    return NextResponse.json(
      { error: "Database is not configured yet. Set DATABASE_URL." },
      { status: 503 },
    );
  }

  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Check your email, password, and account type." },
        { status: 400 },
      );
    }

    const email = parsed.data.email.toLowerCase();
    const db = getDb();
    const [existing] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existing) {
      return NextResponse.json(
        { error: "An account with that email already exists." },
        { status: 409 },
      );
    }

    const passwordHash = await hash(parsed.data.password, 12);
    const [created] = await db
      .insert(users)
      .values({
        email,
        passwordHash,
        accountType: parsed.data.accountType,
      })
      .returning({ id: users.id, email: users.email, accountType: users.accountType });

    return NextResponse.json({ user: created }, { status: 201 });
  } catch (error) {
    console.error("register error", error);
    return NextResponse.json(
      { error: "Could not create account." },
      { status: 500 },
    );
  }
}
