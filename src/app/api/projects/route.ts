import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { portfolioProjects } from "@/db/schema";
import { isAdminRequest, unauthorizedResponse } from "@/lib/admin-auth";
import { getAllProjects, getPublishedProjects } from "@/lib/portfolio-store";
import { parseSmallJson, projectInputSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const projects = isAdminRequest(request)
    ? await getAllProjects()
    : await getPublishedProjects();
  return Response.json(
    { projects },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) return unauthorizedResponse();

  let body: unknown;
  try {
    body = await parseSmallJson(request);
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = projectInputSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: "Please check the project's details.", details: result.error.flatten() },
      { status: 422 }
    );
  }

  try {
    const [project] = await db
      .insert(portfolioProjects)
      .values({ ...result.data, story: result.data.story ?? null })
      .returning();
    revalidatePath("/");
    revalidatePath("/projects");
    return Response.json({ project }, { status: 201 });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "23505") {
      return Response.json({ error: "That project ID already exists." }, { status: 409 });
    }
    console.error("Unable to add portfolio project", error);
    return Response.json({ error: "Could not save the project." }, { status: 500 });
  }
}
