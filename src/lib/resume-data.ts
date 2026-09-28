/**
 * Single source for the résumé page (/resume) and the PDF (/resume.pdf).
 * Every line maps directly to Karthik Bhandarkar's verified LaTeX resume.
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

export const latexResumeSource = String.raw`\documentclass[letterpaper,10pt]{article}

% ---------- PACKAGES ----------
\usepackage[T1]{fontenc}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage[usenames,dvipsnames]{color}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{needspace}
\input{glyphtounicode}
\pdfgentounicode=1

% ---------- PAGE SETUP ----------
\pagestyle{fancy}
\fancyhf{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

\addtolength{\oddsidemargin}{-0.45in}
\addtolength{\evensidemargin}{-0.45in}
\addtolength{\textwidth}{0.9in}
\addtolength{\topmargin}{-0.65in}
\addtolength{\textheight}{1.1in}

\urlstyle{same}
\raggedbottom
\raggedright
\setlength{\parindent}{0pt}

% ---------- SECTION FORMAT ----------
\titleformat{\section}
  {\scshape\raggedright\large}
  {}{0em}{}[\color{black}\titlerule]
\titlespacing*{\section}{0pt}{9pt}{4pt}

% ---------- MACROS ----------
\newcommand{\resumeItem}[1]{\item {\small #1}}

% {Title}{Dates}{Organization}{Location}
\newcommand{\resumeSubheading}[4]{%
  \item
  {\small\textbf{#1}\hfill #2\par
  \textit{#3}\hfill\textit{#4}\par}%
}

% {Name}{Tech stack}{Link}{Dates}
\newcommand{\resumeProjectHeading}[4]{%
  \item
  {\small\textbf{#1}\hfill #4\par
  \textit{#2}\par
  #3\par}%
}

\newcommand{\resumeSubHeadingListStart}{%
  \begin{itemize}[leftmargin=0in,label={},itemsep=6pt,
                  topsep=2pt,parsep=0pt,partopsep=0pt]
}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}

\newcommand{\resumeItemListStart}{%
  \begin{itemize}[leftmargin=0.18in,label=\textbullet,
                  itemsep=2pt,topsep=3pt,parsep=0pt,partopsep=0pt]
}
\newcommand{\resumeItemListEnd}{\end{itemize}}

\begin{document}

% ---------- HEADER ----------
\begin{center}
  {\LARGE\textbf{Karthik Bhandarkar}}\\[4pt]
  {\small
    +91 98450 75077\,$|$\,
    \href{mailto:karthikbhandarkar2004@gmail.com}
      {karthikbhandarkar2004@gmail.com}\,$|$\,
    Bengaluru, Karnataka, India
  }\\[3pt]
  {\small
    \href{https://karthik-bhandarkar.vercel.app/}
      {karthik-bhandarkar.vercel.app}\,$|$\,
    \href{https://www.linkedin.com/in/karthik-bhandarkar/}
      {linkedin.com/in/karthik-bhandarkar}\,$|$\,
    \href{https://github.com/Karthik-bhandarkar}
      {github.com/Karthik-bhandarkar}
  }
\end{center}
\vspace{-6pt}

% ---------- SUMMARY ----------
\section{Summary}
{\small
Computer Science and Engineering graduate with internship experience building
Python applications and automated reporting workflows. Developed APIs,
multi-agent systems, SQL-based analysis, and computer vision applications,
with hands-on experience in testing, containerization, and deployment.
}

% ---------- TECHNICAL SKILLS ----------
\section{Technical Skills}
{\small
\textbf{Languages:} Python, SQL (T-SQL, SQLite), Java, JavaScript\\[2pt]
\textbf{Frameworks \& Libraries:} FastAPI, LangGraph, LangChain, Pandas,
NumPy, Scikit-learn, React, OpenCV\\[2pt]
\textbf{Databases:} SQL Server, SQLite, MongoDB Atlas, FAISS\\[2pt]
\textbf{Tools \& Practices:} Git, GitHub, Docker, Docker Compose, pytest,
Tableau, REST APIs, OAuth 2.0, JWT
}

% ---------- EXPERIENCE ----------
\section{Experience}
\resumeSubHeadingListStart

\Needspace{8\baselineskip}
\resumeSubheading
  {Python \& AI Intern}{Oct 2025 -- Dec 2025}
  {Infosys Springboard}{Remote}
\resumeItemListStart
  \resumeItem{Architected a LangGraph educational assistant coordinating four specialist agents for retrieval, analytics, and guardrails using abstract base classes and factory registries.}
  \resumeItem{Built FastAPI endpoints with Pydantic validation, SQLite persistence, and FAISS-based semantic retrieval for institutional documents.}
  \resumeItem{Implemented an O(1) LRU session cache and a heap-based task scheduler; authored 57 passing pytest tests across seven modules.}
  \resumeItem{Containerized the application using a multi-stage Dockerfile and Docker Compose.}
\resumeItemListEnd

\Needspace{7\baselineskip}
\resumeSubheading
  {Python \& Data Analytics Intern}{Jul 2025 -- Oct 2025}
  {Dyashin Technosoft Pvt Ltd}{Bengaluru}
\resumeItemListStart
  \resumeItem{Automated preparation of 6,607 student records across 20 attributes using Python, Pandas, and NumPy.}
  \resumeItem{Wrote T-SQL reporting queries using grouping, conditional aggregation, and casting to analyze student cohorts and performance trends.}
  \resumeItem{Created an interactive Tableau dashboard showing performance indicators, pass/fail distributions, and attendance trends.}
\resumeItemListEnd

\resumeSubHeadingListEnd

% ---------- PROJECTS ----------
\section{Projects}
\resumeSubHeadingListStart

\Needspace{9\baselineskip}
\resumeProjectHeading
  {Arogya --- Multi-Agent Wellness Assistant}
  {FastAPI, MongoDB Atlas, React}
  {\href{https://github.com/Karthik-bhandarkar/agent-backend}
    {github.com/Karthik-bhandarkar/agent-backend}}
  {Jan 2026 -- Mar 2026}
\resumeItemListStart
  \resumeItem{Built an asynchronous FastAPI backend coordinating five domain agents and streaming responses through WebSockets and Server-Sent Events.}
  \resumeItem{Implemented Google OAuth 2.0 and JWT authentication, with PBKDF2 SHA-256 password hashing and asynchronous MongoDB Atlas persistence.}
  \resumeItem{Developed a React interface and deployed the application using Netlify and Render.}
\resumeItemListEnd

\Needspace{8\baselineskip}
\resumeProjectHeading
  {Intelligent Assistive Vision System}
  {Python, YOLOv11-nano, OpenCV, BLIP}
  {\href{https://github.com/Karthik-bhandarkar/Intelligent-Assistive-System}
    {github.com/Karthik-bhandarkar/Intelligent-Assistive-System}}
  {Sep 2025 -- Jan 2026}
\resumeItemListStart
  \resumeItem{Fine-tuned YOLOv11-nano to detect 13 navigation hazard classes, measuring 3.3 ms model inference per frame on an NVIDIA Tesla T4 GPU.}
  \resumeItem{Separated BLIP scene captioning into background threads to keep hazard detection running; integrated ESP32-CAM video and audio alerts in five languages.}
\resumeItemListEnd

\resumeSubHeadingListEnd

% ---------- EDUCATION ----------
\section{Education}
\resumeSubHeadingListStart
\resumeSubheading
  {East West Institute of Technology}{Dec 2023 -- May 2026}
  {B.E. in Computer Science and Engineering, CGPA: 8.26/10}
  {Bengaluru, Karnataka}
\resumeSubHeadingListEnd

% ---------- CERTIFICATIONS ----------
\section{Certifications}
\resumeItemListStart
  \resumeItem{Oracle Cloud Infrastructure 2025 Certified Generative AI Professional --- Oracle University (Sep 2025)}
  \resumeItem{Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate --- Oracle University (Aug 2025)}
\resumeItemListEnd

\end{document}`;

export const resume: ResumeData = {
  name: "Karthik Bhandarkar",
  title: "Software Engineer · Python, Backend & AI Systems",
  location: "Bengaluru, Karnataka, India",
  phone: "+91 98450 75077",
  email: "karthikbhandarkar2004@gmail.com",
  links: [
    { label: "karthik-bhandarkar.vercel.app", href: "https://karthik-bhandarkar.vercel.app/" },
    { label: "linkedin.com/in/karthik-bhandarkar", href: "https://www.linkedin.com/in/karthik-bhandarkar/" },
    { label: "github.com/Karthik-bhandarkar", href: "https://github.com/Karthik-bhandarkar" },
  ],
  summary:
    "Computer Science and Engineering graduate with internship experience building Python applications and automated reporting workflows. Developed APIs, multi-agent systems, SQL-based analysis, and computer vision applications, with hands-on experience in testing, containerization, and deployment.",
  experience: [
    {
      title: "Python & AI Intern",
      org: "Infosys Springboard",
      period: "Oct 2025 – Dec 2025",
      subtitle: "Remote",
      bullets: [
        "Architected a LangGraph educational assistant coordinating four specialist agents for retrieval, analytics, and guardrails using abstract base classes and factory registries.",
        "Built FastAPI endpoints with Pydantic validation, SQLite persistence, and FAISS-based semantic retrieval for institutional documents.",
        "Implemented an O(1) LRU session cache and a heap-based task scheduler; authored 57 passing pytest tests across seven modules.",
        "Containerized the application using a multi-stage Dockerfile and Docker Compose.",
      ],
    },
    {
      title: "Python & Data Analytics Intern",
      org: "Dyashin Technosoft Pvt Ltd",
      period: "Jul 2025 – Oct 2025",
      subtitle: "Bengaluru",
      bullets: [
        "Automated preparation of 6,607 student records across 20 attributes using Python, Pandas, and NumPy.",
        "Wrote T-SQL reporting queries using grouping, conditional aggregation, and casting to analyze student cohorts and performance trends.",
        "Created an interactive Tableau dashboard showing performance indicators, pass/fail distributions, and attendance trends.",
      ],
    },
  ],
  projects: [
    {
      title: "Arogya — Multi-Agent Wellness Assistant",
      org: "FastAPI, MongoDB Atlas, React",
      period: "Jan 2026 – Mar 2026",
      subtitle: "github.com/Karthik-bhandarkar/agent-backend",
      link: {
        label: "github.com/Karthik-bhandarkar/agent-backend",
        href: "https://github.com/Karthik-bhandarkar/agent-backend",
      },
      bullets: [
        "Built an asynchronous FastAPI backend coordinating five domain agents and streaming responses through WebSockets and Server-Sent Events.",
        "Implemented Google OAuth 2.0 and JWT authentication, with PBKDF2 SHA-256 password hashing and asynchronous MongoDB Atlas persistence.",
        "Developed a React interface and deployed the application using Netlify and Render.",
      ],
    },
    {
      title: "Intelligent Assistive Vision System",
      org: "Python, YOLOv11-nano, OpenCV, BLIP",
      period: "Sep 2025 – Jan 2026",
      subtitle: "github.com/Karthik-bhandarkar/Intelligent-Assistive-System",
      link: {
        label: "github.com/Karthik-bhandarkar/Intelligent-Assistive-System",
        href: "https://github.com/Karthik-bhandarkar/Intelligent-Assistive-System",
      },
      bullets: [
        "Fine-tuned YOLOv11-nano to detect 13 navigation hazard classes, measuring 3.3 ms model inference per frame on an NVIDIA Tesla T4 GPU.",
        "Separated BLIP scene captioning into background threads to keep hazard detection running; integrated ESP32-CAM video and audio alerts in five languages.",
      ],
    },
  ],
  skills: [
    { label: "Languages", items: "Python, SQL (T-SQL, SQLite), Java, JavaScript" },
    {
      label: "Frameworks & Libraries",
      items: "FastAPI, LangGraph, LangChain, Pandas, NumPy, Scikit-learn, React, OpenCV",
    },
    { label: "Databases", items: "SQL Server, SQLite, MongoDB Atlas, FAISS" },
    {
      label: "Tools & Practices",
      items: "Git, GitHub, Docker, Docker Compose, pytest, Tableau, REST APIs, OAuth 2.0, JWT",
    },
  ],
  education: [
    {
      degree: "B.E. in Computer Science and Engineering, CGPA: 8.26/10",
      school: "East West Institute of Technology",
      period: "Dec 2023 – May 2026",
      result: "Bengaluru, Karnataka",
    },
  ],
  credentials: [
    "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional — Oracle University (Sep 2025)",
    "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate — Oracle University (Aug 2025)",
  ],
};
