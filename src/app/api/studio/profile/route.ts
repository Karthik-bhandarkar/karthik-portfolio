import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/db";
import { portfolioProfile } from "@/db/schema";
import { isAdminRequest, unauthorizedResponse } from "@/lib/admin-auth";
import { getProfile } from "@/lib/profile-store";
import { parseSmallJson } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const imagePath = z.string().trim().refine(
  (value) => value.startsWith("/") || /^https:\/\/[^\s]+$/i.test(value),
  "Use a local image path or a secure image URL."
);
const optionalSecureLink = z.union([
  z.literal(""),
  z.string().trim().url().startsWith("https://").max(500),
]);

const profileInput = z.object({
  firstName: z.string().trim().min(1).max(80),
  fullName: z.string().trim().min(2).max(120),
  headlineOne: z.string().trim().min(2).max(120),
  headlineTwo: z.string().trim().min(2).max(120),
  intro: z.string().trim().min(10).max(500),
  aboutIntro: z.string().trim().min(30).max(2400),
  location: z.string().trim().min(2).max(160),
  phone: z.string().trim().max(40).regex(/^[+\d()\s-]*$/),
  workAuthorization: z.string().trim().max(100),
  email: z.string().trim().toLowerCase().email().max(254),
  portraitDefault: z.union([z.literal(""), imagePath]),
  portraitHover: z.union([z.literal(""), imagePath]),
  linkedInUrl: optionalSecureLink,
  githubUrl: optionalSecureLink,
  leetcodeUrl: optionalSecureLink,
  xUrl: optionalSecureLink,
  targetRoles: z.array(z.string().trim().min(2).max(160)).max(12),
  contactIntro: z.string().trim().min(10).max(600),
  footerCredit: z.string().trim().max(120),
});

export async function GET(request: Request) {
  if (!isAdminRequest(request)) return unauthorizedResponse();
  const profile = await getProfile();
  return Response.json({ profile }, { headers: { "Cache-Control": "no-store" } });
}

export async function PATCH(request: Request) {
  if (!isAdminRequest(request)) return unauthorizedResponse();

  let body: unknown;
  try {
    body = await parseSmallJson(request);
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = profileInput.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: "Please check the profile details.", details: result.error.flatten() },
      { status: 422 }
    );
  }

  try {
    await getProfile();
    const [profile] = await db
      .update(portfolioProfile)
      .set({ ...result.data, updatedAt: new Date() })
      .where(eq(portfolioProfile.id, "main"))
      .returning();
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/contact");
    revalidatePath("/projects");
    return Response.json({ profile });
  } catch (error) {
    console.error("Unable to update portfolio profile", error);
    return Response.json({ error: "Could not save the profile." }, { status: 500 });
  }
}
