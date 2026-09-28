import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

import { Studio } from "@/components/studio/studio";
import { FadeIn } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Studio",
  description: "Private portfolio studio.",
  path: "/studio",
  noIndex: true,
});

export default function StudioPage() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-275 px-6 pt-40 pb-32 sm:px-10 sm:pt-48">
      <FadeIn>
        <Link href="/" className="focus-ring group inline-flex items-center gap-2 rounded-lg text-sm font-medium text-foreground/55 hover:text-foreground">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          Back to portfolio
        </Link>
        <div className="mt-12 mb-12 sm:mt-16 sm:mb-16">
          <h1 className="font-serif text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-[3.75rem]">
            Your studio
          </h1>
          <p className="mt-4 max-w-[45ch] text-[18px] leading-[1.45] tracking-tight text-foreground/60 sm:text-[20px]">
            A quiet place to shape your portfolio and keep up with your conversations.
          </p>
        </div>
        <Studio />
      </FadeIn>
    </main>
  );
}
