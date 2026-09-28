import { ArrowLeft, ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ContactCard } from "@/components/contact/contact-card";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";
import { FadeIn } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";
import { parseMetrics, parsePairs } from "@/lib/portfolio-data";
import { PROJECT_ARCHITECTURE } from "@/lib/project-architecture";
import { getPublishedProject, getPublishedProjects } from "@/lib/portfolio-store";
import { getProfile } from "@/lib/profile-store";

type ProjectPageProps = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

const PHOTO = /\.(png|jpe?g|webp|avif)$/i;

function isUnoptimized(src: string): boolean {
  return (
    src.endsWith(".svg") ||
    (src.startsWith("http") &&
      !src.startsWith("https://cdn.dribbble.com/") &&
      !src.startsWith("https://images.unsplash.com/"))
  );
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getPublishedProject(id);
  return createMetadata({
    title: project ? `${project.iconLabel} case study` : "Project not found",
    description: project?.description ?? "Selected projects and case studies.",
    path: `/projects/${id}`,
    image: project && PHOTO.test(project.image) ? project.image : undefined,
    noIndex: !project,
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const [projects, profile] = await Promise.all([getPublishedProjects(), getProfile()]);
  const index = projects.findIndex((item) => item.id === id);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const metrics = parseMetrics(project.metrics);
  const decisions = parsePairs(project.decisions);
  const evidence = parsePairs(project.evidence);
  const gallery = parsePairs(project.gallery);
  const architecture = PROJECT_ARCHITECTURE[project.id];
  const isPublication = project.category.toLowerCase().includes("publication");
  const isScreenshot = PHOTO.test(project.image);

  const status = project.liveUrl
    ? "Live and publicly accessible"
    : isPublication
      ? "Published"
      : project.repositoryUrl
        ? "Source code on GitHub"
        : "Case study";

  const glance = [
    { label: "Type", value: project.category || "Project" },
    { label: "My role", value: project.role },
    { label: "Timeline", value: project.timeline },
    { label: "Status", value: status },
  ].filter((item) => item.value);

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(`About ${project.iconLabel}`)}`;

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <article className="mx-auto w-full max-w-275 px-6 pt-36 pb-10 sm:px-10 sm:pt-52 sm:pb-20">
        <FadeIn>
          <Link
            href="/projects"
            className="focus-ring group inline-flex items-center gap-2 rounded-lg text-sm font-medium text-foreground/55 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            All projects
          </Link>
          <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium tracking-tight text-foreground/55 sm:mt-16">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/50" />
            {project.iconLabel}
            <span className="text-foreground/25">/</span>
            {project.meta}
          </div>
          <h1 className="mt-6 max-w-[22ch] font-serif text-[clamp(2.3rem,5vw,4.4rem)] font-medium leading-[1.08] tracking-tight text-balance text-foreground">
            {project.title}
          </h1>
          <p className="mt-7 max-w-150 text-[19px] leading-[1.55] tracking-tight text-foreground/65 sm:text-[21px]">
            {project.description}
          </p>

          {(project.liveUrl || project.repositoryUrl || project.secondaryUrl) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex h-11 items-center gap-2 rounded-xl bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85"
                >
                  Open live app <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
              {project.repositoryUrl && (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    project.liveUrl
                      ? "focus-ring inline-flex h-11 items-center gap-2 rounded-xl border border-foreground/10 bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
                      : "focus-ring inline-flex h-11 items-center gap-2 rounded-xl bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85"
                  }
                >
                  View source code <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
              {project.secondaryUrl && (
                <a
                  href={project.secondaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex h-11 items-center gap-2 rounded-xl border border-foreground/10 bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
                >
                  {project.secondaryLabel || "Additional link"} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12 sm:mt-14">
          <dl
            className={`grid grid-cols-2 gap-2 rounded-4xl border border-foreground/5 bg-foreground/2 p-2 sm:p-3 dark:bg-foreground/5 ${
              glance.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
            }`}
          >
            {glance.map((item) => (
              <div key={item.label} className="rounded-3xl border border-foreground/5 bg-background p-4 sm:p-5">
                <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-foreground/45">{item.label}</dt>
                <dd className="mt-1.5 text-[14px] font-medium leading-snug tracking-tight text-foreground sm:text-[15px]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-8 sm:mt-10">
          <figure>
            <div className="relative overflow-hidden rounded-4xl border border-foreground/8 bg-foreground/5 p-1.5 shadow-sm">
              <div className="relative w-full overflow-hidden rounded-[1.65rem]" style={{ aspectRatio: project.imageRatio }}>
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(min-width: 1100px) 1020px, 100vw"
                  className="object-cover object-top"
                  priority
                  unoptimized={isUnoptimized(project.image)}
                />
              </div>
            </div>
            <figcaption className="mt-3 text-center text-[12px] text-foreground/45">
              {isScreenshot ? project.imageAlt : "Illustrative cover. The architecture, evidence links and source code below show the real system."}
            </figcaption>
          </figure>
        </FadeIn>

        {metrics.length > 0 && (
          <CaseSection title="Results" note="Verified numbers">
            <ul className={`grid gap-2 sm:gap-3 ${metrics.length >= 3 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2"}`}>
              {metrics.map((metric) => (
                <li key={metric.label} className="rounded-3xl border border-foreground/8 bg-background p-4 sm:p-5">
                  <p className="font-serif text-[1.9rem] font-medium leading-none tracking-tight text-foreground sm:text-[2.2rem]">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-[13px] leading-snug tracking-tight text-foreground/60">{metric.label}</p>
                </li>
              ))}
            </ul>
          </CaseSection>
        )}

        <CaseSection title={isPublication ? "Overview" : "The problem"} note={project.meta}>
          <p className="max-w-[62ch] text-[17px] leading-[1.75] tracking-tight text-foreground/75 sm:text-[18px]">
            {project.story || project.description}
          </p>
        </CaseSection>

        {architecture && (
          <CaseSection title="How it works" note="Simplified architecture">
            <ArchitectureDiagram architecture={architecture} />
          </CaseSection>
        )}

        {project.caseHighlights.length > 0 && (
          <CaseSection
            title={isPublication ? "Publication details" : "What I built"}
            note={isPublication ? undefined : `${project.caseHighlights.length} key contributions`}
          >
            <ol className="max-w-[62ch] space-y-5">
              {project.caseHighlights.map((highlight, itemIndex) => (
                <li
                  key={`${project.id}-highlight-${itemIndex}`}
                  className="flex gap-4 text-[15px] leading-[1.7] text-foreground/75 sm:text-[16px]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.2em] inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-foreground/10 text-[11px] font-medium tabular-nums text-foreground/55"
                  >
                    {itemIndex + 1}
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ol>
          </CaseSection>
        )}

        {decisions.length > 0 && (
          <CaseSection title="Key decisions" note="What I chose, and why">
            <dl className="flex flex-col gap-2 rounded-4xl border border-foreground/5 bg-foreground/2 p-2 sm:p-3 dark:bg-foreground/5">
              {decisions.map((decision) => (
                <div key={decision.left} className="rounded-3xl border border-foreground/5 bg-background p-4 sm:p-5">
                  <dt className="text-[15px] font-semibold tracking-tight text-foreground">{decision.left}</dt>
                  <dd className="mt-1 text-[14.5px] leading-relaxed tracking-tight text-foreground/65">{decision.right}</dd>
                </div>
              ))}
            </dl>
          </CaseSection>
        )}

        {project.learnings.length > 0 && (
          <CaseSection title="What I learned">
            <ul className="max-w-[62ch] space-y-3">
              {project.learnings.map((learning) => (
                <li key={learning} className="flex gap-3 text-[15px] leading-[1.7] text-foreground/75 sm:text-[16px]">
                  <span aria-hidden="true" className="mt-[0.75em] h-1 w-1 shrink-0 rounded-full bg-foreground/45" />
                  <span>{learning}</span>
                </li>
              ))}
            </ul>
          </CaseSection>
        )}

        {gallery.length > 0 && (
          <CaseSection title="Screenshots">
            <div className="flex flex-col gap-6">
              {gallery.map((shot) => (
                <figure key={shot.left}>
                  <div className="relative overflow-hidden rounded-3xl border border-foreground/8 bg-foreground/5 p-1 shadow-sm">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.25rem]">
                      <Image
                        src={shot.left}
                        alt={shot.right}
                        fill
                        sizes="(min-width: 1100px) 720px, 100vw"
                        className="object-cover object-top"
                        loading="lazy"
                        unoptimized={isUnoptimized(shot.left)}
                      />
                    </div>
                  </div>
                  <figcaption className="mt-2 text-[12.5px] text-foreground/50">{shot.right}</figcaption>
                </figure>
              ))}
            </div>
          </CaseSection>
        )}

        {evidence.length > 0 && (
          <CaseSection title="Evidence" note="Check the work yourself">
            <ul className="flex flex-col divide-y divide-foreground/8 rounded-3xl border border-foreground/8 bg-background">
              {evidence.map((item) => (
                <li key={item.right}>
                  <a
                    href={item.right}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring group flex items-center justify-between gap-4 rounded-3xl px-5 py-4 transition-colors hover:bg-foreground/[0.02]"
                  >
                    <span className="min-w-0">
                      <span className="block text-[14.5px] font-medium tracking-tight text-foreground">{item.left}</span>
                      <span className="mt-0.5 block truncate font-mono text-[11.5px] text-foreground/45">
                        {item.right.replace(/^https:\/\//, "")}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-foreground/45 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </CaseSection>
        )}

        {project.techStack.length > 0 && (
          <CaseSection title="Technology">
            <ul className="flex flex-wrap gap-2">
              {project.techStack.map((technology) => (
                <li
                  key={technology}
                  className="rounded-full border border-foreground/8 bg-background px-3.5 py-2 text-sm tracking-tight text-foreground/75"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </CaseSection>
        )}

        <FadeIn className="mt-14 sm:mt-20">
          <div className="rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
            <div className="flex flex-col gap-6 rounded-[1.6rem] border border-foreground/5 bg-foreground/1.5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:bg-foreground/3">
              <div>
                <h2 className="font-serif text-[1.5rem] font-medium tracking-tight text-foreground sm:text-[1.75rem]">
                  Want the details behind {project.iconLabel}?
                </h2>
                <p className="mt-2 max-w-[48ch] text-[15px] leading-relaxed text-foreground/60">
                  I&rsquo;m happy to walk through the architecture, trade-offs and code in a call or interview.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <a
                  href={mailto}
                  className="focus-ring inline-flex h-11 items-center gap-2 rounded-xl bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" /> Email me
                </a>
                <Link
                  href="/resume"
                  className="focus-ring inline-flex h-11 items-center gap-2 rounded-xl border border-foreground/10 bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
                >
                  View resume
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="flex flex-wrap items-center justify-between gap-6 pt-12 sm:pt-16">
          <Link
            href="/projects"
            className="focus-ring group inline-flex items-center gap-2 rounded-xl border border-foreground/8 bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All projects
          </Link>
          {projects.length > 1 && (
            <Link
              href={`/projects/${next.id}`}
              className="focus-ring group inline-flex items-center gap-2 rounded-lg text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              Next: {next.iconLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          )}
        </div>
      </article>
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}

function CaseSection({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: ReactNode;
}): ReactNode {
  return (
    <section className="grid gap-6 border-b border-foreground/8 py-12 sm:grid-cols-[1fr_2.4fr] sm:gap-14 sm:py-16">
      <FadeIn>
        <h2 className="text-sm font-semibold tracking-tight text-foreground">{title}</h2>
        {note ? <p className="mt-2 text-sm text-foreground/50">{note}</p> : null}
      </FadeIn>
      <FadeIn delay={0.08} className="min-w-0">
        {children}
      </FadeIn>
    </section>
  );
}
