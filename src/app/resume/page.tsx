import { ArrowUpRight, Download, Mail } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";
import { resume, type ResumeEntry } from "@/lib/resume-data";

export const metadata: Metadata = createMetadata({
  title: "Resume",
  description:
    "Resume of Karthik Bhandarkar, software engineer: Python, FastAPI, LangGraph and SQL, with internships at Infosys Springboard and Dyashin Technosoft.",
  path: "/resume",
});

export default function ResumePage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-215 px-6 pt-36 pb-20 sm:px-10 sm:pt-48 sm:pb-28 print:max-w-none print:p-0">
        <FadeIn className="mb-8 flex flex-wrap items-end justify-between gap-5 print:hidden">
          <div>
            <h1 className="font-serif text-[2.25rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-[2.75rem]">
              Resume
            </h1>
            <p className="mt-2 text-[15px] tracking-tight text-foreground/60">
              One page, text-based PDF. Details for every item are in the case studies.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/resume.pdf"
              download="Karthik-Bhandarkar-Resume.pdf"
              className="focus-ring inline-flex h-11 items-center gap-2 rounded-xl bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download PDF
            </a>
            <a
              href={`mailto:${resume.email}`}
              className="focus-ring inline-flex h-11 items-center gap-2 rounded-xl border border-foreground/10 bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <article className="rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm print:rounded-none print:border-0 print:p-0 print:shadow-none">
            <div className="rounded-[1.6rem] border border-foreground/5 bg-foreground/1.5 p-7 sm:p-12 dark:bg-foreground/3 print:rounded-none print:border-0 print:bg-transparent print:p-0">
              <header className="border-b border-foreground/10 pb-7">
                <p className="font-serif text-[2rem] font-medium leading-none tracking-tight text-foreground sm:text-[2.5rem]">
                  {resume.name}
                </p>
                <p className="mt-3 text-[16px] font-medium tracking-tight text-foreground/75">{resume.title}</p>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] tracking-tight text-foreground/60">
                  <li>{resume.location}</li>
                  <li>
                    <a className="focus-ring rounded-sm hover:text-foreground" href={`tel:${resume.phone.replace(/[^+\d]/g, "")}`}>
                      {resume.phone}
                    </a>
                  </li>
                  <li>
                    <a className="focus-ring rounded-sm hover:text-foreground" href={`mailto:${resume.email}`}>
                      {resume.email}
                    </a>
                  </li>
                  {resume.links.map((link) => (
                    <li key={link.href}>
                      <a
                        className="focus-ring inline-flex items-center gap-0.5 rounded-sm hover:text-foreground"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3 w-3 print:hidden" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </header>

              <ResumeSection title="Summary">
                <p className="text-[15px] leading-[1.7] tracking-tight text-foreground/80">{resume.summary}</p>
              </ResumeSection>

              <ResumeSection title="Experience">
                <div className="space-y-7">
                  {resume.experience.map((entry) => (
                    <Entry key={entry.org} entry={entry} />
                  ))}
                </div>
              </ResumeSection>

              <ResumeSection title="Projects">
                <div className="space-y-7">
                  {resume.projects.map((entry) => (
                    <Entry key={entry.title} entry={entry} />
                  ))}
                </div>
              </ResumeSection>

              <ResumeSection title="Skills">
                <dl className="space-y-2.5">
                  {resume.skills.map((group) => (
                    <div key={group.label} className="grid gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
                      <dt className="text-[13.5px] font-semibold tracking-tight text-foreground">{group.label}</dt>
                      <dd className="text-[14px] leading-relaxed tracking-tight text-foreground/75">{group.items}</dd>
                    </div>
                  ))}
                </dl>
              </ResumeSection>

              <ResumeSection title="Education">
                <div className="space-y-4">
                  {resume.education.map((school) => (
                    <div key={school.degree} className="print:break-inside-avoid">
                      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                        <h3 className="text-[15px] font-semibold tracking-tight text-foreground">{school.degree}</h3>
                        <p className="shrink-0 text-[13px] tabular-nums tracking-tight text-foreground/50">{school.period}</p>
                      </div>
                      <p className="mt-0.5 text-[13.5px] tracking-tight text-foreground/60">
                        {school.school} · {school.result}
                      </p>
                    </div>
                  ))}
                </div>
              </ResumeSection>

              <ResumeSection title="Certifications & publication">
                <BulletList items={resume.credentials} />
              </ResumeSection>
            </div>
          </article>
        </FadeIn>
      </section>
    </main>
  );
}

function ResumeSection({ title, children }: { title: string; children: ReactNode }): ReactNode {
  return (
    <section className="grid gap-4 border-b border-foreground/8 py-7 last:border-b-0 last:pb-0 sm:grid-cols-[10rem_1fr] sm:gap-8">
      <h2 className="text-[12px] font-semibold uppercase tracking-[0.1em] text-foreground/50">{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function Entry({ entry }: { entry: ResumeEntry }): ReactNode {
  return (
    <div className="print:break-inside-avoid">
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
          {entry.title} <span className="font-normal text-foreground/60">· {entry.org}</span>
        </h3>
        <p className="shrink-0 text-[13px] tabular-nums tracking-tight text-foreground/50">{entry.period}</p>
      </div>
      <p className="mt-0.5 text-[13px] tracking-tight text-foreground/55">
        {entry.subtitle}
        {entry.link ? (
          <>
            {" · "}
            <a
              className="focus-ring rounded-sm text-foreground/80 underline decoration-foreground/25 underline-offset-2 hover:text-foreground"
              href={entry.link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {entry.link.label}
            </a>
          </>
        ) : null}
      </p>
      <div className="mt-3">
        <BulletList items={entry.bullets} />
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }): ReactNode {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[14px] leading-[1.65] tracking-tight text-foreground/75">
          <span aria-hidden="true" className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-foreground/45" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
