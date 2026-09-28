import {
  ArrowRight,
  BookOpen,
  Bot,
  Compass,
  Layers,
  LineChart,
  ScanEye,
  Sparkles,
  Wand2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";
import { parseMetrics, type PortfolioProject } from "@/lib/portfolio-data";

export const PROJECT_ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  compass: Compass,
  "line-chart": LineChart,
  wand: Wand2,
  layers: Layers,
  bot: Bot,
  "scan-eye": ScanEye,
  "book-open": BookOpen,
};

export type ProjectsProps = {
  projects: PortfolioProject[];
  withHeadline?: boolean;
};

/** Featured projects in the rbp masonry grid. Pass only featured projects. */
export function Projects({ projects, withHeadline = false }: ProjectsProps): ReactNode {
  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <h2 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
              Selected work
            </h2>
            <p className="max-w-[36ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              Two internships, one product I shipped on my own, and one system that runs on hardware.
            </p>
          </FadeIn>
        ) : null}

        <div className="columns-1 gap-6 md:columns-2 md:gap-7">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {projects.length === 0 ? (
          <p className="py-16 text-center text-foreground/55">New projects are on their way.</p>
        ) : null}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: PortfolioProject;
  index: number;
}): ReactNode {
  const Icon = PROJECT_ICON_MAP[project.iconName] ?? Layers;
  const metrics = parseMetrics(project.metrics).slice(0, 3);
  const unoptimized =
    project.image.endsWith(".svg") ||
    (project.image.startsWith("http") &&
      !project.image.startsWith("https://cdn.dribbble.com/") &&
      !project.image.startsWith("https://images.unsplash.com/"));

  return (
    <FadeIn delay={Math.min(index * 0.06, 0.3)} className="mb-6 break-inside-avoid md:mb-7">
      <Link
        href={`/projects/${project.id}`}
        aria-label={`Read the ${project.iconLabel} case study`}
        className="focus-ring block rounded-3xl"
      >
        <article className="project-card flex cursor-pointer flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5">
          <header className="flex items-center gap-2.5 px-1 pt-2">
            <span className="border-foreground/10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background">
              <Icon className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
            </span>
            <span className="text-sm font-medium tracking-tight text-foreground">{project.iconLabel}</span>
            <span className="ml-auto flex items-center gap-2">
              {project.category ? (
                <span className="hidden text-[11.5px] tracking-tight text-foreground/45 sm:inline">
                  {project.category}
                </span>
              ) : null}
              {project.liveUrl ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-background px-2 py-0.5 text-[11px] font-medium tracking-tight text-foreground/75">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-foreground" />
                  Live
                </span>
              ) : null}
            </span>
          </header>

          <div
            className="project-card__image ring-foreground/5 relative w-full overflow-hidden rounded-2xl bg-foreground/5 ring-1"
            style={{ aspectRatio: project.imageRatio }}
          >
            <div className="project-card__image-inner">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw"
                className="object-cover object-top"
                priority={index < 2}
                unoptimized={unoptimized}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5 px-1 pb-1">
            <h3 className="text-[20px] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[22px]">
              {project.title}
            </h3>
            <p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
              {project.description}
            </p>
          </div>

          {metrics.length > 0 ? (
            <ul aria-label="Key results" className="flex flex-wrap gap-x-5 gap-y-1.5 px-1">
              {metrics.map((metric) => (
                <li key={metric.label} className="text-[13px] tracking-tight text-foreground/55">
                  <span className="font-semibold text-foreground">{metric.value}</span> {metric.label}
                </li>
              ))}
            </ul>
          ) : null}

          <p className="px-1 text-[12px] tracking-tight text-foreground/50">{project.meta}</p>

          {project.techStack.length > 0 ? (
            <ul aria-label="Technology stack" className="flex flex-wrap gap-1.5 px-1 pb-1">
              {project.techStack.slice(0, 4).map((technology) => (
                <li
                  key={technology}
                  className="rounded-full border border-foreground/8 bg-foreground/2 px-2.5 py-1 text-[11px] tracking-tight text-foreground/60 dark:bg-foreground/5"
                >
                  {technology}
                </li>
              ))}
              {project.techStack.length > 4 ? (
                <li className="rounded-full border border-foreground/8 bg-foreground/2 px-2.5 py-1 text-[11px] tracking-tight text-foreground/45 dark:bg-foreground/5">
                  +{project.techStack.length - 4}
                </li>
              ) : null}
            </ul>
          ) : null}
        </article>
      </Link>
    </FadeIn>
  );
}
