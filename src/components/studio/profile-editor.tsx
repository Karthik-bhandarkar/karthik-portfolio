"use client";

import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import type { PortfolioProfile } from "@/lib/profile-store";

const fieldClass =
  "focus-ring mt-2 w-full rounded-xl border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/35 hover:border-foreground/20 focus:border-foreground/30";

export function ProfileEditor({ token }: { token: string }) {
  const [profile, setProfile] = useState<PortfolioProfile | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/studio/profile", {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not load your profile.");
        return response.json() as Promise<{ profile: PortfolioProfile }>;
      })
      .then((result) => { if (active) setProfile(result.profile); })
      .catch((cause: unknown) => {
        if (active) setError(cause instanceof Error ? cause.message : "Could not load your profile.");
      });
    return () => { active = false; };
  }, [token]);

  function update<K extends keyof PortfolioProfile>(key: K, value: PortfolioProfile[K]) {
    setProfile((current) => current ? { ...current, [key]: value } : current);
    setSaved(false);
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile) return;
    setBusy(true);
    setError("");
    setSaved(false);
    try {
      const response = await fetch("/api/studio/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(profile),
      });
      const result = (await response.json()) as { profile?: PortfolioProfile; error?: string };
      if (!response.ok || !result.profile) throw new Error(result.error || "Could not save your profile.");
      setProfile(result.profile);
      setSaved(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save your profile.");
    } finally {
      setBusy(false);
    }
  }

  if (!profile) {
    return (
      <div className="rounded-3xl border border-foreground/8 bg-background p-10 text-center text-sm text-foreground/55">
        {error || "Loading profile..."}
      </div>
    );
  }

  return (
    <form onSubmit={save} className="rounded-4xl border border-foreground/8 bg-background p-6 sm:p-9">
      <div className="mb-8 border-b border-foreground/8 pb-6">
        <h2 className="font-serif text-[1.9rem] font-medium tracking-tight text-foreground">Make it yours</h2>
        <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-foreground/55">
          Your details appear across the hero, about page, and contact card. Replace the monogram artwork with your portrait any time by adding matching image files under public/.
        </p>
      </div>

      <h3 className="mb-5 text-sm font-semibold text-foreground">Your introduction</h3>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-foreground">
          First name
          <input className={fieldClass} value={profile.firstName} onChange={(e) => update("firstName", e.target.value)} maxLength={80} required />
        </label>
        <label className="text-sm font-medium text-foreground">
          Full name
          <input className={fieldClass} value={profile.fullName} onChange={(e) => update("fullName", e.target.value)} maxLength={120} required />
        </label>
        <label className="text-sm font-medium text-foreground">
          Headline, first line
          <input className={fieldClass} value={profile.headlineOne} onChange={(e) => update("headlineOne", e.target.value)} maxLength={120} required />
        </label>
        <label className="text-sm font-medium text-foreground">
          Headline, second line
          <input className={fieldClass} value={profile.headlineTwo} onChange={(e) => update("headlineTwo", e.target.value)} maxLength={120} required />
        </label>
        <label className="text-sm font-medium text-foreground">
          Location
          <input className={fieldClass} value={profile.location} onChange={(e) => update("location", e.target.value)} maxLength={160} required />
        </label>
        <label className="text-sm font-medium text-foreground">
          Work authorization
          <input className={fieldClass} value={profile.workAuthorization} onChange={(e) => update("workAuthorization", e.target.value)} maxLength={100} />
        </label>
        <label className="sm:col-span-2 text-sm font-medium text-foreground">
          Short introduction
          <textarea className={`${fieldClass} min-h-24 resize-y`} value={profile.intro} onChange={(e) => update("intro", e.target.value)} maxLength={500} minLength={10} required />
        </label>
        <label className="sm:col-span-2 text-sm font-medium text-foreground">
          Professional summary (blank line between paragraphs, **bold** for emphasis)
          <textarea className={`${fieldClass} min-h-56 resize-y`} value={profile.aboutIntro} onChange={(e) => update("aboutIntro", e.target.value)} maxLength={2400} minLength={30} required />
        </label>
        <label className="sm:col-span-2 text-sm font-medium text-foreground">
          Roles you&rsquo;re targeting (comma-separated)
          <textarea className={`${fieldClass} min-h-24 resize-y`} value={profile.targetRoles.join(", ")} onChange={(e) => update("targetRoles", e.target.value.split(",").map((item) => item.trim()).filter(Boolean))} placeholder="Software Engineer, Backend Developer, AI Engineer" maxLength={1400} />
        </label>
        <label className="text-sm font-medium text-foreground">
          Photo path (leave empty to show the profile card)
          <input className={fieldClass} value={profile.portraitDefault} onChange={(e) => update("portraitDefault", e.target.value)} placeholder="/karthik.webp" />
        </label>
        <label className="text-sm font-medium text-foreground">
          Hover photo path (optional)
          <input className={fieldClass} value={profile.portraitHover} onChange={(e) => update("portraitHover", e.target.value)} placeholder="/karthik-hover.webp" />
        </label>
      </div>

      <h3 className="mt-10 mb-5 border-t border-foreground/8 pt-9 text-sm font-semibold text-foreground">Contact &amp; links</h3>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-foreground">
          Contact email
          <input className={fieldClass} type="email" value={profile.email} onChange={(e) => update("email", e.target.value)} maxLength={254} required />
        </label>
        <label className="text-sm font-medium text-foreground">
          Phone number
          <input className={fieldClass} type="tel" value={profile.phone} onChange={(e) => update("phone", e.target.value)} maxLength={40} />
        </label>
        <label className="text-sm font-medium text-foreground">
          LinkedIn URL
          <input className={fieldClass} type="url" value={profile.linkedInUrl} onChange={(e) => update("linkedInUrl", e.target.value)} placeholder="https://linkedin.com/in/you" />
        </label>
        <label className="text-sm font-medium text-foreground">
          GitHub URL
          <input className={fieldClass} type="url" value={profile.githubUrl} onChange={(e) => update("githubUrl", e.target.value)} placeholder="https://github.com/you" />
        </label>
        <label className="text-sm font-medium text-foreground">
          LeetCode URL
          <input className={fieldClass} type="url" value={profile.leetcodeUrl} onChange={(e) => update("leetcodeUrl", e.target.value)} placeholder="https://leetcode.com/u/you/" />
        </label>
        <label className="text-sm font-medium text-foreground">
          Footer credit
          <input className={fieldClass} value={profile.footerCredit} onChange={(e) => update("footerCredit", e.target.value)} maxLength={120} />
        </label>
        <label className="sm:col-span-2 text-sm font-medium text-foreground">
          Contact card introduction
          <textarea className={`${fieldClass} min-h-28 resize-y`} value={profile.contactIntro} onChange={(e) => update("contactIntro", e.target.value)} maxLength={600} minLength={10} required />
        </label>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-foreground/8 pt-6">
        <div aria-live="polite" className="text-sm text-foreground/60">
          {error || (saved ? "Your profile has been saved." : "A few thoughtful details make all the difference.")}
        </div>
        <button type="submit" disabled={busy} className="focus-ring inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:opacity-50">
          {busy ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
          {busy ? "Saving..." : "Save profile"}
        </button>
      </div>
    </form>
  );
}
