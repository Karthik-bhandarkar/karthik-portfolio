import type { ReactNode } from "react";

type Entry = {
  school: string;
  initials: string;
  degree: string;
  period: string;
  result: string;
};

const ENTRIES: Entry[] = [
  {
    school: "East West Institute of Technology",
    initials: "EW",
    degree: "B.E. · Computer Science and Engineering",
    period: "Dec 2023 – May 2026",
    result: "Graduated · CGPA 8.26 / 10",
  },
  {
    school: "DVS Polytechnic",
    initials: "DVS",
    degree: "Diploma · Computer Science & Engineering",
    period: "Dec 2020 – Jun 2023",
    result: "Final score 7.8 / 10 · Shivamogga, Karnataka",
  },
];

const COURSEWORK = [
  "Data Structures & Algorithms",
  "Database Management Systems",
  "Object-Oriented Programming",
  "Operating Systems",
  "Computer Networks",
  "Software Engineering",
  "Machine Learning & Generative AI Lab",
];

export function Education(): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-foreground text-[15px] font-semibold tracking-tight">Education</h2>
      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative rounded-4xl border p-2 sm:p-4">
        <ul className="flex flex-col gap-2">
          {ENTRIES.map((entry) => (
            <li key={entry.school} className="bg-background border-foreground/5 flex items-center gap-4 rounded-3xl border p-3 sm:p-4">
              <span className="border-foreground/10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border text-[13px] font-semibold tracking-tight text-foreground/65" aria-hidden="true">
                {entry.initials}
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="text-[16px] font-semibold tracking-tight text-foreground sm:text-[18px]">{entry.school}</span>
                <span className="mt-0.5 text-[13px] tracking-tight text-foreground/65 sm:text-[14px]">{entry.degree}</span>
                <span className="mt-1 text-[12px] tracking-tight text-foreground/48">{entry.period} <span className="mx-1.5 text-foreground/25">·</span> {entry.result}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-1">
        <h3 className="mb-3 text-[13px] font-semibold tracking-tight text-foreground/70">Relevant coursework</h3>
        <ul className="flex flex-wrap gap-2">
          {COURSEWORK.map((course) => (
            <li key={course} className="rounded-full border border-foreground/8 bg-background px-3.5 py-2 text-[12px] tracking-tight text-foreground/70">{course}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
