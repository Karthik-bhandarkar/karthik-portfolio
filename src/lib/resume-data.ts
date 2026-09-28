/**
 * Single source for the résumé page (/resume) and the PDF (/resume.pdf).
 * Every line maps to the verified career record.
 */
export type ResumeLink = { label: string; href: string };

export type ResumeEntry = {
  title: string;
  org: string;
  period: string;
  subtitle: string;
  link?: ResumeLink;
  bullets: string[];
};

export type ResumeData = {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  links: ResumeLink[];
  summary: string;
  experience: ResumeEntry[];
  projects: ResumeEntry[];
  skills: { label: string; items: string }[];
  education: { degree: string; school: string; period: string; result: string }[];
  credentials: string[];
};

export const resume: ResumeData = {
  name: "Karthik Bhandarkar",
  title: "Software Engineer · Python, Backend & AI Systems",
  location: "Bengaluru, India",
  phone: "+91 98450 75077",
  email: "karthikbhandarkar2004@gmail.com",
  links: [
    { label: "linkedin.com/in/karthikbhandarkar", href: "https://linkedin.com/in/karthikbhandarkar" },
    { label: "github.com/Karthik-bhandarkar", href: "https://github.com/Karthik-bhandarkar" },
    { label: "leetcode.com/u/karthik_bhandarkar", href: "https://leetcode.com/u/karthik_bhandarkar/" },
  ],
  summary:
    "Software engineer (B.E. Computer Science, 2026) with internships building a LangGraph multi-agent system at Infosys Springboard and automated data pipelines at Dyashin Technosoft. Works across Python, FastAPI, SQL and LLM tooling, with a focus on validated, well-tested services.",
  experience: [
    {
      title: "Python & AI Intern",
      org: "Infosys Springboard",
      period: "Oct 2025 – Dec 2025",
      subtitle: "Remote · Springboard Internship 6.0 · Project: EduPulse AI",
      bullets: [
        "Architected EduPulse AI, a LangGraph supervisor coordinating 4 specialist agents (retrieval, RAG, analytics, guardrails) through BaseAgent abstract classes and factory registries.",
        "Engineered an O(1) LRU session cache, a 0/1 knapsack study planner and a heap-based scheduler; built FAISS semantic retrieval and Pydantic-validated FastAPI endpoints.",
        "Secured inputs with an AST-whitelisted evaluator and parameterized SQLite transactions; wrote 57 pytest cases across 7 modules and containerized with Docker Compose.",
      ],
    },
    {
      title: "Python & Data Analytics Intern",
      org: "Dyashin Technosoft Pvt Ltd",
      period: "Jul 2025 – Oct 2025",
      subtitle: "Bengaluru · Student Performance Analytics & Reporting Mart",
      bullets: [
        "Automated Pandas/NumPy preparation of 6,607 student records across 20 attributes (imputation, cleanup, validation), replacing manual Excel preparation.",
        "Designed the SQL Server reporting table and wrote analytical T-SQL (GROUP BY, CASE WHEN, nested CAST) to extract cohort and demographic trends.",
        "Delivered multivariate EDA in Matplotlib and Seaborn and an interactive Tableau KPI dashboard for institutional review.",
      ],
    },
  ],
  projects: [
    {
      title: "Arogya",
      org: "Multi-Agent Wellness Assistant",
      period: "Jan 2026 – Mar 2026",
      subtitle: "Independent project · Live",
      link: { label: "digital-wellness-assistant.netlify.app", href: "https://digital-wellness-assistant.netlify.app" },
      bullets: [
        "Async FastAPI backend coordinating 5 domain agents with token streaming over WebSockets and SSE; MongoDB Atlas persistence via Motor; deployed on Render and Netlify.",
        "Google OAuth 2.0 and native JWT authentication with PBKDF2 SHA-256 hashing; a two-pass parser that recovers structured JSON from LLM output; React 19 client.",
      ],
    },
    {
      title: "Intelligent Assistive Vision System",
      org: "Applied Computer Vision",
      period: "Sep 2025 – Jan 2026",
      subtitle: "Python · YOLOv11 · OpenCV · BLIP · ESP32-CAM",
      link: {
        label: "github.com/Karthik-bhandarkar/Intelligent-Assistive-System",
        href: "https://github.com/Karthik-bhandarkar/Intelligent-Assistive-System",
      },
      bullets: [
        "Fine-tuned YOLOv11-nano on 13 hazard classes (3.3 ms GPU inference per frame on a Tesla T4) with multithreaded BLIP captioning, ESP32-CAM streaming and spoken alerts in 5 languages.",
      ],
    },
  ],
  skills: [
    { label: "Languages", items: "Python, SQL (T-SQL, SQLite), Java, JavaScript" },
    { label: "Backend", items: "FastAPI, Pydantic, asyncio, REST, WebSockets, SSE, OAuth 2.0, JWT, MongoDB, SQL Server" },
    { label: "AI & data", items: "LangGraph, LangChain, FAISS, Sentence-Transformers, Scikit-learn, YOLOv11, OpenCV, Pandas, Tableau" },
    { label: "Tools", items: "pytest, Docker, Docker Compose, GitHub Actions, Git, Render, Netlify" },
  ],
  education: [
    {
      degree: "B.E., Computer Science and Engineering",
      school: "East West Institute of Technology, Bengaluru",
      period: "Dec 2023 – May 2026",
      result: "CGPA 8.26 / 10",
    },
    {
      degree: "Diploma, Computer Science & Engineering",
      school: "DVS Polytechnic, Shivamogga",
      period: "Dec 2020 – Jun 2023",
      result: "7.8 / 10",
    },
  ],
  credentials: [
    "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional (Sep 2025) and Certified AI Foundations Associate (Aug 2025).",
    "Infosys Springboard Internship 6.0 certificate, Agent Orchestration Framework with LangChain (Jan 2026).",
    "Tata Group Data Visualisation virtual experience via Forage (Aug 2025) · Cisco Python Essentials 1 (Oct 2025).",
    "Publication: “AI-Driven Students’ Attendance Monitoring System,” IJSART, Vol. 10, Issue 12, Dec 2024.",
  ],
};
