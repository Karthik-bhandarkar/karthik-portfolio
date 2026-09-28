/**
 * Simplified system architecture per project, taken from the career record and
 * each repository's README. Used on case-study pages as evidence of how the
 * system is actually put together.
 */
export type ArchNode = { title: string; detail: string };
export type ArchStage = ArchNode | { group: string; items: ArchNode[] };
export type Architecture = { stages: ArchStage[]; footnote: string };

export const PROJECT_ARCHITECTURE: Record<string, Architecture> = {
  "edupulse-ai": {
    stages: [
      { title: "Client", detail: "Streamlit UI or any REST client" },
      { title: "FastAPI service", detail: "/chat · /history · /reset · /health, Pydantic-validated" },
      { title: "LangGraph supervisor", detail: "Structured routing, max 8 steps, LRU session state" },
      {
        group: "Specialist agents",
        items: [
          { title: "Data Retrieval", detail: "SQLite: students, subjects, marks" },
          { title: "Knowledge RAG", detail: "FAISS over institutional regulations" },
          { title: "Analytics", detail: "Knapsack planner, heap scheduler" },
          { title: "Guardrails", detail: "Safety checks, AST-whitelisted maths" },
        ],
      },
    ],
    footnote: "57 pytest cases across 7 modules, run in GitHub Actions CI · multi-stage Docker build",
  },
  arogya: {
    stages: [
      { title: "React 19 PWA", detail: "Vite on Netlify, Axios Bearer-token interceptors" },
      { title: "Authentication", detail: "Google OAuth 2.0 or JWT, PBKDF2 SHA-256" },
      { title: "FastAPI (async)", detail: "On Render; streams every step over SSE" },
      {
        group: "Supervisor + 5 specialist agents",
        items: [
          { title: "Symptom Analyzer", detail: "Preliminary triage guidance" },
          { title: "Dietary Specialist", detail: "Nutrition strategies" },
          { title: "Fitness & Lifestyle", detail: "Exercise, sleep and habits" },
        ],
      },
      { title: "MongoDB Atlas", detail: "Motor async driver: chats, profiles, sessions" },
    ],
    footnote: "Groq (Llama 3.1 8B) · two-pass JSON recovery · PDF records validated with Pydantic before use",
  },
  "intelligent-assistive-vision": {
    stages: [
      { title: "Camera", detail: "ESP32-CAM over Wi-Fi, or webcam" },
      { title: "OpenCV ingest", detail: "180° rotation, per-source thresholds" },
      {
        group: "Two threads",
        items: [
          { title: "Main: YOLOv11-nano", detail: "13 hazard classes, 3.3 ms/frame on T4" },
          { title: "Worker: BLIP", detail: "Scene captions, never blocks detection" },
        ],
      },
      { title: "Voice alerts", detail: "deep-translator + gTTS, 5 languages, 5 s debounce" },
    ],
    footnote: "Streamlit interface · ESP32-CAM firmware included in the repository",
  },
  "student-performance-analytics": {
    stages: [
      { title: "Raw dataset", detail: "6,607 records × 20 attributes" },
      { title: "Python preparation", detail: "Pandas/NumPy: imputation, cleanup, validation, features" },
      { title: "SQL Server mart", detail: "Student_Performance reporting table" },
      { title: "T-SQL analysis", detail: "GROUP BY, CASE WHEN, nested CAST" },
      { title: "Tableau dashboard", detail: "KPIs, cohort outcomes, attendance trends" },
    ],
    footnote: "Exploratory analysis in Matplotlib and Seaborn alongside the reporting pipeline",
  },
};

export function isGroup(stage: ArchStage): stage is { group: string; items: ArchNode[] } {
  return "group" in stage;
}
