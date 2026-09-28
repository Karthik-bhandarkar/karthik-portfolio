import { ArrowUpRight, Download, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import type { Metadata } from "next";

import { Credentials } from "@/components/about/credentials";
import { Education } from "@/components/about/education";
import { Experience } from "@/components/about/experience";
import { PolaroidStrip } from "@/components/about/polaroid-strip";
import { Skills } from "@/components/about/skills";
import { Stack } from "@/components/about/stack";
import { ContactCard } from "@/components/contact/contact-card";
import { FadeIn } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";
import { getProfile } from "@/lib/profile-store";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "About Karthik Bhandarkar: software engineer in Bengaluru with internships at Infosys Springboard and Dyashin Technosoft, building Python backends, multi-agent AI and data pipelines.",
  path: "/about",
});

/** Renders a paragraph with **bold** segments. */
function RichParagraph({ text }: { text: string }): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <p>
      {parts.map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={index} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        )
      )}
    </p>
  );
}

export default async function AboutPage(): Promise<ReactNode> {
  const profile = await getProfile();
  const paragraphs = profile.aboutIntro
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const profiles = [
    { label: "LinkedIn", href: profile.linkedInUrl },
    { label: "GitHub", href: profile.githubUrl },
    { label: "LeetCode", href: profile.leetcodeUrl },
  ].filter((item) => item.href);

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-312 pt-40 sm:pt-56">
        <PolaroidStrip />
      </section>

      <section className="mx-auto w-full max-w-160 px-6 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-24">
        <FadeIn delay={0.5}>
          <div className="rounded-4xl border border-foreground/5 bg-foreground/1.5 p-8 sm:p-12 dark:bg-foreground/3">
            <h1 className="font-serif text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2rem]">
              Hello! I&rsquo;m <span className="border-b border-foreground/30 pb-0.5">{profile.fullName}</span>.
            </h1>

            <div className="mt-8 space-y-6 text-[17px] leading-[1.7] tracking-tight text-foreground/75 sm:text-[18px]">
              {paragraphs.map((paragraph, index) => (
                <RichParagraph key={index} text={paragraph} />
              ))}
            </div>

            {profile.targetRoles.length > 0 && (
              <div className="mt-9 border-t border-foreground/8 pt-6">
                <h2 className="mb-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-foreground/45">
                  Open to
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {profile.targetRoles.map((role) => (
                    <li
                      key={role}
                      className="rounded-full border border-foreground/8 bg-background px-3.5 py-2 text-[13px] tracking-tight text-foreground/80"
                    >
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-foreground/8 pt-6 text-[13px] text-foreground/55">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {profile.location}
              </span>
              {profile.workAuthorization && <span>Work authorization: {profile.workAuthorization}</span>}
              {profile.phone && (
                <a
                  href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
                  className="focus-ring inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-foreground"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  {profile.phone}
                </a>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/resume"
                className="focus-ring inline-flex h-10 items-center gap-2 rounded-xl bg-foreground px-4 text-[13px] font-medium text-background transition-opacity hover:opacity-85"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                Resume
              </Link>
              {profiles.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex h-10 items-center gap-1.5 rounded-xl border border-foreground/8 bg-background px-4 text-[13px] font-medium text-foreground transition-colors hover:bg-foreground/5"
                >
                  {item.label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-[40rem] px-6 pb-20 sm:px-10 sm:pb-28">
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-10">
            <Experience />
            <Education />
            <Skills />
            <Stack />
            <Credentials />
          </div>
        </FadeIn>
      </section>

      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
