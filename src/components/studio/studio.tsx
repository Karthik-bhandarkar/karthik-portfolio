"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Inbox,
  LoaderCircle,
  LockKeyhole,
  LogOut,
  Plus,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";

import type { PortfolioProject } from "@/lib/portfolio-data";
import { ProfileEditor } from "./profile-editor";

type InboxMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

const fieldClass =
  "focus-ring mt-2 w-full rounded-xl border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/35 hover:border-foreground/20 focus:border-foreground/30";

const emptyProject: PortfolioProject = {
  id: "",
  iconName: "layers",
  iconLabel: "",
  title: "",
  description: "",
  meta: "",
  image: "",
  imageAlt: "",
  imageRatio: 4 / 3,
  story: "",
  techStack: [],
  caseHighlights: [],
  repositoryUrl: "",
  liveUrl: "",
  secondaryUrl: "",
  secondaryLabel: "",
  role: "",
  timeline: "",
  category: "",
  metrics: [],
  featured: false,
  decisions: [],
  learnings: [],
  evidence: [],
  gallery: [],
  sortOrder: 0,
  isPublished: true,
};

async function readError(response: Response): Promise<string> {
  try {
    const json = (await response.json()) as { error?: string };
    return json.error || "Something went wrong. Please try again.";
  } catch {
    return "Something went wrong. Please try again.";
  }
}

