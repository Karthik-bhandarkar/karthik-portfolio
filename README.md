# Karthik Bhandarkar — Personal Portfolio & Engineering Studio

[![CI Pipeline](https://github.com/Karthik-bhandarkar/karthik-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Karthik-bhandarkar/karthik-portfolio/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.6-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.45.2-C5F74F?logo=drizzle&logoColor=black)](https://orm.drizzle.team/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Production-grade, full-stack portfolio and interactive engineering showcase built with **Next.js 16 (App Router)**, **React 19**, **Drizzle ORM**, and **PostgreSQL**. Featuring a built-in live Studio CMS, rate-limited contact pipeline, zero-downtime static fallbacks, and multi-stage Docker containerization.

---

## Architecture & System Design

```mermaid
graph TD
    User([🌐 Visitors & Recruiters]) -->|HTTPS / Next.js Edge| CDN[Vercel Edge Network / Reverse Proxy]
    Admin([🔐 Studio Admin]) -->|Bearer Token Auth| Studio["/studio (Live CMS)"]
    
    subgraph Frontend ["Next.js 16 App Layer"]
        CDN --> AppRouter["Next.js App Router (React 19)"]
        AppRouter --> ServerComp["Server Components (Zero JS Bundle)"]
        AppRouter --> ClientComp["Client Components (Lenis, Motion, WebGL)"]
    end

    subgraph API ["API & Server Actions"]
        Studio -->|PATCH /api/studio| StudioAPI["/api/studio/* (Profile & Projects)"]
        User -->|POST /api/contact| ContactAPI["/api/contact (Rate-Limited + Honeypot)"]
        CDN -->|GET /api/health| HealthAPI["/api/health (Liveness & DB Probe)"]
    end

    subgraph Data ["Data & Persistence Layer"]
        StudioAPI & ContactAPI & HealthAPI & ServerComp -->|Connection Pool (node-postgres)| Drizzle["Drizzle ORM Client"]
        Drizzle -->|SQL Queries| DB[(PostgreSQL Database)]
        Drizzle -.->|Graceful Fallback on Disconnect| Fallback[Static Verified Seeds]
    end
```

---

## Key Highlights

- **Full-Stack Next.js 16 & React 19**: Leverages React Server Components (RSC), Streaming SSR, and server actions for minimal client JavaScript and optimal Core Web Vitals.
- **Built-in Studio CMS (`/studio`)**: Authenticated inline content management interface. Update project case studies, timelines, metrics, and profile metadata without redeploying code.
- **Timing-Safe Admin Security**: Protected with `node:crypto.timingSafeEqual` constant-time Bearer token verification to prevent timing attack vulnerabilities.
- **Resilient Data Architecture**: Features automatic static fallbacks. If the PostgreSQL database is unreachable, updating, or unprovisioned, the site gracefully serves pre-compiled verified seed data without throwing 500 errors.
- **Bot-Resistant Contact Pipeline**: In-memory rate limiting (max 3 messages/hour/email) combined with bot honeypot detection and Zod schema validation.
- **Automated CI/CD**: Pre-configured GitHub Actions pipeline executing ESLint checks, TypeScript strict compilation, production Next.js build tests, and automated dependency vulnerability audits.
- **Production Containerization**: Multi-stage `Dockerfile` producing a standalone container image under 150MB with unprivileged non-root execution.

---

## Tech Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) | App Router, Server Components, standalone output |
| **UI Runtime** | [React 19](https://react.dev/) | React Server Components, concurrent features |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict type checking (`strict: true`, `noEmit`) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Next-generation engine with modern CSS theme variables |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) | Lightweight, type-safe SQL query builder |
| **Database** | [PostgreSQL 16](https://www.postgresql.org/) | Serverless (Neon/Supabase) or Containerized |
| **Animation** | [Motion](https://motion.dev/) & [Lenis](https://lenis.darkroom.engineering/) | Smooth scroll orchestration and micro-interactions |
| **Validation** | [Zod](https://zod.dev/) | Runtime input schemas and API boundary validation |
| **CI/CD** | [GitHub Actions](https://github.com/features/actions) | Automated linting, typechecking, and build validation |
| **Deployment** | [Vercel](https://vercel.com/) / [Docker](https://www.docker.com/) | Serverless edge deployment or self-hosted container |

---

## Project Structure

```
├── .github/
│   └── workflows/
│       ├── ci.yml            # CI: Lint, Typecheck, Build, Security Audit
│       └── deploy.yml        # CD: Automated Vercel production deployment
├── src/
│   ├── app/
│   │   ├── api/              # API Route Handlers (health, contact, studio, projects)
│   │   ├── about/            # About page with timeline and credentials
│   │   ├── contact/          # Interactive contact form
│   │   ├── projects/         # Case studies & technical writeups
│   │   ├── studio/           # Admin CMS interface
│   │   ├── layout.tsx        # Root layout, theme provider, navigation
│   │   ├── page.tsx          # Homepage
│   │   ├── robots.ts         # Dynamic robots.txt
│   │   └── sitemap.ts        # Dynamic XML sitemap
│   ├── components/           # Modular UI components
│   ├── db/
│   │   ├── index.ts          # Resilient PostgreSQL pool & Drizzle ORM client
│   │   └── schema.ts         # Tables: portfolio_projects, portfolio_profile, contact_messages
│   └── lib/                  # Utilities, auth, validation, and data stores
├── public/                   # Static media, icons, and PDF resume
├── docker-compose.yml        # Multi-container local/VPS deployment with PostgreSQL
├── Dockerfile                # Production multi-stage Docker build
├── drizzle.config.ts         # Drizzle Kit migration & studio configuration
├── next.config.ts            # Next.js production & security headers configuration
└── package.json              # Scripts and project dependencies
```

---

## Getting Started

### Prerequisites

- **Node.js**: `20.x` or `22.x` (LTS recommended)
- **Package Manager**: `npm` (v10+)
- **Database**: PostgreSQL (local instance, Docker, or free cloud instance on [Neon](https://neon.tech) / [Supabase](https://supabase.com))

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/Karthik-bhandarkar/karthik-portfolio.git
cd portfolio
npm install
```

### 2. Configure Environment Variables

Copy the example environment template:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/portfolio_db"
PORTFOLIO_ADMIN_TOKEN="generate-a-strong-token-with-at-least-16-characters"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NODE_ENV="development"
```

> **Tip:** You can generate a secure 32-character admin token with:
> ```bash
> openssl rand -hex 24
> ```

### 3. Initialize the Database

Push the Drizzle schema to your PostgreSQL database:

```bash
npm run db:push
```

To view or manage records in your browser via Drizzle Studio GUI:

```bash
npm run db:studio
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view your portfolio.

---

## Deployment Guide

### Option A: Deploy to Vercel + Neon (Recommended)

This is the standard zero-maintenance serverless setup for Next.js:

1. **Database Setup (Neon / Supabase)**:
   - Create a free project on [Neon](https://neon.tech) or [Supabase](https://supabase.com).
   - Copy your connection string (ensure `?sslmode=require` is appended).
2. **Deploy to Vercel**:
   - Push your repository to GitHub.
   - Import the project into [Vercel](https://vercel.com/new).
   - Under **Environment Variables**, add:
     - `DATABASE_URL`: Your cloud PostgreSQL connection string.
     - `PORTFOLIO_ADMIN_TOKEN`: A secret token (16+ chars) for accessing `/studio`.
     - `NEXT_PUBLIC_SITE_URL`: Your production domain (e.g. `https://karthikbhandarkar.com` or `https://<project>.vercel.app`).
3. **Initialize Database Tables**:
   - Run `npx drizzle-kit push` locally pointing to your cloud `DATABASE_URL`, or run it via a setup script.

### Option B: Deploy with Docker Compose (VPS / Self-Hosted)

For deploying on DigitalOcean, Hetzner, AWS EC2, Railway, or any Linux server:

1. Clone the repository onto your server.
2. Set `PORTFOLIO_ADMIN_TOKEN` in your environment or `.env`.
3. Launch the container stack:
   ```bash
   docker compose up -d --build
   ```
4. Check service status:
   ```bash
   docker compose ps
   curl http://localhost:3000/api/health
   ```

---

## Production Security & Best Practices

- **Strict CSP & Security Headers**: Configured in [next.config.ts](file:///next.config.ts) with `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy`.
- **Timing-Safe Auth Verification**: Studio endpoints prevent timing leaks via Node.js crypto's `timingSafeEqual`.
- **Validation Boundaries**: All public API payloads are validated against strict Zod schemas with payload size caps.
- **Connection Pooling**: PostgreSQL connection pool handles peak traffic gracefully with configurable timeouts.
- **Zero Root Privileges**: The Docker container executes as an isolated unprivileged user (`nextjs:nodejs`).

---

## Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `npm run dev` | `next dev` | Start local Next.js development server |
| `npm run build` | `next build` | Create production-optimized standalone build |
| `npm run start` | `next start` | Start Next.js production server |
| `npm run lint` | `eslint .` | Run ESLint static code analysis |
| `npm run typecheck`| `tsc --noEmit` | Check TypeScript types without emitting files |
| `npm run db:push` | `drizzle-kit push` | Push schema changes directly to PostgreSQL |
| `npm run db:generate`| `drizzle-kit generate`| Generate SQL migration files from schema |
| `npm run db:migrate` | `drizzle-kit migrate` | Execute pending SQL migrations |
| `npm run db:studio` | `drizzle-kit studio` | Launch Drizzle visual database browser GUI |

---

## Health Check & Monitoring

A dedicated liveness probe is available at `/api/health`:

```bash
curl -I https://your-portfolio.com/api/health
```

**Response (HTTP 200 OK):**
```json
{
  "ok": true
}
```

If the database is unreachable, the endpoint responds with HTTP 500, enabling container orchestrators (Kubernetes / Docker) and uptime monitors (Uptime Kuma / BetterStack) to detect degraded states.

---

## Author & Contact

**Karthik Bhandarkar**  
Software Engineer — Bengaluru, Karnataka, India  
- **LinkedIn**: [linkedin.com/in/karthikbhandarkar](https://linkedin.com/in/karthikbhandarkar)
- **GitHub**: [github.com/Karthik-bhandarkar](https://github.com/Karthik-bhandarkar)
- **LeetCode**: [leetcode.com/u/karthik_bhandarkar/](https://leetcode.com/u/karthik_bhandarkar/)
- **Email**: [karthikbhandarkar2004@gmail.com](mailto:karthikbhandarkar2004@gmail.com)

---

## License

This project is licensed under the [MIT License](LICENSE).
