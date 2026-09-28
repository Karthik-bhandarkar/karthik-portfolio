import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { portfolioProjects } from "@/db/schema";
import { isAdminRequest, unauthorizedResponse } from "@/lib/admin-auth";
import { parseSmallJson, projectInputSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Context) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  const { id } = await params;

  let body: unknown;
  try {
    body = await parseSmallJson(request);
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = projectInputSchema.safeParse(body);
  if (!result.success || result.data.id !== id) {
    return Response.json(
      { error: "Please check the project's details and ID." },
      { status: 422 }
    );
  }

  try {
    const [project] = await db
      .update(portfolioProjects)
      .set({ ...result.data, story: result.data.story ?? null, updatedAt: new Date() })
      .where(eq(portfolioProjects.id, id))
      .returning();
    if (!project) return Response.json({ error: "Project not found." }, { status: 404 });
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath(`/projects/${id}`);
    return Response.json({ project });
  } catch (error) {
    console.error("Unable to update portfolio project", error);
    return Response.json({ error: "Could not update the project." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Context) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  const { id } = await params;

  try {
    const rows = await db.select({ id: portfolioProjects.id }).from(portfolioProjects);
    if (rows.length <= 1) {
      return Response.json(
        { error: "Keep at least one project record. You can unpublish it instead." },
        { status: 400 }
      );
    }
    const [deleted] = await db
      .delete(portfolioProjects)
      .where(eq(portfolioProjects.id, id))
      .returning({ id: portfolioProjects.id });
    if (!deleted) return Response.json({ error: "Project not found." }, { status: 404 });
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath(`/projects/${id}`);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Unable to remove portfolio project", error);
    return Response.json({ error: "Could not remove the project." }, { status: 500 });
  }
}
