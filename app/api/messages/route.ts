import { NextResponse } from "next/server";
import { and, desc, eq, or } from "drizzle-orm";
import { z } from "zod";
import { getDb, hasDatabase } from "@/db";
import { messages } from "@/db/schema";
import { isDemoMode } from "@/lib/demo-data";
import { getSession } from "@/lib/session";

const bodySchema = z.object({
  recipientId: z.string().min(1),
  body: z.string().min(1).max(2000),
});

export async function GET() {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  if (!hasDatabase() || isDemoMode()) {
    return NextResponse.json({ messages: [] });
  }

  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(messages)
      .where(
        or(
          eq(messages.senderId, session.user.id),
          eq(messages.recipientId, session.user.id),
        ),
      )
      .orderBy(desc(messages.createdAt))
      .limit(100);

    return NextResponse.json({ messages: rows });
  } catch (error) {
    console.error("messages get error", error);
    return NextResponse.json({ messages: [] });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid message." }, { status: 400 });
    }

    if (!hasDatabase() || isDemoMode()) {
      return NextResponse.json(
        {
          message: {
            id: `demo-msg-${Date.now()}`,
            senderId: session.user.id,
            recipientId: parsed.data.recipientId,
            body: parsed.data.body,
            readAt: null,
            createdAt: new Date().toISOString(),
          },
        },
        { status: 201 },
      );
    }

    const db = getDb();
    const [created] = await db
      .insert(messages)
      .values({
        senderId: session.user.id,
        recipientId: parsed.data.recipientId,
        body: parsed.data.body,
      })
      .returning();

    return NextResponse.json({ message: created }, { status: 201 });
  } catch (error) {
    console.error("message error", error);
    return NextResponse.json(
      { error: "Could not send message." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  if (!hasDatabase() || isDemoMode()) {
    return NextResponse.json({ ok: true });
  }

  const json = await request.json();
  const id = z.string().uuid().safeParse(json.id);
  if (!id.success) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const db = getDb();
    await db
      .update(messages)
      .set({ readAt: new Date() })
      .where(
        and(
          eq(messages.id, id.data),
          eq(messages.recipientId, session.user.id),
        ),
      );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("message patch error", error);
    return NextResponse.json({ ok: true });
  }
}
