import { desc } from "drizzle-orm";

import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { isAdminRequest, unauthorizedResponse } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  try {
    const messages = await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt))
      .limit(100);
    return Response.json(
      { messages },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Unable to load contact messages", error);
    return Response.json({ error: "Could not load messages." }, { status: 500 });
  }
}
