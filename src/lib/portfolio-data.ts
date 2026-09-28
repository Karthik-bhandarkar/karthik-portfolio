import type { portfolioProjects } from "@/db/schema";

export type PortfolioProject = Pick<
  typeof portfolioProjects.$inferSelect,
  | "id"
  | "iconName"
  | "iconLabel"
  | "title"
  | "description"
  | "meta"
  | "image"
  | "imageAlt"
  | "imageRatio"
  | "story"
  | "techStack"
  | "caseHighlights"
  | "repositoryUrl"
  | "liveUrl"
  | "secondaryUrl"
  | "secondaryLabel"
  | "role"
  | "timeline"
  | "category"
  | "metrics"
  | "featured"
  | "decisions"
  | "learnings"
  | "evidence"
  | "gallery"
  | "sortOrder"
  | "isPublished"
>;

/**
 * Case-study content. Every claim maps to the verified career record or the
 * project's own repository. `learnings` is intentionally empty: only Karthik
 * can say what he learned, so that section appears once he writes it in Studio.
 */
export const initialProjects: PortfolioProject[] = [
  {
    id: "edupulse-ai",
    iconName: "bot",
    iconLabel: "EduPulse AI",
    category: "Internship project",
    role: "Python & AI Intern",
    timeline: "Oct – Dec 2025",
    meta: "Infosys Springboard · Internship 6.0 · Oct – Dec 2025",
    featured: true,
    title: "A LangGraph supervisor that routes student questions to four specialist agents.",
    description:
      "My core deliverable for the Infosys Springboard internship: agent orchestration, semantic retrieval and custom data structures in one Python service, verified by 57 automated tests.",
    story:
      "An educational assistant gets very different questions: a student’s marks, a clause in the institution’s regulations, a study plan that has to fit a credit limit. One prompt handles all of them badly. EduPulse classifies each request, sends it to the agent built for it, and grounds the answer in real data: SQL for student records, semantic search for regulations. It was the assessed project for the Agent Orchestration Framework track of Springboard Internship 6.0, and I built it to be tested and deployable, not just demoable.",
    caseHighlights: [
      "Architected a LangGraph supervisor that routes each turn to one of four specialist agents (Data Retrieval, Knowledge RAG, Analytics, Guardrails), built on a shared BaseAgent abstract class and factory registry.",
      "Engineered an O(1) LRU session cache from a hash map and doubly linked list to hold multi-turn conversation state.",
      "Implemented 0/1 knapsack dynamic programming for credit-constrained study planning and a heap-based priority scheduler with FIFO tie-breaking.",
      "Built semantic search over institutional regulations with all-MiniLM-L6-v2 embeddings and a persisted FAISS IndexFlatIP index.",
      "Exposed /health, /chat, /history and /reset endpoints in FastAPI with strict Pydantic validation.",
      "Designed a three-table SQLite schema (students, subjects, marks) with parameterized JOINs and context-managed transactions.",
      "Wrote 57 pytest cases across 7 modules covering API contracts, agent state transitions and AST security; containerized with a multi-stage Dockerfile and Docker Compose.",
    ],
    decisions: [
      "Route to specialists through a supervisor | Each request type gets an agent with the right tools, and a hard cap of 8 reasoning steps stops routing loops.",
      "Whitelist the AST for maths queries | The assistant can evaluate arithmetic without ever executing arbitrary code.",
      "Write a custom O(1) LRU cache for sessions | Multi-turn state stays in memory with constant-time lookups and bounded size.",
      "Parameterize every query and wrap writes in transactions | Protects against SQL injection and rolls back automatically on failure.",
      "Load the embedding model lazily and persist the FAISS index | The model loads only when needed and the index isn’t rebuilt on every start.",
    ],
    learnings: [],
    metrics: ["57|automated tests", "4|specialist agents", "7|test modules", "O(1)|session cache"],
    evidence: [
      "Source code and README | https://github.com/Karthik-bhandarkar/Multi-Agent-Orchestration",
      "CI pipeline runs (GitHub Actions) | https://github.com/Karthik-bhandarkar/Multi-Agent-Orchestration/actions/workflows/ci.yml",
    ],
    gallery: [],
    techStack: ["Python", "LangGraph", "LangChain", "FastAPI", "Pydantic", "FAISS", "Sentence-Transformers", "SQLite", "Groq", "pytest", "Docker", "GitHub Actions"],
    repositoryUrl: "https://github.com/Karthik-bhandarkar/Multi-Agent-Orchestration",
    liveUrl: "",
    secondaryUrl: "",
    secondaryLabel: "",
    image: "/projects/edupulse-ai.svg",
    imageAlt: "Diagram of the EduPulse AI supervisor routing requests to four specialist agents",
    imageRatio: 1.5,
    sortOrder: 0,
    isPublished: true,
  },
  {
    id: "arogya",
    iconName: "sparkles",
    iconLabel: "Arogya",
    category: "Independent project",
    role: "Sole developer",
    timeline: "Jan – Mar 2026",
    meta: "Independent project · Jan – Mar 2026 · Live",
    featured: true,
    title: "A multi-agent wellness assistant that streams its reasoning in real time.",
    description:
      "Designed, built and deployed on my own: a supervisor and five specialist agents on an async FastAPI backend, streaming to a React 19 client, with Google OAuth 2.0 and JWT sign-in.",
    story:
      "Arogya answers health and wellness questions by routing them through specialist agents: symptoms, diet, fitness, lifestyle and more. Users watch each step stream in as it happens. I built the whole product, including the parts a demo usually skips: sign-in, persistent user context, recovering from unpredictable model output, safe handling of uploaded medical PDFs, and deployment. The API runs on Render with public interactive docs, and the client is a React 19 PWA on Netlify.",
    caseHighlights: [
      "Built an asynchronous FastAPI backend where a supervisor coordinates five specialist agents, streaming each step to the client over Server-Sent Events and WebSockets.",
      "Implemented two sign-in paths: Google OAuth 2.0 (authorization-code flow) and native JWT, with passwords hashed using PBKDF2 SHA-256 via Passlib.",
      "Integrated non-blocking MongoDB Atlas persistence through the Motor async driver for chat histories, health profiles and sessions.",
      "Wrote a two-pass extraction parser (regex plus boundary sanitization) that recovers structured JSON from non-deterministic LLM output.",
      "Parsed uploaded medical-record PDFs with pypdf into validated Pydantic schemas before adding them to agent context.",
      "Built the React 19 and Vite client with Axios interceptors that manage the Bearer-token lifecycle; deployed the API on Render and the client on Netlify.",
    ],
    decisions: [
      "Stream agent steps instead of waiting for a final answer | Multi-agent responses take several model calls, so users see progress immediately over SSE.",
      "Parse model output in two passes | LLM responses are non-deterministic; regex extraction plus boundary sanitization recovers valid JSON when the first attempt fails.",
      "Stay asynchronous end to end | FastAPI with the Motor driver keeps database I/O non-blocking for concurrent chats, profiles and sessions.",
      "Validate uploaded records before they reach a prompt | PDF text goes through Pydantic schemas first, so malformed data never becomes agent context.",
    ],
    learnings: [],
    metrics: ["5|specialist agents", "2|sign-in methods", "Live|on Render + Netlify"],
    evidence: [
      "Live web app | https://digital-wellness-assistant.netlify.app",
      "Interactive API docs (Swagger, Render free tier; may take a moment to wake) | https://agent-backend-t11g.onrender.com/docs",
      "Backend source code | https://github.com/Karthik-bhandarkar/agent-backend",
      "Frontend source code | https://github.com/Karthik-bhandarkar/agent-Frontend",
    ],
    gallery: ["/projects/shots/arogya-live.webp | The live app at digital-wellness-assistant.netlify.app"],
    techStack: ["Python", "FastAPI", "Groq (Llama 3.1 8B)", "MongoDB Atlas", "Motor", "Pydantic", "PyJWT", "Passlib", "Google OAuth 2.0", "SSE", "WebSockets", "React 19", "Vite", "Render", "Netlify"],
    repositoryUrl: "https://github.com/Karthik-bhandarkar/agent-backend",
    liveUrl: "https://digital-wellness-assistant.netlify.app",
    secondaryUrl: "https://github.com/Karthik-bhandarkar/agent-Frontend",
    secondaryLabel: "Frontend code",
    image: "/projects/shots/arogya-dashboard.webp",
    imageAlt: "Screenshot of the Arogya dashboard, from the project's frontend repository",
    imageRatio: 1600 / 792,
    sortOrder: 1,
    isPublished: true,
  },
  {
    id: "intelligent-assistive-vision",
    iconName: "scan-eye",
    iconLabel: "Assistive Vision",
    category: "Applied computer vision",
    role: "Developer",
    timeline: "Sep 2025 – Jan 2026",
    meta: "Computer vision & hardware · Sep 2025 – Jan 2026",
    featured: true,
    title: "A camera-based assistant that spots road hazards and announces them in five languages.",
    description:
      "A YOLOv11-nano detector fine-tuned on 13 hazard classes, fed by a wireless ESP32-CAM, with scene captioning on background threads and spoken multilingual alerts.",
    story:
      "The system helps with pedestrian navigation. It detects hazards such as pedestrian crossings, speed breakers and school zones, describes the wider scene, and speaks alerts aloud in English, Kannada, Hindi, Tamil or Telugu. The hard constraint was latency. Scene captioning is far slower than detection, so it could never be allowed to delay a hazard alert. The project also runs on low-cost hardware: an ESP32-CAM streams video wirelessly, with its own firmware in the repository.",
    caseHighlights: [
      "Fine-tuned YOLOv11-nano on 13 custom road and navigation hazard classes, measuring 3.3 ms GPU inference per frame on an NVIDIA Tesla T4.",
      "Designed a multi-threaded pipeline that runs BLIP scene captioning on background workers so real-time detection is never blocked.",
      "Integrated a wireless ESP32-CAM stream with OpenCV, including 180° frame rotation and per-source confidence thresholds.",
      "Built spoken alerts with deep-translator and gTTS in five languages, with a 5-second debounce against repeated announcements.",
    ],
    decisions: [
      "Run captioning on background threads | BLIP is much slower than detection, so it runs separately and never delays a hazard alert.",
      "Use the nano variant of YOLOv11 | A lightweight model keeps per-frame inference fast enough for real-time use.",
      "Calibrate thresholds per camera | 0.5 confidence for webcam and 0.6 for the ESP32-CAM gave stable detections on each source.",
      "Debounce alerts for 5 seconds | The same hazard stays in view for many frames; without a debounce it would be announced repeatedly.",
    ],
    learnings: [],
    metrics: ["3.3 ms|per frame (Tesla T4)", "13|hazard classes", "5|alert languages"],
    evidence: [
      "Source code and README | https://github.com/Karthik-bhandarkar/Intelligent-Assistive-System",
      "Pipeline diagram in the repository | https://github.com/Karthik-bhandarkar/Intelligent-Assistive-System/blob/main/assets/diagrams/pipeline.svg",
      "ESP32-CAM firmware | https://github.com/Karthik-bhandarkar/Intelligent-Assistive-System/blob/main/firmware/ESP_CAM.ino",
    ],
    gallery: [],
    techStack: ["Python", "YOLOv11-nano", "OpenCV", "BLIP", "Streamlit", "deep-translator", "gTTS", "ESP32-CAM", "NVIDIA Tesla T4"],
    repositoryUrl: "https://github.com/Karthik-bhandarkar/Intelligent-Assistive-System",
    liveUrl: "",
    secondaryUrl: "",
    secondaryLabel: "",
    image: "/projects/assistive-vision.svg",
    imageAlt: "Diagram of a road-scene feed with hazard detections and spoken alerts",
    imageRatio: 1.5,
    sortOrder: 2,
    isPublished: true,
  },
  {
    id: "student-performance-analytics",
    iconName: "line-chart",
    iconLabel: "Student Analytics",
    category: "Internship project",
    role: "Python & Data Analytics Intern",
    timeline: "Jul – Oct 2025",
    meta: "Dyashin Technosoft · Bengaluru · Jul – Oct 2025",
    featured: true,
    title: "An automated analytics pipeline and reporting mart for 6,607 student records.",
    description:
      "Python data preparation, T-SQL reporting in SQL Server and a Tableau dashboard that replaced manual spreadsheet work for institutional review.",
    story:
      "The institution’s student dataset (6,607 records across 20 academic and socio-economic attributes) was being prepared by hand in Excel before any analysis could start. I automated the preparation in Python, modelled the data for reporting in SQL Server, and built the analysis and dashboard used to see which factors were associated with academic risk.",
    caseHighlights: [
      "Automated a Pandas and NumPy pipeline for 6,600+ records across 20 variables: mode imputation, categorical whitespace cleanup and boundary validation.",
      "Engineered features including a 60-point performance threshold and attendance bands to segment cohorts and surface academic-risk factors.",
      "Designed the SQL Server reporting table and wrote T-SQL with GROUP BY, CASE WHEN aggregation and nested CAST conversions.",
      "Ran multivariate analysis in Matplotlib and Seaborn relating study hours, parental education and resource access to exam scores.",
      "Delivered an interactive Tableau dashboard of KPIs, cohort pass/fail distributions and attendance trends.",
    ],
    decisions: [
      "Automate preparation in Python | A repeatable pipeline replaced manual Excel work, so the analysis can be re-run on new data.",
      "Engineer features before analysis | A 60-point threshold and attendance bands turn raw scores into cohorts that can be compared.",
      "Keep reporting in one mart table | Cohort trends come from analytical T-SQL (GROUP BY, CASE WHEN, CAST) over a single Student_Performance table.",
    ],
    learnings: [],
    metrics: ["6,607|student records", "20|attributes analyzed"],
    evidence: ["Source code | https://github.com/Karthik-bhandarkar/Student-Performance-Analysis"],
    gallery: [],
    techStack: ["Python", "Pandas", "NumPy", "SQL Server", "T-SQL", "Matplotlib", "Seaborn", "Tableau"],
    repositoryUrl: "https://github.com/Karthik-bhandarkar/Student-Performance-Analysis",
    liveUrl: "",
    secondaryUrl: "",
    secondaryLabel: "",
    image: "/projects/student-analytics.svg",
    imageAlt: "Diagram of cohort analytics charts across student records",
    imageRatio: 1.5,
    sortOrder: 3,
    isPublished: true,
  },
  {
    id: "attendance-monitoring-publication",
    iconName: "book-open",
    iconLabel: "Research Paper",
    category: "Journal publication",
    role: "Author",
    timeline: "Published Dec 2024",
    meta: "IJSART · Vol. 10, Issue 12 · Dec 2024",
    featured: false,
    title: "AI-Driven Students’ Attendance Monitoring System.",
    description:
      "A paper published in the International Journal for Science and Advance Research in Technology (IJSART), December 2024.",
    story:
      "This paper presents an AI-driven approach to monitoring student attendance. It was published in the International Journal for Science and Advance Research in Technology (IJSART), Volume 10, Issue 12, in December 2024.",
    caseHighlights: [
      "Citation: “AI-Driven Students’ Attendance Monitoring System,” International Journal for Science and Advance Research in Technology (IJSART), Vol. 10, Issue 12, December 2024.",
      "Paper ID IJSARTV10I12102598 · Online ISSN 2395-1052.",
    ],
    decisions: [],
    learnings: [],
    metrics: [],
    evidence: [],
    gallery: [],
    techStack: ["Applied AI", "Academic writing"],
    repositoryUrl: "",
    liveUrl: "",
    secondaryUrl: "",
    secondaryLabel: "",
    image: "/projects/attendance-publication.svg",
    imageAlt: "Cover illustration for the published IJSART research paper",
    imageRatio: 1.5,
    sortOrder: 4,
    isPublished: true,
  },
  {
    id: "machine-learning-algorithms",
    iconName: "compass",
    iconLabel: "CS Foundations",
    category: "Coursework & practice",
    role: "",
    timeline: "Ongoing",
    meta: "Coursework & ongoing practice",
    featured: false,
    title: "Machine-learning coursework and regular problem-solving practice.",
    description:
      "Supervised learning in Scikit-learn from lab coursework, plus ongoing practice on LeetCode and in a public Python interview-prep repository.",
    story:
      "In the Machine Learning & Generative AI lab, I implemented supervised-learning workflows in Scikit-learn. Outside coursework, I practise on LeetCode and keep a public, topic-by-topic Python repository of solved problems. The same fundamentals show up in real code elsewhere on this site, such as the O(1) LRU cache and knapsack planner in EduPulse AI.",
    caseHighlights: [
      "Trained Random Forest and Decision Tree classifiers in Scikit-learn with feature scaling, cross-validation and confusion-matrix evaluation.",
      "Keep a public Python interview-prep repository organized by topic, with solution scripts and docstrings.",
      "Applied data structures and algorithms in a real system: an O(1) LRU cache, 0/1 knapsack planning and heap scheduling in EduPulse AI.",
    ],
    decisions: [],
    learnings: [],
    metrics: [],
    evidence: [
      "Interview-prep repository | https://github.com/Karthik-bhandarkar/sde-interview-prep",
      "LeetCode profile | https://leetcode.com/u/karthik_bhandarkar/",
    ],
    gallery: [],
    techStack: ["Python", "Scikit-learn", "Random Forest", "Decision Trees", "Algorithms", "Git"],
    repositoryUrl: "https://github.com/Karthik-bhandarkar/sde-interview-prep",
    liveUrl: "",
    secondaryUrl: "https://leetcode.com/u/karthik_bhandarkar/",
    secondaryLabel: "LeetCode profile",
    image: "/projects/ml-algorithms.svg",
    imageAlt: "Illustration of a decision tree and algorithm data structures",
    imageRatio: 1.5,
    sortOrder: 5,
    isPublished: true,
  },
];

/** Splits "left | right" strings (metrics, decisions, evidence, gallery) into pairs. */
export function parsePairs(entries: string[]): { left: string; right: string }[] {
  return entries
    .map((entry) => {
      const index = entry.indexOf("|");
      if (index === -1) return null;
      const left = entry.slice(0, index).trim();
      const right = entry.slice(index + 1).trim();
      return left && right ? { left, right } : null;
    })
    .filter((item): item is { left: string; right: string } => item !== null);
}

/** Parses "value|label" metric strings into display pairs. */
export function parseMetrics(metrics: string[]): { value: string; label: string }[] {
  return parsePairs(metrics).map(({ left, right }) => ({ value: left, label: right }));
}
