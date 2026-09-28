import { FileText, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { getProfile } from "@/lib/profile-store";
import { ContactCardCtas } from "./contact-card-ctas";
import { FadeIn } from "@/components/ui/motion-primitives";
import { ShaderFlow } from "../shaders/shader-flow";

const CARD_FADE_MASK =
  "radial-gradient(ellipse 90% 110% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.15) 100%)";

export async function ContactCard(): Promise<ReactNode> {
  const profile = await getProfile();

  return (
    <section className="mx-auto my-12 w-full max-w-275 px-6 sm:my-20 sm:px-10">
      <FadeIn>
        <div className="relative w-full overflow-hidden rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
          <div className="relative w-full overflow-hidden rounded-[1.6rem]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-45 dark:opacity-25"
              style={{ WebkitMaskImage: CARD_FADE_MASK, maskImage: CARD_FADE_MASK }}
            >
              <ShaderFlow scale={3} brightness={3} />
            </div>

            <div className="relative grid gap-8 p-6 sm:gap-10 sm:p-7 md:grid-cols-[1.2fr_1fr] md:items-stretch md:gap-6 md:p-6">
              <div className="flex flex-col gap-5">
                <h2 className="font-serif text-[2.25rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-[2.75rem] lg:text-[3.25rem]">
                  Let&rsquo;s connect
                </h2>
                <p className="mb-6 max-w-[29ch] text-[18px] leading-[1.4] tracking-tight text-foreground/65 sm:text-[22px]">
                  {profile.contactIntro}
                </p>
                <ContactCardCtas email={profile.email} />
              </div>

              <div className="border-foreground/8 flex flex-col items-center justify-center gap-5 rounded-[1.1rem] border bg-background p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-center gap-3 opacity-80">
                  <SocialIcon href="/contact" label="Send a message" lucideIcon={Mail} />
                  <SocialIcon href="/resume" label="Resume" lucideIcon={FileText} />
                  {profile.linkedInUrl && <SocialIcon href={profile.linkedInUrl} label="LinkedIn" imageSrc="/linkedin.svg" />}
                  {profile.githubUrl && <SocialIcon href={profile.githubUrl} label="GitHub" imageSrc="/github.svg" />}
                  {profile.leetcodeUrl && <SocialIcon href={profile.leetcodeUrl} label="LeetCode" imageSrc="/leetcode.svg" />}
                </div>
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <a
                    href={`mailto:${profile.email}`}
                    className="focus-ring rounded-sm text-[13px] tracking-tight text-foreground/75 transition-colors hover:text-foreground"
                  >
                    {profile.email}
                  </a>
                  <p className="text-[12px] tracking-tight text-foreground/55">
                    {profile.location}
                    {profile.phone ? (
                      <>
                        {" · "}
                        <a
                          href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
                          className="focus-ring rounded-sm transition-colors hover:text-foreground"
                        >
                          {profile.phone}
                        </a>
                      </>
                    ) : null}
                  </p>
                  <p className="mt-2 text-[12px] tracking-tight text-foreground/45">
                    &copy; 2026 {profile.fullName}
                  </p>
                  <p className="text-[12px] tracking-tight text-foreground/40">{profile.footerCredit}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  lucideIcon: LucideIcon,
  imageSrc,
}: {
  href: string;
  label: string;
  lucideIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  imageSrc?: string;
}): ReactNode {
  const isExternal = href.startsWith("http");
  const props = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className="border-foreground/8 hover:border-foreground/15 focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-background text-foreground/70 transition-colors hover:text-foreground"
      {...props}
    >
      {LucideIcon ? (
        <LucideIcon className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
      ) : imageSrc ? (
        <Image src={imageSrc} alt="" width={16} height={16} aria-hidden="true" className="h-4 w-4 object-contain dark:invert" />
      ) : null}
    </Link>
  );
}
