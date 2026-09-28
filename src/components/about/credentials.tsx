import { Award, BookOpen } from "lucide-react";
import type { ReactNode } from "react";

type Credential = { issuer: string; title: string; detail: string };

const CREDENTIALS: Credential[] = [
  {
    issuer: "Oracle University",
    title: "OCI 2025 Certified Generative AI Professional",
    detail: "Earned 11 Sep 2025 · Valid through Sep 2027 · ID 322016841OCI25GAIOCP",
  },
  {
    issuer: "Oracle University",
    title: "OCI 2025 Certified AI Foundations Associate",
    detail: "Earned 29 Aug 2025 · Valid through Aug 2027 · ID 322016841OCI25AICFA",
  },
  {
    issuer: "Infosys Springboard",
    title: "Internship 6.0 · Agent Orchestration Framework with LangChain",
    detail: "Certificate dated 27 Jan 2026 · Verification via OnWingspan",
  },
  {
    issuer: "Tata Group via Forage",
    title: "Data Visualisation: Empowering Business with Effective Insights",
    detail: "Virtual experience programme · 31 Aug 2025 · Code MfnexYaPzGq57ixhH",
  },
  {
    issuer: "Cisco Networking Academy",
    title: "Python Essentials 1",
    detail: "Completed 18 Oct 2025",
  },
];

export function Credentials(): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-[15px] font-semibold tracking-tight text-foreground">Credentials &amp; publication</h2>
      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 rounded-4xl border p-2 sm:p-4">
        <ul className="flex flex-col gap-2">
          {CREDENTIALS.map((credential) => (
            <li key={credential.title} className="flex items-start gap-4 rounded-3xl border border-foreground/5 bg-background p-3 sm:p-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-foreground/10 text-foreground/60" aria-hidden="true">
                <Award className="h-5 w-5" />
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-foreground/45">{credential.issuer}</p>
                <p className="mt-1 text-[14px] font-semibold leading-snug tracking-tight text-foreground sm:text-[15px]">{credential.title}</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-foreground/50">{credential.detail}</p>
              </div>
            </li>
          ))}
        </ul>
        <article className="mt-2 flex items-start gap-4 rounded-3xl border border-foreground/5 bg-background p-3 sm:p-4">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-foreground/10 text-foreground/60" aria-hidden="true">
            <BookOpen className="h-5 w-5" />
          </span>
          <div className="min-w-0 pt-0.5">
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-foreground/45">Academic publication · IJSART · Dec 2024</p>
            <p className="mt-1 text-[14px] font-semibold leading-snug tracking-tight text-foreground sm:text-[15px]">“AI-Driven Students’ Attendance Monitoring System”</p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-foreground/50">Volume 10, Issue 12 · Paper IJSARTV10I12102598 · Online ISSN 2395-1052</p>
          </div>
        </article>
      </div>
    </div>
  );
}
