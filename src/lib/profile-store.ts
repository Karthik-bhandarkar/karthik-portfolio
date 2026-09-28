import { db } from "@/db";
import { portfolioProfile } from "@/db/schema";
import { eq } from "drizzle-orm";

export type PortfolioProfile = Omit<typeof portfolioProfile.$inferSelect, "updatedAt">;

/**
 * Profile copy. `aboutIntro` paragraphs are separated by blank lines and
 * support **bold** emphasis. Leave `portraitDefault` empty until a real photo
 * (.webp, .png or .jpg in /public) is ready; the hero shows a profile card until then.
 */
export const defaultProfile: PortfolioProfile = {
  id: "main",
  firstName: "Karthik",
  fullName: "Karthik Bhandarkar",
  headlineOne: "I build backends",
  headlineTwo: "and AI systems.",
  intro:
    "Software engineer in Bengaluru. I build FastAPI services, LangGraph agent systems and data pipelines in Python, with the validation and tests that make them dependable.",
  aboutIntro: [
    "I’m a **software engineer** in Bengaluru who builds **Python backends, multi-agent AI systems and data pipelines**. I graduated in 2026 with a **B.E. in Computer Science and Engineering** from East West Institute of Technology (CGPA 8.26), after completing a diploma in the same field.",
    "At **Infosys Springboard**, my internship deliverable was EduPulse AI: a LangGraph supervisor coordinating four specialist agents, with FAISS retrieval, validated FastAPI endpoints and **57 automated pytest cases**. At **Dyashin Technosoft**, I automated data preparation for **6,607 student records** and built the T-SQL reporting and Tableau dashboard used for institutional review.",
    "Independently, I built and deployed **Arogya**, a multi-agent wellness assistant with real-time streaming and OAuth 2.0 / JWT sign-in, and an **assistive vision system** with 3.3 ms YOLOv11 inference per frame on a Tesla T4. I hold two **Oracle Cloud Infrastructure AI certifications** and a journal publication in IJSART.",
    "I’m looking for **software engineering roles across backend, AI and data teams**, where well-tested, maintainable software matters.",
  ].join("\n\n"),
  location: "Bengaluru, Karnataka, India",
  phone: "+91 98450 75077",
  workAuthorization: "India — Citizen",
  email: "karthikbhandarkar2004@gmail.com",
  portraitDefault: "",
  portraitHover: "",
  linkedInUrl: "https://linkedin.com/in/karthikbhandarkar",
  githubUrl: "https://github.com/Karthik-bhandarkar",
  leetcodeUrl: "https://leetcode.com/u/karthik_bhandarkar/",
  xUrl: "",
  targetRoles: [
    "Software Engineer",
    "Backend / Python Developer",
    "AI & Agent Systems Engineer",
    "Data / BI Analyst",
  ],
  contactIntro:
    "Hiring for a software engineering, backend or AI role? I’d be glad to talk. Email is the quickest way to reach me.",
  footerCredit: "Built with Next.js · Design by React Bits Pro",
};

/** Intros from earlier automatic copy revisions; rows still using them get the current copy. */
const LEGACY_INTROS = [
  "I build Python backends, multi-agent AI systems and data pipelines, grounded in testing, validation and solid CS fundamentals.",
  "Independent engineer focused on interfaces that feel calm, considered, and quietly fast.",
  "I build Python backends, multi-agent AI systems, and data tools grounded in strong computer science fundamentals.",
  "Python engineer in Bengaluru. Two internships, one peer-reviewed publication, and a multi-agent assistant that is live right now — with 57 passing tests behind it.",
];

export async function getProfile(): Promise<PortfolioProfile> {
  try {
    let [profile] = await db
      .select()
      .from(portfolioProfile)
      .where(eq(portfolioProfile.id, "main"))
      .limit(1);

    if (!profile) {
      await db.insert(portfolioProfile).values(defaultProfile).onConflictDoNothing();
      [profile] = await db
        .select()
        .from(portfolioProfile)
        .where(eq(portfolioProfile.id, "main"))
        .limit(1);
    }

    if (profile && LEGACY_INTROS.includes(profile.intro)) {
      [profile] = await db
        .update(portfolioProfile)
        .set({ ...defaultProfile, updatedAt: new Date() })
        .where(eq(portfolioProfile.id, "main"))
        .returning();
    }

    return profile ?? defaultProfile;
  } catch (error) {
    console.error("Unable to load portfolio profile; using portfolio defaults.", error);
    return defaultProfile;
  }
}
