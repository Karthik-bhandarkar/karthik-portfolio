import { ArrowDown, ArrowRight } from "lucide-react";
import { Fragment, type ReactNode } from "react";

import { isGroup, type Architecture, type ArchNode } from "@/lib/project-architecture";

function Node({ node }: { node: ArchNode }): ReactNode {
  return (
    <div className="rounded-2xl border border-foreground/8 bg-background px-4 py-3">
      <p className="text-[13.5px] font-semibold tracking-tight text-foreground">{node.title}</p>
      <p className="mt-0.5 text-[12.5px] leading-snug tracking-tight text-foreground/60">{node.detail}</p>
    </div>
  );
}

/** Monochrome request-flow diagram: horizontal on large screens, vertical on small ones. */
export function ArchitectureDiagram({ architecture }: { architecture: Architecture }): ReactNode {
  return (
    <figure className="rounded-4xl border border-foreground/5 bg-foreground/2 p-3 sm:p-4 dark:bg-foreground/5">
      <div className="flex flex-col items-stretch gap-1.5 lg:flex-row lg:items-center lg:gap-2">
        {architecture.stages.map((stage, index) => (
          <Fragment key={isGroup(stage) ? stage.group : stage.title}>
            {index > 0 ? (
              <span aria-hidden="true" className="flex shrink-0 items-center justify-center text-foreground/30">
                <ArrowDown className="h-4 w-4 lg:hidden" />
                <ArrowRight className="hidden h-4 w-4 lg:block" />
              </span>
            ) : null}
            <div className="min-w-0 lg:flex-1">
              {isGroup(stage) ? (
                <div className="rounded-3xl border border-dashed border-foreground/15 p-2">
                  <p className="px-2 pt-1 pb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-foreground/45">
                    {stage.group}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {stage.items.map((item) => (
                      <Node key={item.title} node={item} />
                    ))}
                  </div>
                </div>
              ) : (
                <Node node={stage} />
              )}
            </div>
          </Fragment>
        ))}
      </div>
      <figcaption className="mt-3 px-1 text-[12.5px] leading-relaxed tracking-tight text-foreground/55">
        {architecture.footnote}
      </figcaption>
    </figure>
  );
}
