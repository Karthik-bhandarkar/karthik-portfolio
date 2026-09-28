import { db } from "@/db";
import { portfolioProjects } from "@/db/schema";
import { asc, eq, inArray, sql } from "drizzle-orm";
import { initialProjects, type PortfolioProject } from "./portfolio-data";

const referenceDemoIds = ["loom", "atlas", "rhythm", "groove", "fieldnote", "talkback"];

const projectFields = {
  id: portfolioProjects.id,
  iconName: portfolioProjects.iconName,
  iconLabel: portfolioProjects.iconLabel,
  title: portfolioProjects.title,
  description: portfolioProjects.description,
  meta: portfolioProjects.meta,
  image: portfolioProjects.image,
  imageAlt: portfolioProjects.imageAlt,
  imageRatio: portfolioProjects.imageRatio,
  story: portfolioProjects.story,
  techStack: portfolioProjects.techStack,
  caseHighlights: portfolioProjects.caseHighlights,
  repositoryUrl: portfolioProjects.repositoryUrl,
  liveUrl: portfolioProjects.liveUrl,
  secondaryUrl: portfolioProjects.secondaryUrl,
  secondaryLabel: portfolioProjects.secondaryLabel,
  role: portfolioProjects.role,
  timeline: portfolioProjects.timeline,
  category: portfolioProjects.category,
  metrics: portfolioProjects.metrics,
  featured: portfolioProjects.featured,
  decisions: portfolioProjects.decisions,
  learnings: portfolioProjects.learnings,
  evidence: portfolioProjects.evidence,
  gallery: portfolioProjects.gallery,
  sortOrder: portfolioProjects.sortOrder,
  isPublished: portfolioProjects.isPublished,
  createdAt: portfolioProjects.createdAt,
  updatedAt: portfolioProjects.updatedAt,
};

type ProjectRow = PortfolioProject & { createdAt: Date; updatedAt: Date };

const CONTENT_KEYS: readonly (keyof PortfolioProject)[] = [
  "iconName", "iconLabel", "title", "description", "meta", "image", "imageAlt", "imageRatio",
  "story", "techStack", "caseHighlights", "repositoryUrl", "liveUrl", "secondaryUrl",
  "secondaryLabel", "role", "timeline", "category", "metrics", "featured", "decisions",
  "learnings", "evidence", "gallery", "sortOrder", "isPublished",
];

function matchesSeed(row: PortfolioProject, seed: PortfolioProject): boolean {
  return CONTENT_KEYS.every((key) => {
    const current = row[key];
    const expected = seed[key];
    if (typeof current === "number" && typeof expected === "number") {
      return Math.abs(current - expected) < 1e-4;
    }
    return JSON.stringify(current ?? null) === JSON.stringify(expected ?? null);
  });
}

function toProject(row: ProjectRow): PortfolioProject {
  return {
    id: row.id,
    iconName: row.iconName,
    iconLabel: row.iconLabel,
    title: row.title,
    description: row.description,
    meta: row.meta,
    image: row.image,
    imageAlt: row.imageAlt,
    imageRatio: row.imageRatio,
    story: row.story,
    techStack: row.techStack,
    caseHighlights: row.caseHighlights,
    repositoryUrl: row.repositoryUrl,
    liveUrl: row.liveUrl,
    secondaryUrl: row.secondaryUrl,
    secondaryLabel: row.secondaryLabel,
    role: row.role,
    timeline: row.timeline,
    category: row.category,
    metrics: row.metrics,
    featured: row.featured,
    decisions: row.decisions,
    learnings: row.learnings,
    evidence: row.evidence,
    gallery: row.gallery,
    sortOrder: row.sortOrder,
    isPublished: row.isPublished,
  };
}

async function selectRows(): Promise<ProjectRow[]> {
  return db
    .select(projectFields)
    .from(portfolioProjects)
    .orderBy(asc(portfolioProjects.sortOrder), asc(portfolioProjects.id));
}

/**
 * PostgreSQL holds the editable project records. Rows that were never edited
 * in Studio (created_at = updated_at) are kept in sync with the latest
 * verified copy; anything edited in Studio is never overwritten.
 */
export async function getAllProjects(): Promise<PortfolioProject[]> {
  try {
    let rows = await selectRows();

    if (
      rows.length > 0 &&
      rows.length <= referenceDemoIds.length &&
      rows.every((row) => referenceDemoIds.includes(row.id))
    ) {
      await db.delete(portfolioProjects).where(inArray(portfolioProjects.id, referenceDemoIds));
      rows = [];
    }

    if (rows.length === 0) {
      await db.insert(portfolioProjects).values(initialProjects).onConflictDoNothing();
      rows = await selectRows();
    } else {
      let refreshed = false;
      for (const seed of initialProjects) {
        const row = rows.find((candidate) => candidate.id === seed.id);
        if (!row) continue;
        const untouched = row.createdAt.getTime() === row.updatedAt.getTime();
        if (untouched && !matchesSeed(row, seed)) {
          await db
            .update(portfolioProjects)
            .set({ ...seed, updatedAt: sql`${portfolioProjects.createdAt}` })
            .where(eq(portfolioProjects.id, seed.id));
          refreshed = true;
        }
      }
      if (refreshed) rows = await selectRows();
    }

    return rows.map(toProject);
  } catch (error) {
    // Keep pages available if the database has not received the latest schema push yet.
    console.error("Unable to load portfolio projects; using verified portfolio content.", error);
    return initialProjects;
  }
}

export async function getPublishedProjects(): Promise<PortfolioProject[]> {
  return (await getAllProjects()).filter((project) => project.isPublished);
}

export async function getPublishedProject(
  id: string
): Promise<PortfolioProject | undefined> {
  return (await getPublishedProjects()).find((project) => project.id === id);
}
