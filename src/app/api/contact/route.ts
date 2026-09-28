import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { contactInputSchema, parseSmallJson } from "@/lib/validation";
import { and, count, eq, gte } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let input: unknown;
  try {
    input = await parseSmallJson(request);
  } catch {
    return Response.json(
      { ok: false, error: "Please send a valid, smaller message." },
      { status: 400 }
    );
  }

  const result = contactInputSchema.safeParse(input);
  if (!result.success) {
    return Response.json(
      { ok: false, error: "Please check your details and try again." },
      { status: 422 }
    );
  }

  // A hidden field discourages basic automated submissions without affecting people.
  if (result.data.website) return Response.json({ ok: true }, { status: 201 });

  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const [recent] = await db
      .select({ total: count() })
      .from(contactMessages)
      .where(
        and(
          eq(contactMessages.email, result.data.email),
          gte(contactMessages.createdAt, oneHourAgo)
        )
      );

    if ((recent?.total ?? 0) >= 3) {
      return Response.json(
        { ok: false, error: "You've sent a few notes already. Please try again later." },
        { status: 429 }
      );
    }

    await db.insert(contactMessages).values({
      name: result.data.name,
      email: result.data.email,
      subject: result.data.subject,
      message: result.data.message,
    });

    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Unable to save contact message", error);
    return Response.json(
      { ok: false, error: "Your message couldn't be sent right now. Please try again." },
      { status: 500 }
    );
  }
}
