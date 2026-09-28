import { ArrowRight, ArrowUpRight, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type Entry = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string;
  caseStudy: string;
  repository: string;
};

const ENTRIES: Entry[] = [
  {
    company: "Infosys Springboard",
    role: "Python & AI Intern",
    period: "Oct 2025 – Dec 2025",
    location: "Remote · Internship 6.0 · Agent Orchestration Framework with LangChain",
    summary:
      "Built EduPulse AI, a multi-agent educational assistant, as the core project deliverable of the internship.",
    highlights: [
      "Architected a LangGraph supervisor coordinating four specialist agents (Data Retrieval, Knowledge RAG, Analytics, Guardrails) through BaseAgent abstract classes and factory registries.",
      "Engineered an O(1) LRU session cache for multi-turn state, 0/1 knapsack study planning and a heap-based priority scheduler with FIFO tie-breaking.",
      "Built FAISS semantic retrieval and FastAPI endpoints with strict Pydantic validation, plus an AST-whitelisted evaluator that prevents code execution.",
      "Wrote 57 pytest cases across 7 modules and containerized the service with a multi-stage Dockerfile and Docker Compose.",
    ],
    stack: "Python · LangGraph · FastAPI · FAISS · SQLite · pytest · Docker",
    caseStudy: "/projects/edupulse-ai",
    repository: "https://github.com/Karthik-bhandarkar/Multi-Agent-Orchestration",
  },
  {
    company: "Dyashin Technosoft Pvt Ltd",
    role: "Python & Data Analytics Intern",
    period: "Jul 2025 – Oct 2025",
    location: "Bengaluru, Karnataka",
    summary:
      "Delivered a student-performance analytics pipeline and institutional reporting mart for 6,607 records across 20 attributes.",
    highlights: [
      "Automated data preparation in Pandas and NumPy (mode imputation, categorical cleanup, boundary validation), replacing manual Excel preparation.",
      "Designed the SQL Server reporting table and wrote analytical T-SQL with GROUP BY, CASE WHEN and nested CAST aggregations for cohort trends.",
      "Built an interactive Tableau dashboard of KPIs, pass/fail distributions and attendance impact for institutional review.",
    ],
    stack: "Python · Pandas · NumPy · SQL Server · T-SQL · Tableau",
    caseStudy: "/projects/student-performance-analytics",
    repository: "https://github.com/Karthik-bhandarkar/Student-Performance-Analysis",
  },
];

export function Experience(): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-foreground text-[15px] font-semibold tracking-tight">Experience</h2>
      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 flex flex-col gap-2 rounded-4xl border p-2 sm:p-4">
        {ENTRIES.map((entry, index) => (
          <details
            key={entry.company}
            open={index === 0}
            className="group rounded-3xl border border-foreground/5 bg-background"
          >
            <summary className="flex cursor-pointer list-none items-center gap-4 rounded-3xl p-3 marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
              <span
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-foreground/10 bg-foreground/3 text-foreground/65 dark:bg-foreground/7"
                aria-hidden="true"
              >
                <BriefcaseBusiness className="h-5 w-5" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-[16px] font-semibold tracking-tight text-foreground sm:text-[18px]">{entry.role}</span>
                <span className="mt-0.5 text-[13px] tracking-tight text-foreground/60 sm:text-[14px]">
                  {entry.company}
                  <span className="mx-2 text-foreground/30">•</span>
                  {entry.period}
                </span>
              </span>
              <span
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-foreground/45 transition-transform group-open:rotate-180"
                aria-hidden="true"
              >
                ⌄
              </span>
            </summary>
            <div className="mx-4 border-t border-foreground/8 pt-4 pb-5 sm:mr-5 sm:ml-[4.75rem]">
              <p className="text-[14px] leading-relaxed text-foreground/75">{entry.summary}</p>
              <p className="mt-1.5 text-[12px] text-foreground/45">{entry.location}</p>
              <ul className="mt-4 space-y-3">
                {entry.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-[13px] leading-[1.65] text-foreground/70 sm:text-[14px]">
                    <span aria-hidden="true" className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-[11px] tracking-tight text-foreground/45">{entry.stack}</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                <Link
                  href={entry.caseStudy}
                  className="focus-ring group/link inline-flex items-center gap-1.5 rounded-sm text-[13px] font-medium text-foreground"
                >
                  Read the case study
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" aria-hidden="true" />
                </Link>
                <a
                  href={entry.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center gap-1 rounded-sm text-[13px] font-medium text-foreground/55 transition-colors hover:text-foreground"
                >
                  Source code
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
