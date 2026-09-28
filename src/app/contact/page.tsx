import type { Metadata } from "next";

import { ContactCard } from "@/components/contact/contact-card";
import { ContactForm } from "@/components/contact/contact-form";
import { FadeIn } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";
import { getProfile } from "@/lib/profile-store";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description: "Contact Karthik Bhandarkar about software engineering, backend or AI roles.",
  path: "/contact",
});

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-190 px-6 pt-44 pb-20 sm:px-10 sm:pt-60 sm:pb-28">
        <FadeIn className="mb-12 flex flex-col items-center gap-5 text-center sm:mb-16">
          <h1 className="font-serif text-[2.75rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3.25rem] lg:text-[3.75rem]">
            Get in touch
          </h1>
          <p className="max-w-[40ch] text-[20px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[22px]">
            Hiring for a software engineering, backend or AI role, or want to discuss a project? Send a
            short note and I&rsquo;ll reply by email.
          </p>
        </FadeIn>
        <FadeIn delay={0.12}>
          <ContactForm email={profile.email} />
        </FadeIn>
      </section>
      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
