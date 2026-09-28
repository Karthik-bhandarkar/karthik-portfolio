"use client";

import {
  ArrowUpRight,
  BarChart3,
  Bot,
  Database,
  ScanEye,
  ServerCog,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useState, type ComponentType, type ReactNode } from "react";
import { FadeIn } from "@/components/ui/motion-primitives";

type Proof = { label: string; href: string };

type Capability = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  tag: string;
  detail: string;
  proof: Proof[];
};

const EDUPULSE: Proof = { label: "EduPulse AI", href: "/projects/edupulse-ai" };
const AROGYA: Proof = { label: "Arogya", href: "/projects/arogya" };
const VISION: Proof = { label: "Assistive Vision", href: "/projects/intelligent-assistive-vision" };
const ANALYTICS: Proof = { label: "Student Analytics", href: "/projects/student-performance-analytics" };

const CAPABILITIES: Capability[] = [
  {
    id: "backend",
    icon: ServerCog,
    label: "Backend APIs",
    tag: "FastAPI · async",
    detail:
      "Asynchronous FastAPI services with strict Pydantic validation, real-time streaming over WebSockets and Server-Sent Events, and Google OAuth 2.0 / JWT authentication.",
    proof: [AROGYA, EDUPULSE],
  },
  {
    id: "agents",
    icon: Bot,
    label: "Agent systems",
    tag: "LangGraph",
    detail:
      "Supervisor-agent orchestration with shared state and a capped execution cycle, built on reusable BaseAgent abstractions and factory registries.",
    proof: [EDUPULSE, AROGYA],
  },
  {
    id: "retrieval",
    icon: Database,
    label: "Retrieval & RAG",
    tag: "FAISS · embeddings",
    detail:
      "Semantic search with all-MiniLM-L6-v2 embeddings and persisted FAISS indexes, plus a two-pass parser that recovers structured JSON from unpredictable LLM output.",
    proof: [EDUPULSE, AROGYA],
  },
  {
    id: "data",
    icon: BarChart3,
    label: "Data & analytics",
    tag: "SQL · Pandas · Tableau",
    detail:
      "Automated data preparation, analytical T-SQL and an interactive Tableau dashboard over a 6,607-record institutional dataset.",
    proof: [ANALYTICS],
  },
  {
    id: "vision",
    icon: ScanEye,
    label: "Computer vision",
    tag: "YOLOv11 · OpenCV",
    detail:
      "A fine-tuned YOLOv11-nano detector with 3.3 ms GPU inference per frame on a Tesla T4, multithreaded captioning and live ESP32-CAM video.",
    proof: [VISION],
  },
  {
    id: "quality",
    icon: ShieldCheck,
    label: "Testing & delivery",
    tag: "pytest · Docker",
    detail:
      "57 pytest cases across 7 modules, multi-stage Docker builds with Docker Compose, and production deployments on Render and Netlify.",
    proof: [EDUPULSE, AROGYA],
  },
];

export function PipelineRail(): ReactNode {
  const [activeId, setActiveId] = useState<string>("agents");
  const active = CAPABILITIES.find((item) => item.id === activeId) ?? CAPABILITIES[0];

  return (
    <section aria-labelledby="capabilities-heading" className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        <FadeIn>
          <div className="relative overflow-hidden rounded-4xl border border-foreground/8 bg-background p-6 shadow-sm sm:p-10">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/8 bg-foreground/2 px-3.5 py-1 text-[11px] font-medium tracking-tight text-foreground/60 dark:bg-foreground/5">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/60" />
                Capabilities
              </span>
              <h2
                id="capabilities-heading"
                className="mt-4 font-serif text-[1.75rem] font-medium leading-[1.1] tracking-tight text-foreground sm:text-[2.25rem]"
              >
                Skills, backed by shipped work
              </h2>
              <p className="mx-auto mt-3 max-w-[50ch] text-[15px] leading-relaxed text-foreground/65 sm:text-[16px]">
                Select a capability to see what I built with it and the project that proves it.
              </p>
            </div>

            {/* Desktop: connected pipeline */}
            <div className="mt-10 hidden items-center justify-between lg:flex">
              {CAPABILITIES.map((item, index) => {
                const Icon = item.icon;
                const isActive = item.id === activeId;
                return (
                  <div key={item.id} className="flex flex-1 items-center">
                    <button
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      className="group flex cursor-pointer flex-col items-center rounded-2xl focus-ring"
                      aria-pressed={isActive}
                    >
                      <div
                        className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 ${
                          isActive
                            ? "border-foreground bg-foreground text-background shadow-md"
                            : "border-foreground/10 bg-background text-foreground/75 hover:border-foreground/30 hover:bg-foreground/3"
                        }`}
                      >
                        <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-105" aria-hidden="true" />
                        {isActive && (
                          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-foreground ring-2 ring-background" />
                        )}
                      </div>
                      <span
                        className={`mt-3 text-[12px] tracking-tight transition-colors ${
                          isActive ? "font-semibold text-foreground" : "font-medium text-foreground/60 group-hover:text-foreground"
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="mt-0.5 font-mono text-[10px] tracking-tight text-foreground/40">{item.tag}</span>
                    </button>

                    {index < CAPABILITIES.length - 1 && (
                      <div className="relative mx-2 h-px flex-1 bg-foreground/12">
                        <span className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/30 bg-background" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile / tablet grid */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:hidden">
              {CAPABILITIES.map((item) => {
                const Icon = item.icon;
                const isActive = item.id === activeId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    aria-pressed={isActive}
                    className={`flex cursor-pointer flex-col items-start rounded-2xl border p-3.5 text-left transition-all focus-ring ${
                      isActive
                        ? "border-foreground bg-foreground/4 shadow-sm"
                        : "border-foreground/8 bg-background hover:border-foreground/20"
                    }`}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-foreground/10 bg-background">
                      <Icon className="h-5 w-5 text-foreground" aria-hidden="true" />
                    </div>
                    <span className="mt-2.5 text-[12px] font-semibold tracking-tight text-foreground">{item.label}</span>
                    <span className="mt-0.5 font-mono text-[10px] tracking-tight text-foreground/50">{item.tag}</span>
                  </button>
                );
              })}
            </div>

            {/* Active capability */}
            <div aria-live="polite" className="mt-8 rounded-2xl border border-foreground/8 bg-foreground/1.5 p-5 dark:bg-foreground/3">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-foreground" />
                <span className="text-[13px] font-semibold tracking-tight text-foreground">
                  {active.label} &mdash; <span className="font-normal text-foreground/70">{active.tag}</span>
                </span>
              </div>
              <p className="mt-2.5 text-[14px] leading-relaxed text-foreground/75">{active.detail}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-foreground/8 pt-4">
                <span className="text-[12px] font-medium tracking-tight text-foreground/45">Proven in</span>
                {active.proof.map((proof) => (
                  <Link
                    key={proof.href}
                    href={proof.href}
                    className="focus-ring group inline-flex items-center gap-1 rounded-sm text-[13px] font-medium tracking-tight text-foreground transition-opacity hover:opacity-70"
                  >
                    {proof.label}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