export function Studio() {
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [draft, setDraft] = useState<PortfolioProject>(emptyProject);
  const [creating, setCreating] = useState(false);
  const [tab, setTab] = useState<"projects" | "inbox" | "profile">("projects");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function refresh(key: string, selectId?: string) {
    const headers = { Authorization: `Bearer ${key}` };
    const [projectsResponse, messagesResponse] = await Promise.all([
      fetch("/api/projects", { headers, cache: "no-store" }),
      fetch("/api/studio/messages", { headers, cache: "no-store" }),
    ]);
    if (!projectsResponse.ok) throw new Error(await readError(projectsResponse));
    if (!messagesResponse.ok) throw new Error(await readError(messagesResponse));

    const projectData = (await projectsResponse.json()) as {
      projects: PortfolioProject[];
    };
    const messageData = (await messagesResponse.json()) as {
      messages: InboxMessage[];
    };
    setProjects(projectData.projects);
    setMessages(messageData.messages);
    setDraft(
      projectData.projects.find((project) => project.id === selectId) ??
        projectData.projects[0] ??
        emptyProject
    );
    setCreating(projectData.projects.length === 0);
  }

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token.trim()) return;
    setBusy(true);
    setError("");
    try {
      await refresh(token.trim());
      setToken(token.trim());
      setAuthenticated(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  }

  async function saveProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const url = creating ? "/api/projects" : `/api/projects/${draft.id}`;
      const response = await fetch(url, {
        method: creating ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(draft),
      });
      if (!response.ok) throw new Error(await readError(response));
      await refresh(token, draft.id);
      setNotice(creating ? "Project added." : "Changes saved.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save your project.");
    } finally {
      setBusy(false);
    }
  }

  async function deleteProject() {
    if (creating || !window.confirm(`Remove ${draft.iconLabel || draft.id}? This cannot be undone.`)) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch(`/api/projects/${draft.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(await readError(response));
      await refresh(token);
      setNotice("Project removed.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not remove the project.");
    } finally {
      setBusy(false);
    }
  }

  if (!authenticated) {
    return (
      <div className="mx-auto w-full max-w-105 rounded-4xl border border-foreground/8 bg-background p-1.5 shadow-sm">
        <form onSubmit={signIn} className="rounded-[1.6rem] border border-foreground/5 bg-foreground/1.5 p-7 sm:p-9 dark:bg-foreground/3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-foreground/10 bg-background">
            <LockKeyhole className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="mt-6 font-serif text-[1.8rem] font-medium tracking-tight text-foreground">
            A little space to make things yours.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-foreground/60">
            Enter your studio key to edit your work and read messages. The key is set in the server&rsquo;s PORTFOLIO_ADMIN_TOKEN environment variable.
          </p>
          <label className="mt-7 block text-sm font-medium text-foreground">
            Studio key
            <input
              className={fieldClass}
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              autoComplete="off"
              placeholder="Enter your key"
              required
            />
          </label>
          {error && <p role="alert" className="mt-4 text-sm text-foreground/70">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="focus-ring mt-6 inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:opacity-50"
          >
            {busy ? "Checking..." : "Enter studio"}
            {busy ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-5 border-b border-foreground/8 pb-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => { setTab("projects"); setError(""); setNotice(""); }}
            className={`focus-ring cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${tab === "projects" ? "bg-foreground text-background" : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"}`}
          >
            Projects <span className="ml-1 opacity-60">{projects.length}</span>
          </button>
          <button
            type="button"
            onClick={() => { setTab("inbox"); setError(""); setNotice(""); }}
            className={`focus-ring inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${tab === "inbox" ? "bg-foreground text-background" : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"}`}
          >
            <Inbox className="h-4 w-4" aria-hidden="true" /> Inbox
            <span className="opacity-60">{messages.length}</span>
          </button>
          <button
            type="button"
            onClick={() => { setTab("profile"); setError(""); setNotice(""); }}
            className={`focus-ring cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${tab === "profile" ? "bg-foreground text-background" : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"}`}
          >
            Profile
          </button>
        </div>
        <button
          type="button"
          onClick={() => { setAuthenticated(false); setToken(""); setProjects([]); setMessages([]); setNotice(""); }}
          className="focus-ring inline-flex cursor-pointer items-center gap-2 rounded-lg text-sm text-foreground/55 hover:text-foreground"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" /> Sign out
        </button>
      </div>

      {error && <p role="alert" className="mb-6 rounded-xl border border-foreground/10 bg-background p-4 text-sm text-foreground/75">{error}</p>}
      {notice && <p role="status" className="mb-6 rounded-xl border border-foreground/10 bg-background p-4 text-sm text-foreground/75">{notice}</p>}

      {tab === "profile" ? (
        <ProfileEditor token={token} />
      ) : tab === "inbox" ? (
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="rounded-3xl border border-foreground/8 bg-background p-10 text-center text-foreground/55">
              No messages yet. They&rsquo;ll show up here when someone gets in touch.
            </div>
          ) : messages.map((message) => (
            <article key={message.id} className="rounded-3xl border border-foreground/8 bg-background p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-[18px] font-semibold tracking-tight text-foreground">{message.subject}</h3>
                  <p className="mt-1 text-sm text-foreground/55">
                    From {message.name} · {message.email}
                  </p>
                </div>
                <time dateTime={message.createdAt} className="text-xs text-foreground/45">
                  {new Date(message.createdAt).toLocaleString()}
                </time>
              </div>
              <p className="mt-5 whitespace-pre-wrap text-[15px] leading-relaxed text-foreground/75">{message.message}</p>
              <a
                href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject}`)}`}
                className="focus-ring mt-6 inline-flex items-center gap-2 rounded-lg text-sm font-medium text-foreground underline underline-offset-4"
              >
                Reply to {message.name} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside>
            <div className="flex items-center justify-between gap-2 px-2 pb-3">
              <h2 className="text-sm font-semibold text-foreground/60">Your work</h2>
              <button
                type="button"
                onClick={() => {
                  setCreating(true);
                  setDraft({ ...emptyProject, sortOrder: projects.length });
                  setError(""); setNotice("");
                }}
                className="focus-ring inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-foreground/10 bg-background hover:bg-foreground/5"
                aria-label="Add a project"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="space-y-1">
              {projects.map((project) => (
                <button
                  type="button"
                  key={project.id}
                  onClick={() => {
                    setDraft(project); setCreating(false); setError(""); setNotice("");
                  }}
                  className={`focus-ring flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition-colors ${!creating && draft.id === project.id ? "bg-foreground/7 font-medium text-foreground" : "text-foreground/60 hover:bg-foreground/4 hover:text-foreground"}`}
                >
                  <span className="truncate">{project.iconLabel}</span>
                  {!project.isPublished && <span className="ml-2 text-[11px] text-foreground/40">Draft</span>}
                </button>
              ))}
              {creating && <span className="block rounded-xl bg-foreground/7 px-3 py-3 text-sm font-medium text-foreground">New project</span>}
            </div>
          </aside>
          <ProjectEditor
            draft={draft}
            creating={creating}
            busy={busy}
            onChange={setDraft}
            onSubmit={saveProject}
            onDelete={deleteProject}
          />
        </div>
      )}
    </div>
  );
}

