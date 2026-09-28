import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";

type Milestone = {
  when: string;
  theme: string;
  title: string;
  detail: string;
  href?: string;
};

/** Verified milestones, oldest first. Edit here to update the story. */
const MILESTONES: Milestone[] = [
  {
    when: "2020 – 2023",
    theme: "Foundations",
    title: "Diploma in Computer Science & Engineering",
    detail: "DVS Polytechnic, Shivamogga · 7.8 / 10",
  },
  {
    when: "2023 – 2026",
    theme: "Degree",
    title: "B.E. in Computer Science and Engineering",
    detail: "East West Institute of Technology, Bengaluru · CGPA 8.26 · graduated May 2026",
  },
  {
    when: "Dec 2024",
    theme: "Research",
    title: "Published a paper in IJSART",
    detail: "“AI-Driven Students’ Attendance Monitoring System”",
    href: "/projects/attendance-monitoring-publication",
  },
  {
    when: "Jul – Oct 2025",
    theme: "Data",
    title: "Python & Data Analytics Intern, Dyashin Technosoft",
    detail: "Automated the preparation and reporting for 6,607 student records",
    href: "/projects/student-performance-analytics",
  },
  {
    when: "Aug – Sep 2025",
    theme: "Certification",
    title: "Oracle OCI AI Foundations and Generative AI Professional",
    detail: "Two Oracle Cloud Infrastructure 2025 certifications",
  },
  {
    when: "Sep 2025 – Jan 2026",
    theme: "Hardware",
    title: "Built the assistive vision system",
    detail: "YOLOv11 on an ESP32-CAM feed, with spoken alerts in five languages",
    href: "/projects/intelligent-assistive-vision",
  },
  {
    when: "Oct – Dec 2025",
    theme: "AI systems",
    title: "Python & AI Intern, Infosys Springboard",
    detail: "Built EduPulse AI: a LangGraph supervisor, four agents, 57 tests",
    href: "/projects/edupulse-ai",
  },
  {
    when: "Jan – Mar 2026",
    theme: "Shipping",
    title: "Designed, built and deployed Arogya on my own",
    detail: "A multi-agent product, live on Render and Netlify",
    href: "/projects/arogya",
  },
];

/** Where things stand today and what comes next. */
const NOW = {
  title: "Looking for my first full-time software engineering role",
  detail:
    "On a backend, AI or data team, where I can own features end to end and learn how systems run at scale. Meanwhile, I practise problem-solving on LeetCode and in a public interview-prep repository.",
};

export function Journey(): ReactNode {
  return (
    <section aria-labelledby="journey-heading" className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        <FadeIn className="flex flex-col items-center gap-5 pb-10 text-center sm:pb-14">
          <h2
            id="journey-heading"
            className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem]"
          >
            The journey so far
          </h2>
          <p className="max-w-[40ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
            Diploma to degree, research to internships, internships to shipping my own product.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto max-w-[46rem] rounded-4xl border border-foreground/5 bg-foreground/2 p-2 sm:p-3 dark:bg-foreground/5">
            <ol className="flex flex-col gap-2">
              {MILESTONES.map((milestone) => {
                const content = (
                  <>
                    <span className="flex shrink-0 flex-col sm:w-36">
                      <span className="font-mono text-[11.5px] tabular-nums text-foreground/50">{milestone.when}</span>
                      <span className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.08em] text-foreground/35">
                        {milestone.theme}
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-medium leading-snug tracking-tight text-foreground">
                        {milestone.title}
                      </span>
                      <span className="mt-0.5 block text-[13.5px] leading-snug tracking-tight text-foreground/60">
                        {milestone.detail}
                      </span>
                    </span>
                    {milestone.href ? (
                      <ArrowRight
                        className="mt-1 hidden h-4 w-4 shrink-0 text-foreground/35 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground sm:block"
                        aria-hidden="true"
                      />
                    ) : null}
                  </>
                );
                const rowClass =
                  "flex flex-col gap-2 rounded-3xl border border-foreground/5 bg-background px-4 py-3.5 sm:flex-row sm:items-start sm:gap-5 sm:px-5";
                return (
                  <li key={milestone.title}>
                    {milestone.href ? (
                      <Link href={milestone.href} className={`focus-ring group ${rowClass} transition-colors hover:border-foreground/15`}>
                        {content}
                      </Link>
                    ) : (
                      <div className={rowClass}>{content}</div>
                    )}
                  </li>
                );
              })}

              <li>
                <div className="flex flex-col gap-2 rounded-3xl border border-foreground/15 bg-background px-4 py-4 sm:flex-row sm:items-start sm:gap-5 sm:px-5">
                  <span className="flex shrink-0 items-center gap-2 sm:w-36">
                    <span aria-hidden="true" className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-40 motion-reduce:animate-none" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
                    </span>
                    <span className="font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] text-foreground">
                      Now
                    </span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-semibold leading-snug tracking-tight text-foreground">
                      {NOW.title}
                    </span>
                    <span className="mt-1 block text-[13.5px] leading-relaxed tracking-tight text-foreground/65">
                      {NOW.detail}
                    </span>
                  </span>
                </div>
              </li>
            </ol>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
