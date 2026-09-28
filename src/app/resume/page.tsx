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
      <section className="mx-auto w-full max-w-235 px-4 pt-36 pb-20 sm:px-8 sm:pt-48 sm:pb-28 print:max-w-none print:p-0">
        {/* Top Action Bar */}
        <FadeIn className="mb-8 flex flex-wrap items-end justify-between gap-5 print:hidden">
          <div>
            <h1 className="font-serif text-[2.25rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-[2.75rem]">
              Resume
            </h1>
            <p className="mt-2 text-[15px] tracking-tight text-foreground/60">
              Verified software engineering record · Formatted after standard LaTeX publication template.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/resume.pdf"
              download="Karthik-Bhandarkar-Resume.pdf"
              className="focus-ring inline-flex h-11 items-center gap-2 rounded-xl bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85 shadow-sm"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download PDF
            </a>
            <a
              href="https://www.linkedin.com/in/karthik-bhandarkar/"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex h-11 items-center gap-2 rounded-xl border border-[#0A66C2]/30 bg-[#0A66C2]/10 px-4 text-sm font-medium text-[#0A66C2] transition-colors hover:bg-[#0A66C2]/15 dark:bg-[#0A66C2]/20 dark:text-[#70b5f9]"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              LinkedIn Profile
            </a>
            <a
              href={`mailto:${resume.email}`}
              className="focus-ring inline-flex h-11 items-center gap-2 rounded-xl border border-foreground/10 bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email
            </a>
          </div>
        </FadeIn>

        {/* Real Document Sheet */}
        <FadeIn delay={0.1}>
          <article className="mx-auto w-full max-w-[850px] rounded-xl border border-zinc-200/90 bg-white p-7 text-zinc-900 shadow-xl transition-shadow sm:p-12 md:p-16 dark:border-zinc-800/80 dark:bg-[#fafafa] dark:text-zinc-900 print:max-w-none print:rounded-none print:border-0 print:p-0 print:shadow-none">
            {/* Header (Centered like LaTeX) */}
            <header className="text-center">
              <h1 className="text-[26px] font-bold tracking-tight text-zinc-900 sm:text-[30px]">
                {resume.name}
              </h1>

              {/* Contact row */}
              <div className="mt-1.5 flex flex-wrap items-center justify-center gap-x-2 text-[13px] text-zinc-700 sm:text-[13.5px]">
                <a
                  href={`tel:${resume.phone.replace(/[^+\d]/g, "")}`}
                  className="hover:text-zinc-950 hover:underline"
                >
                  {resume.phone}
                </a>
                <span className="text-zinc-400">|</span>
                <a
                  href={`mailto:${resume.email}`}
                  className="hover:text-zinc-950 hover:underline"
                >
                  {resume.email}
                </a>
                <span className="text-zinc-400">|</span>
                <span>{resume.location}</span>
              </div>

              {/* Links row */}
              <div className="mt-1 flex flex-wrap items-center justify-center gap-x-3 text-[13px] font-medium text-zinc-700 sm:text-[13.5px]">
                <a
                  href="https://karthik-bhandarkar.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-800 underline decoration-zinc-300 underline-offset-2 transition-colors hover:text-black hover:decoration-black"
                >
                  karthik-bhandarkar.vercel.app
                </a>
                <span className="text-zinc-400">|</span>
                <a
                  href="https://www.linkedin.com/in/karthik-bhandarkar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#0A66C2] underline decoration-[#0A66C2]/40 underline-offset-2 transition-colors hover:text-[#004182] hover:decoration-[#004182]"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  linkedin.com/in/karthik-bhandarkar
                </a>
                <span className="text-zinc-400">|</span>
                <a
                  href="https://github.com/Karthik-bhandarkar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-800 underline decoration-zinc-300 underline-offset-2 transition-colors hover:text-black hover:decoration-black"
                >
                  github.com/Karthik-bhandarkar
                </a>
              </div>
            </header>

            {/* Document Body */}
            <div className="mt-4 space-y-4">
              {/* Summary */}
              <ResumeSection title="Summary">
                <p className="text-[13px] leading-[1.55] text-zinc-800 sm:text-[13.5px]">
                  {resume.summary}
                </p>
              </ResumeSection>

              {/* Technical Skills */}
              <ResumeSection title="Technical Skills">
                <div className="space-y-1 text-[13px] leading-[1.55] sm:text-[13.5px]">
                  {resume.skills.map((skill) => (
                    <p key={skill.label} className="text-zinc-800">
                      <strong className="font-semibold text-zinc-950">{skill.label}:</strong>{" "}
                      {skill.items}
                    </p>
                  ))}
                </div>
              </ResumeSection>

              {/* Experience */}
              <ResumeSection title="Experience">
                <div className="space-y-3.5">
                  {resume.experience.map((entry) => (
                    <div key={entry.org} className="print:break-inside-avoid">
                      <div className="flex items-baseline justify-between text-[13.5px] sm:text-[14px]">
                        <h3 className="font-bold text-zinc-950">{entry.title}</h3>
                        <span className="shrink-0 text-[12.5px] text-zinc-700 sm:text-[13px]">
                          {entry.period}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between text-[12.5px] italic text-zinc-700 sm:text-[13px]">
                        <span>{entry.org}</span>
                        <span>{entry.subtitle}</span>
                      </div>
                      <ul className="mt-1.5 list-disc space-y-1 pl-4.5 text-[12.5px] leading-[1.5] text-zinc-800 sm:text-[13px]">
                        {entry.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </ResumeSection>

              {/* Projects */}
              <ResumeSection title="Projects">
                <div className="space-y-3.5">
                  {resume.projects.map((project) => (
                    <div key={project.title} className="print:break-inside-avoid">
                      <div className="flex items-baseline justify-between text-[13.5px] sm:text-[14px]">
                        <h3 className="font-bold text-zinc-950">{project.title}</h3>
                        <span className="shrink-0 text-[12.5px] text-zinc-700 sm:text-[13px]">
                          {project.period}
                        </span>
                      </div>
                      <div className="text-[12.5px] italic text-zinc-700 sm:text-[13px]">
                        {project.org}
                      </div>
                      {project.link ? (
                        <div className="mt-0.5">
                          <a
                            href={project.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 text-[12px] text-zinc-700 underline decoration-zinc-300 underline-offset-2 hover:text-black hover:decoration-black sm:text-[12.5px]"
                          >
                            {project.link.label}
                            <ArrowUpRight className="h-3 w-3 print:hidden" aria-hidden="true" />
                          </a>
                        </div>
                      ) : null}
                      <ul className="mt-1 list-disc space-y-1 pl-4.5 text-[12.5px] leading-[1.5] text-zinc-800 sm:text-[13px]">
                        {project.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </ResumeSection>

              {/* Education */}
              <ResumeSection title="Education">
                <div className="space-y-2">
                  {resume.education.map((edu) => (
                    <div key={edu.degree} className="print:break-inside-avoid">
                      <div className="flex items-baseline justify-between text-[13.5px] sm:text-[14px]">
                        <h3 className="font-bold text-zinc-950">{edu.school}</h3>
                        <span className="shrink-0 text-[12.5px] text-zinc-700 sm:text-[13px]">
                          {edu.period}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between text-[12.5px] italic text-zinc-700 sm:text-[13px]">
                        <span>{edu.degree}</span>
                        <span>{edu.result}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ResumeSection>

              {/* Certifications */}
              <ResumeSection title="Certifications">
                <ul className="list-disc space-y-1 pl-4.5 text-[12.5px] leading-[1.5] text-zinc-800 sm:text-[13px]">
                  {resume.credentials.map((cert) => (
                    <li key={cert}>{cert}</li>
                  ))}
                </ul>
              </ResumeSection>
            </div>
          </article>
        </FadeIn>
      </section>
    </main>
  );
}

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): ReactNode {
  return (
    <section className="pt-2">
      <h2 className="text-[12px] font-bold uppercase tracking-[0.08em] text-zinc-900 sm:text-[12.5px]">
        {title}
      </h2>
      <hr className="mt-1 mb-2 border-zinc-900" />
      <div>{children}</div>
    </section>
  );
}
