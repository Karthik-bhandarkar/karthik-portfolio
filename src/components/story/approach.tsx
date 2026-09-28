import { ArrowUpRight, FlaskConical, Gauge, ShieldCheck, Waypoints } from "lucide-react";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";

type Principle = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
  proof: { label: string; href: string }[];
};

const PRINCIPLES: Principle[] = [
  {
    icon: ShieldCheck,
    title: "Validate at the edge",
    body: "Every request is checked before it reaches business logic: Pydantic schemas on both FastAPI services, parameterized SQL, and an AST whitelist so EduPulse can evaluate maths without executing code.",
    proof: [
      { label: "EduPulse AI", href: "/projects/edupulse-ai" },
      { label: "Arogya", href: "/projects/arogya" },
    ],
  },
  {
    icon: Waypoints,
    title: "Ground the model",
    body: "An LLM is only as reliable as what it’s given. EduPulse pulls regulations from a FAISS index and marks from SQL; Arogya recovers structured JSON when a model response comes back malformed.",
    proof: [
      { label: "EduPulse AI", href: "/projects/edupulse-ai" },
      { label: "Arogya", href: "/projects/arogya" },
    ],
  },
  {
    icon: FlaskConical,
    title: "Test what can break",
    body: "57 pytest cases cover API contracts, agent state transitions and security paths, run in CI on every push, with a multi-stage Docker build so the service runs the same everywhere.",
    proof: [{ label: "EduPulse AI", href: "/projects/edupulse-ai" }],
  },
  {
    icon: Gauge,
    title: "Keep the fast path fast",
    body: "In the vision system, hazard detection runs at 3.3 ms per frame on a Tesla T4. Slower scene captioning moved to background threads, so an alert never waits for it.",
    proof: [{ label: "Assistive Vision", href: "/projects/intelligent-assistive-vision" }],
  },
];

/** "How I think": four working principles, each linked to where it can be verified. */
export function Approach(): ReactNode {
  return (
    <section aria-labelledby="approach-heading" className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        <FadeIn className="flex flex-col items-center gap-5 pb-10 text-center sm:pb-14">
          <h2
            id="approach-heading"
            className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem]"
          >
            How I build
          </h2>
          <p className="max-w-[40ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
            Four habits that run through my projects. Each one links to where you can check it.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <ul className="grid gap-2 rounded-4xl border border-foreground/5 bg-foreground/2 p-2 sm:p-3 md:grid-cols-2 dark:bg-foreground/5">
            {PRINCIPLES.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <li key={principle.title} className="flex flex-col rounded-3xl border border-foreground/5 bg-background p-5 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-foreground/10 bg-background">
                      <Icon className="h-4.5 w-4.5 text-foreground" aria-hidden="true" />
                    </span>
                    <span aria-hidden="true" className="font-mono text-[11px] text-foreground/35">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[19px] font-medium leading-snug tracking-tight text-foreground sm:text-[20px]">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed tracking-tight text-foreground/65">{principle.body}</p>
                  <p className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-5 text-[13px]">
                    <span className="text-foreground/45">See it in</span>
                    {principle.proof.map((proof) => (
                      <Link
                        key={proof.href}
                        href={proof.href}
                        className="focus-ring group inline-flex items-center gap-1 rounded-sm font-medium tracking-tight text-foreground transition-opacity hover:opacity-70"
                      >
                        {proof.label}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                      </Link>
                    ))}
                  </p>
                </li>
              );
            })}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
