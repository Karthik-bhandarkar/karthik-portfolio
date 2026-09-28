import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ContactCard } from "@/components/contact/contact-card";
import { Hero } from "@/components/hero/hero";
import { PipelineRail } from "@/components/pipeline/pipeline-rail";
import { Projects } from "@/components/projects/projects";
import { SupportingWork } from "@/components/projects/supporting-work";
import { Approach } from "@/components/story/approach";
import { Journey } from "@/components/story/journey";
import { createMetadata, siteConfig } from "@/lib/metadata";
import { getPublishedProjects } from "@/lib/portfolio-store";
import { getProfile } from "@/lib/profile-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: `${siteConfig.name} — Software Engineer (Python, Backend & AI)`,
  absoluteTitle: true,
  description: siteConfig.description,
  path: "/",
});

/**
 * Story order: who I am (hero) → proof of work → how I think → how I got here
 * → skills index → contact.
 */
export default async function HomePage(): Promise<ReactNode> {
  const [projects, profile] = await Promise.all([getPublishedProjects(), getProfile()]);
  const featured = projects.filter((project) => project.featured);
  const supporting = projects.filter((project) => !project.featured);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    jobTitle: "Software Engineer",
    url: siteConfig.url,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "East West Institute of Technology" },
      { "@type": "EducationalOrganization", name: "DVS Polytechnic" },
    ],
    knowsAbout: ["Python", "FastAPI", "LangGraph", "Multi-agent systems", "Retrieval-augmented generation", "SQL", "Computer vision"],
    sameAs: [profile.linkedInUrl, profile.githubUrl, profile.leetcodeUrl].filter(Boolean),
  };

  return (
    <main id="main-content" className="flex flex-1 flex-col gap-20 sm:gap-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }}
      />
      <Hero />

      <div className="flex flex-col gap-10 sm:gap-12">
        <Projects projects={featured} withHeadline />
        <SupportingWork projects={supporting} title="Also: research and practice" />
        <div className="flex justify-center px-6">
          <Link
            href="/projects"
            className="border border-foreground/8 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
          >
            All projects and case studies
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <Approach />
      <Journey />
      <PipelineRail />
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
