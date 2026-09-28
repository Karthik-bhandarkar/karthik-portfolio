import { ArrowRight, Layers } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";
import type { PortfolioProject } from "@/lib/portfolio-data";
import { PROJECT_ICON_MAP } from "./projects";

/** Compact list for non-featured work (research, coursework, practice). */
export function SupportingWork({
  projects,
  title = "Supporting work",
}: {
  projects: PortfolioProject[];
  title?: string;
}): ReactNode {
  if (projects.length === 0) return null;

  return (
    <section aria-labelledby="supporting-work-heading" className="mx-auto w-full max-w-275 px-6 sm:px-10">
      <FadeIn>
        <h2 id="supporting-work-heading" className="mb-3 px-1 text-[15px] font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <ul className="grid gap-2 rounded-4xl border border-foreground/5 bg-foreground/2 p-2 sm:p-3 md:grid-cols-2 dark:bg-foreground/5">
          {projects.map((project) => {
            const Icon = PROJECT_ICON_MAP[project.iconName] ?? Layers;
            return (
              <li key={project.id}>
                <Link
                  href={`/projects/${project.id}`}
                  className="focus-ring group flex h-full items-start gap-4 rounded-3xl border border-foreground/5 bg-background p-4 transition-colors hover:border-foreground/15 sm:p-5"
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-foreground/10 bg-background">
                    <Icon className="h-4 w-4 text-foreground" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12px] font-medium tracking-tight text-foreground/50">
                      {project.category || project.iconLabel} · {project.timeline || project.meta}
                    </span>
                    <span className="mt-1 block text-[15.5px] font-medium leading-snug tracking-tight text-foreground">
                      {project.title}
                    </span>
                  </span>
                  <ArrowRight
                    className="mt-1 h-4 w-4 shrink-0 text-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </FadeIn>
    </section>
  );
}
