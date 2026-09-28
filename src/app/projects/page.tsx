import { ContactCard } from "@/components/contact/contact-card";
import { Projects } from "@/components/projects/projects";
import { SupportingWork } from "@/components/projects/supporting-work";
import { FadeIn } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";
import { getPublishedProjects } from "@/lib/portfolio-store";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description:
    "Case studies by Karthik Bhandarkar: LangGraph multi-agent systems, FastAPI backends, computer vision and data analytics.",
  path: "/projects",
});

export default async function ProjectsPage(): Promise<ReactNode> {
  const projects = await getPublishedProjects();
  const featured = projects.filter((project) => project.featured);
  const supporting = projects.filter((project) => !project.featured);

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-275 px-6 pt-44 pb-16 sm:px-10 sm:pt-56 sm:pb-20">
        <FadeIn className="flex flex-col items-center gap-5 text-center">
          <h1 className="font-serif text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3.25rem] lg:text-[3.75rem]">
            Projects &amp; case studies
          </h1>
          <p className="max-w-[40ch] text-[20px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px]">
            Each case study covers the problem, how the system works, the decisions I made and links
            you can use to check the work.
          </p>
        </FadeIn>
      </section>
      <Projects projects={featured} />
      <div className="mt-10 sm:mt-14">
        <SupportingWork projects={supporting} />
      </div>
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
