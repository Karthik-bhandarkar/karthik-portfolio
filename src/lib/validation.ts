import { z } from "zod";

const secureLink = z.union([
  z.literal(""),
  z.string().trim().url().startsWith("https://").max(500),
]);

export const PROJECT_ICONS = [
  "sparkles",
  "compass",
  "line-chart",
  "wand",
  "layers",
  "bot",
  "scan-eye",
  "book-open",
] as const;

/** "left | right" pairs, e.g. "Decision | reason" or "Label | https://…". */
function pipePair(max: number) {
  return z
    .string()
    .trim()
    .min(5)
    .max(max)
    .refine((value) => value.includes("|"), "Use the format: first part | second part");
}

export const contactInputSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  subject: z.string().trim().min(2).max(160),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(200).optional().default(""),
});

export type ContactInput = z.infer<typeof contactInputSchema>;

export const projectInputSchema = z.object({
  id: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(80),
  iconName: z.enum(PROJECT_ICONS),
  iconLabel: z.string().trim().min(1).max(120),
  title: z.string().trim().min(5).max(500),
  description: z.string().trim().min(10).max(1200),
  meta: z.string().trim().min(2).max(160),
  image: z.string().trim().refine(
    (value) => value.startsWith("/") || /^https:\/\/[^\s]+$/i.test(value),
    "Use a local image path or a secure image URL."
  ),
  imageAlt: z.string().trim().min(2).max(240),
  imageRatio: z.number().positive().max(5),
  story: z.string().trim().max(6000).nullable().optional(),
  techStack: z.array(z.string().trim().min(1).max(60)).max(30),
  caseHighlights: z.array(z.string().trim().min(5).max(600)).max(12),
  repositoryUrl: secureLink,
  liveUrl: secureLink,
  secondaryUrl: secureLink,
  secondaryLabel: z.string().trim().max(80),
  role: z.string().trim().max(120).default(""),
  timeline: z.string().trim().max(80).default(""),
  category: z.string().trim().max(80).default(""),
  metrics: z
    .array(
      z
        .string()
        .trim()
        .min(3)
        .max(90)
        .refine((value) => value.includes("|"), "Use the format: value | label")
    )
    .max(6)
    .default([]),
  featured: z.boolean().default(false),
  decisions: z.array(pipePair(300)).max(8).default([]),
  learnings: z.array(z.string().trim().min(5).max(400)).max(6).default([]),
  evidence: z
    .array(
      pipePair(500).refine((value) => /\|\s*https:\/\/\S+$/.test(value), "Use the format: label | https://link")
    )
    .max(8)
    .default([]),
  gallery: z
    .array(pipePair(300).refine((value) => value.trim().startsWith("/"), "Use the format: /image-path | caption"))
    .max(6)
    .default([]),
  sortOrder: z.number().int().min(0).max(10000),
  isPublished: z.boolean(),
});

export type ProjectInput = z.infer<typeof projectInputSchema>;

export async function parseSmallJson(request: Request): Promise<unknown> {
  const length = Number(request.headers.get("content-length"));
  if (length > 16000) throw new Error("Request is too large.");
  const raw = await request.text();
  if (raw.length > 16000) throw new Error("Request is too large.");
  return JSON.parse(raw) as unknown;
}