function ProjectEditor({
  draft,
  creating,
  busy,
  onChange,
  onSubmit,
  onDelete,
}: {
  draft: PortfolioProject;
  creating: boolean;
  busy: boolean;
  onChange: (project: PortfolioProject) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onDelete: () => void;
}) {
  function update<K extends keyof PortfolioProject>(key: K, value: PortfolioProject[K]) {
    onChange({ ...draft, [key]: value });
  }

  return (
    <form onSubmit={onSubmit} className="rounded-4xl border border-foreground/8 bg-background p-6 sm:p-8">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-foreground/8 pb-5">
        <div>
          <h2 className="font-serif text-[1.8rem] font-medium tracking-tight text-foreground">
            {creating ? "A new project" : draft.iconLabel}
          </h2>
          <p className="mt-1 text-sm text-foreground/50">Changes appear on the site as soon as you save.</p>
        </div>
        {!creating && draft.isPublished && (
          <Link href={`/projects/${draft.id}`} target="_blank" className="focus-ring inline-flex items-center gap-1.5 text-sm text-foreground/60 hover:text-foreground">
            View live <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-foreground">
          Project ID
          <input className={fieldClass} value={draft.id} onChange={(e) => update("id", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))} placeholder="my-project" pattern="[a-z0-9]+(-[a-z0-9]+)*" maxLength={80} disabled={!creating} required />
        </label>
        <label className="text-sm font-medium text-foreground">
          Short name
          <input className={fieldClass} value={draft.iconLabel} onChange={(e) => update("iconLabel", e.target.value)} placeholder="My Project" maxLength={120} required />
        </label>
        <label className="text-sm font-medium text-foreground">
          Icon
          <select className={fieldClass} value={draft.iconName} onChange={(e) => update("iconName", e.target.value)}>
            <option value="sparkles">Sparkles</option>
            <option value="compass">Compass</option>
            <option value="line-chart">Chart</option>
            <option value="wand">Wand</option>
            <option value="layers">Layers</option>
            <option value="bot">Bot</option>
            <option value="scan-eye">Vision</option>
            <option value="book-open">Publication</option>
          </select>
        </label>
        <label className="text-sm font-medium text-foreground">
          Card context line
          <input className={fieldClass} value={draft.meta} onChange={(e) => update("meta", e.target.value)} placeholder="Company · Programme · Oct – Dec 2025" maxLength={160} required />
        </label>
        <label className="text-sm font-medium text-foreground">
          Your role
          <input className={fieldClass} value={draft.role} onChange={(e) => update("role", e.target.value)} placeholder="Python & AI Intern" maxLength={120} />
        </label>
        <label className="text-sm font-medium text-foreground">
          Timeline
          <input className={fieldClass} value={draft.timeline} onChange={(e) => update("timeline", e.target.value)} placeholder="Oct – Dec 2025" maxLength={80} />
        </label>
        <label className="text-sm font-medium text-foreground">
          Project type
          <input className={fieldClass} value={draft.category} onChange={(e) => update("category", e.target.value)} placeholder="Internship project" maxLength={80} />
        </label>
        <label className="sm:col-span-2 text-sm font-medium text-foreground">
          Card headline
          <textarea className={`${fieldClass} min-h-22 resize-y`} value={draft.title} onChange={(e) => update("title", e.target.value)} minLength={5} maxLength={500} required />
        </label>
        <label className="sm:col-span-2 text-sm font-medium text-foreground">
          Short description
          <textarea className={`${fieldClass} min-h-24 resize-y`} value={draft.description} onChange={(e) => update("description", e.target.value)} minLength={10} maxLength={1200} required />
        </label>
        <label className="sm:col-span-2 text-sm font-medium text-foreground">
          Image URL or local path
          <input className={fieldClass} value={draft.image} onChange={(e) => update("image", e.target.value)} placeholder="/projects/my-project.jpg" required />
        </label>
        <label className="sm:col-span-2 text-sm font-medium text-foreground">
          Image description
          <input className={fieldClass} value={draft.imageAlt} onChange={(e) => update("imageAlt", e.target.value)} placeholder="Describe the image for screen readers" maxLength={240} required />
        </label>
        <label className="text-sm font-medium text-foreground">
          Image aspect ratio
          <input className={fieldClass} type="number" min="0.1" max="5" step="0.001" value={draft.imageRatio} onChange={(e) => update("imageRatio", Number(e.target.value))} required />
        </label>
        <label className="text-sm font-medium text-foreground">
          Display order
          <input className={fieldClass} type="number" min="0" max="10000" step="1" value={draft.sortOrder} onChange={(e) => update("sortOrder", Number(e.target.value))} required />
        </label>
        <label className="sm:col-span-2 text-sm font-medium text-foreground">
          Case study story
          <textarea className={`${fieldClass} min-h-40 resize-y`} value={draft.story ?? ""} onChange={(e) => update("story", e.target.value)} placeholder="Tell the story behind the work..." maxLength={6000} />
        </label>
        <label className="text-sm font-medium text-foreground">
          Technology stack (comma-separated)
          <textarea className={`${fieldClass} min-h-24 resize-y`} value={draft.techStack.join(", ")} onChange={(e) => update("techStack", e.target.value.split(",").map((item) => item.trim()).filter(Boolean))} placeholder="Python, FastAPI, Docker" maxLength={1800} />
        </label>
        <label className="text-sm font-medium text-foreground">
          Repository URL
          <input className={fieldClass} type="url" value={draft.repositoryUrl} onChange={(e) => update("repositoryUrl", e.target.value)} placeholder="https://github.com/you/project" />
        </label>
        <label className="text-sm font-medium text-foreground">
          Live project URL
          <input className={fieldClass} type="url" value={draft.liveUrl} onChange={(e) => update("liveUrl", e.target.value)} placeholder="https://your-project.example" />
        </label>
        <label className="text-sm font-medium text-foreground">
          Additional link label
          <input className={fieldClass} value={draft.secondaryLabel} onChange={(e) => update("secondaryLabel", e.target.value)} placeholder="Frontend repository" maxLength={80} />
        </label>
        <label className="text-sm font-medium text-foreground">
          Additional link URL
          <input className={fieldClass} type="url" value={draft.secondaryUrl} onChange={(e) => update("secondaryUrl", e.target.value)} placeholder="https://..." />
        </label>
        <label className="sm:col-span-2 text-sm font-medium text-foreground">
          Key results (one per line, as value | label — e.g. 57 | automated tests)
          <textarea className={`${fieldClass} min-h-28 resize-y`} value={draft.metrics.join(String.fromCharCode(10))} onChange={(e) => update("metrics", e.target.value.split(String.fromCharCode(10)).map((item) => item.trim()).filter(Boolean))} placeholder={"57 | automated tests" + String.fromCharCode(10) + "4 | specialist agents"} maxLength={600} />
        </label>
        <label className="sm:col-span-2 text-sm font-medium text-foreground">
          Case-study highlights (one per line)
          <textarea className={`${fieldClass} min-h-44 resize-y`} value={draft.caseHighlights.join(String.fromCharCode(10))} onChange={(e) => update("caseHighlights", e.target.value.split(String.fromCharCode(10)).map((item) => item.trim()).filter(Boolean))} placeholder="One accurate outcome or implementation detail per line" maxLength={7200} />
        </label>
        {(
          [
            ["decisions", "Key decisions (one per line, as decision | reason)", "Run captioning on background threads | It never delays a hazard alert"],
            ["learnings", "What I learned (one per line — shown only when filled in)", "What changed in how you build after this project"],
            ["evidence", "Evidence links (one per line, as label | https://link)", "Live app | https://…"],
            ["gallery", "Extra screenshots (one per line, as /image-path | caption)", "/projects/shots/example.webp | Caption"],
          ] as const
        ).map(([key, label, placeholder]) => (
          <label key={key} className="sm:col-span-2 text-sm font-medium text-foreground">
            {label}
            <textarea
              className={`${fieldClass} min-h-28 resize-y`}
              value={draft[key].join(String.fromCharCode(10))}
              onChange={(e) => update(key, e.target.value.split(String.fromCharCode(10)).map((item) => item.trim()).filter(Boolean))}
              placeholder={placeholder}
              maxLength={4000}
            />
          </label>
        ))}
        <label className="sm:col-span-2 flex cursor-pointer items-center gap-3 rounded-xl border border-foreground/8 p-4 text-sm font-medium text-foreground">
          <input type="checkbox" checked={draft.featured} onChange={(e) => update("featured", e.target.checked)} className="h-4 w-4 accent-foreground" />
          Featured project (large card; otherwise listed under supporting work)
        </label>
        <label className="sm:col-span-2 flex cursor-pointer items-center gap-3 rounded-xl border border-foreground/8 p-4 text-sm font-medium text-foreground">
          <input type="checkbox" checked={draft.isPublished} onChange={(e) => update("isPublished", e.target.checked)} className="h-4 w-4 accent-foreground" />
          Published on the portfolio
        </label>
      </div>
      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-foreground/8 pt-6">
        {!creating ? (
          <button type="button" onClick={onDelete} disabled={busy} className="focus-ring inline-flex cursor-pointer items-center gap-2 rounded-lg text-sm text-foreground/50 hover:text-foreground disabled:opacity-50">
            <Trash2 className="h-4 w-4" aria-hidden="true" /> Remove project
          </button>
        ) : <span />}
        <button type="submit" disabled={busy} className="focus-ring inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:opacity-50">
          {busy ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
          {creating ? "Add project" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
