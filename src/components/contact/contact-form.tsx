"use client";

import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";

const inputClass =
  "focus-ring mt-2 w-full rounded-xl border border-foreground/10 bg-background px-4 py-3.5 text-[15px] text-foreground outline-none transition-colors placeholder:text-foreground/35 hover:border-foreground/20 focus:border-foreground/30";

export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const fields = new FormData(form);
    const payload = {
      name: String(fields.get("name") ?? ""),
      email: String(fields.get("email") ?? ""),
      subject: String(fields.get("subject") ?? ""),
      message: String(fields.get("message") ?? ""),
      website: String(fields.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }
      form.reset();
      setStatus("success");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
      <div className="rounded-[1.6rem] border border-foreground/5 bg-foreground/1.5 p-6 sm:p-10 dark:bg-foreground/3">
        {status === "success" ? (
          <div className="flex min-h-90 flex-col items-center justify-center text-center" role="status">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-foreground/10 bg-background">
              <Check className="h-6 w-6 text-foreground" aria-hidden="true" />
            </span>
            <h2 className="mt-6 font-serif text-[2rem] font-medium tracking-tight text-foreground">
              Message sent.
            </h2>
            <p className="mt-3 max-w-90 text-[16px] leading-relaxed text-foreground/60">
              Thanks for reaching out. I&rsquo;ll get back to you as soon as I can.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="focus-ring mt-8 cursor-pointer rounded-xl border border-foreground/10 bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block text-[14px] font-medium text-foreground">
                Your name
                <input
                  className={inputClass}
                  type="text"
                  name="name"
                  placeholder="Your name"
                  autoComplete="name"
                  minLength={2}
                  maxLength={120}
                  required
                />
              </label>
              <label className="block text-[14px] font-medium text-foreground">
                Email address
                <input
                  className={inputClass}
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  maxLength={254}
                  required
                />
              </label>
            </div>
            <label className="block text-[14px] font-medium text-foreground">
              Subject
              <input
                className={inputClass}
                type="text"
                name="subject"
                placeholder="e.g. Backend Engineer role at your company"
                minLength={2}
                maxLength={160}
                required
              />
            </label>
            <label className="block text-[14px] font-medium text-foreground">
              Your message
              <textarea
                className={`${inputClass} min-h-44 resize-y`}
                name="message"
                placeholder="A few details about the role, team or project, and the best way to reach you."
                minLength={10}
                maxLength={5000}
                required
              />
            </label>
            <div className="absolute -left-2500 h-px w-px overflow-hidden" aria-hidden="true">
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            {status === "error" && (
              <p role="alert" className="rounded-xl border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground/75">
                {error}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <p className="text-[13px] text-foreground/50">
                Or email me at{" "}
                <a href={`mailto:${email}`} className="focus-ring rounded-sm underline underline-offset-4 hover:text-foreground">
                  {email}
                </a>
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="focus-ring group inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:cursor-wait disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    Sending <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
