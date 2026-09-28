import type { ReactNode } from "react";

type SkillGroup = { title: string; items: string[] };

const GROUPS: SkillGroup[] = [
  {
    title: "Languages",
    items: ["Python", "SQL (T-SQL, SQLite)", "Java · working proficiency", "JavaScript · working proficiency"],
  },
  {
    title: "Backend & APIs",
    items: ["FastAPI", "REST API design", "Pydantic", "asyncio", "WebSockets", "Server-Sent Events"],
  },
  {
    title: "AI, retrieval & vision",
    items: ["LangGraph", "LangChain", "LLM tool calling", "FAISS", "Sentence-Transformers", "RAG", "YOLOv11", "OpenCV", "Scikit-learn"],
  },
  {
    title: "Data & databases",
    items: ["Pandas", "NumPy", "SQL Server", "MongoDB Atlas", "SQLite", "Tableau", "Matplotlib", "Seaborn"],
  },
  {
    title: "Security",
    items: ["Google OAuth 2.0", "JWT", "PBKDF2 password hashing", "Parameterized SQL", "AST-whitelisted parsing"],
  },
  {
    title: "Engineering practice",
    items: ["pytest", "Docker & Docker Compose", "GitHub Actions CI", "Git", "OOP & design patterns", "Data structures & algorithms", "Render & Netlify"],
  },
];

export function Skills(): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-[15px] font-semibold tracking-tight text-foreground">Technical skills</h2>
      <div className="rounded-4xl border border-foreground/5 bg-foreground/2 p-3 dark:bg-foreground/5 sm:p-4">
        <div className="flex flex-col gap-4">
          {GROUPS.map((group) => (
            <section key={group.title}>
              <h3 className="mb-2 text-[12px] font-semibold tracking-[0.015em] text-foreground/55">{group.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-foreground/8 bg-background px-3 py-1.5 text-[13px] tracking-tight text-foreground/80"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
