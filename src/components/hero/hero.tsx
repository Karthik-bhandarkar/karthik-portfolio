import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { getProfile, type PortfolioProfile } from "@/lib/profile-store";
import { FadeIn, ScaleUnblur } from "@/components/ui/motion-primitives";
import { DottedPattern } from "@/components/ui/dotted-pattern";
import { HeroCtas } from "./hero-ctas";
import { PortraitMorph } from "./portrait-morph";

/** Only real photos replace the profile card; leave portraitDefault empty until then. */
const PHOTO_FILE = /\.(webp|png|jpe?g|avif)(\?.*)?$/i;

const FACTS = [
  { label: "Education", value: "B.E. Computer Science · 2026" },
  { label: "Experience", value: "Infosys Springboard · Dyashin Technosoft" },
  { label: "Certified", value: "Oracle OCI Generative AI Professional" },
  { label: "Core stack", value: "Python · FastAPI · LangGraph · SQL" },
];

export async function Hero(): Promise<ReactNode> {
  const profile = await getProfile();
  const hasPhoto = PHOTO_FILE.test(profile.portraitDefault);
  const links = [
    { label: "Resume", href: "/resume" },
    { label: "LinkedIn", href: profile.linkedInUrl },
    { label: "GitHub", href: profile.githubUrl },
  ].filter((link) => link.href);

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 pt-44 pb-24 sm:px-10 sm:pt-56 sm:pb-32">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-8">
          <FadeIn className="flex flex-col gap-4">
            <p className="text-[20px] leading-tight tracking-tight font-medium text-foreground">
              Hey
              <span aria-hidden="true" className="mx-0.5">
                👋
              </span>
              , I&rsquo;m {profile.firstName}
            </p>

            <h1 className="text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[2.5rem] lg:text-[3.65rem]">
              <span className="block text-balance">{profile.headlineOne}</span>
              <span className="block text-balance">{profile.headlineTwo}</span>
            </h1>

            <p className="max-w-[34ch] text-[22px] leading-[1.4] tracking-tight text-foreground/65">
              {profile.intro}
            </p>

            <HeroCtas email={profile.email} />

            <ul aria-label="Resume and profiles" className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-2">
              {links.map((link) => {
                const external = link.href.startsWith("http");
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`focus-ring group inline-flex items-center gap-1.5 rounded-sm text-[13px] font-medium tracking-tight transition-colors ${
                        link.label === "LinkedIn"
                          ? "text-[#0A66C2] hover:text-[#004182] dark:text-[#70b5f9] dark:hover:text-[#90c8fa]"
                          : "text-foreground/60 hover:text-foreground"
                      }`}
                    >
                      {link.label === "LinkedIn" && (
                        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                      )}
                      {link.label}
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </FadeIn>

          <ScaleUnblur className="flex justify-stretch md:justify-end">
            <div
              className={`relative w-full md:max-w-105 overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm ${
                hasPhoto ? "aspect-square" : "lg:aspect-square"
              }`}
            >
              {hasPhoto ? (
                <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                  <PortraitMorph
                    srcA={profile.portraitDefault}
                    srcB={profile.portraitHover || profile.portraitDefault}
                    alt={`${profile.fullName} portrait`}
                  />
                </div>
              ) : (
                <ProfileCard profile={profile} />
              )}
            </div>
          </ScaleUnblur>
        </div>
      </div>
    </section>
  );
}

function ProfileCard({ profile }: { profile: PortfolioProfile }): ReactNode {
  const initials = profile.fullName
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const city = profile.location.split(",")[0]?.trim() || profile.location;

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.6rem] border border-foreground/5 bg-foreground/1.5 p-6 sm:p-7 dark:bg-foreground/3">
      <DottedPattern className="pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative flex items-center gap-3.5">
        <span
          aria-hidden="true"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-foreground/10 bg-background font-serif text-[17px] font-medium tracking-tight text-foreground"
        >
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[16px] font-semibold tracking-tight text-foreground">
            {profile.fullName}
          </p>
          <p className="truncate text-[13px] tracking-tight text-foreground/55">
            Software Engineer · {city}
          </p>
        </div>
      </div>

      <p className="relative mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-foreground/10 bg-background px-3 py-1 text-[12px] font-medium tracking-tight text-foreground/75">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-foreground" />
        Open to full-time roles
      </p>

      <dl className="relative mt-6 flex flex-col divide-y divide-foreground/8 lg:mt-auto">
        {FACTS.map((fact) => (
          <div
            key={fact.label}
            className="flex flex-col gap-0.5 py-2.5 first:pt-0 last:pb-0 lg:flex-row lg:items-baseline lg:justify-between lg:gap-4"
          >
            <dt className="shrink-0 text-[11px] font-medium uppercase tracking-[0.08em] text-foreground/45">
              {fact.label}
            </dt>
            <dd className="text-[13.5px] font-medium tracking-tight text-foreground/85 lg:text-right">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
