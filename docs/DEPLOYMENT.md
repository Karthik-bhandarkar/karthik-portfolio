# Production Deployment Runbook

This guide covers deployment procedures, environment configurations, and operational troubleshooting for the portfolio application.

---

## Deployment Strategy Overview

| Target | Best For | Cold Starts | Cost | Maintenance |
| :--- | :--- | :--- | :--- | :--- |
| **Vercel + Neon** *(Recommended)* | Low maintenance, global CDN, auto-scaling | Sub-second | Free tier available | Zero |
| **Docker Compose (VPS)** | Full data control, self-hosted single box | None (Always running) | Fixed ($4–$6/mo) | Moderate |
| **Railway / Render** | Container PaaS with managed PostgreSQL | Minimal | Pay-as-you-go | Low |

---

## 1. Deploying to Vercel (Recommended)

### Step 1: Provision Serverless PostgreSQL

1. Sign up for a free tier at [Neon](https://neon.tech) or [Supabase](https://supabase.com).
2. Create a new database named `portfolio_db`.
3. Copy your PostgreSQL connection string. Ensure `?sslmode=require` is present at the end of the URL:
   ```
   postgresql://<user>:<password>@<ep-name>.neon.tech/portfolio_db?sslmode=require
   ```

### Step 2: Push Schema to the Cloud Database

Before connecting the application, initialize the relational tables:

```bash
# In your local terminal:
$env:DATABASE_URL="your-neon-or-supabase-connection-string"
npm run db:push
npm run db:seed
```

### Step 3: Link Repository to Vercel

1. Push your Git repository to GitHub:
   ```bash
   git remote add origin https://github.com/Karthik-bhandarkar/portfolio.git
   git branch -M main
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your `portfolio` repository.
4. Under **Environment Variables**, configure:

| Variable | Recommended Value | Notes |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgresql://...neon.tech/...?sslmode=require` | Your cloud database URI |
| `PORTFOLIO_ADMIN_TOKEN` | Generated 32+ character hex string | For `/studio` CMS authentication |
| `NEXT_PUBLIC_SITE_URL` | `https://karthikbhandarkar.com` | Your custom domain or Vercel URL |
| `NODE_ENV` | `production` | Enables production optimizations |

5. Click **Deploy**. Vercel will build the application using the configuration in `vercel.json` and deploy it across its global Edge Network.

---

## 2. Deploying via Docker Compose (VPS / Self-Hosted)

For deploying on a Linux server (Ubuntu/Debian on DigitalOcean, Hetzner, AWS EC2):

### Step 1: Server Prerequisites

Install Docker and the Docker Compose plugin:
```bash
sudo apt update && sudo apt install -y docker.io docker-compose-v2
sudo systemctl enable --now docker
```

### Step 2: Clone and Configure

```bash
git clone https://github.com/Karthik-bhandarkar/portfolio.git /var/www/portfolio
cd /var/www/portfolio

# Create production environment file
cat <<EOF > .env
PORTFOLIO_ADMIN_TOKEN=$(openssl rand -hex 24)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
EOF
```

### Step 3: Launch Containers

```bash
docker compose up -d --build
```

### Step 4: Run Initial Database Seed

```bash
docker compose exec web npm run db:seed
```

### Step 5: Verify Service Health

```bash
curl -I http://localhost:3000/api/health
```

Expected response: `HTTP/1.1 200 OK`

---

## 3. Operational Troubleshooting

### Error: `ECONNREFUSED 127.0.0.1:5432`
- **Cause**: The application is trying to connect to a local PostgreSQL instance that is either stopped or unreachable.
- **Resolution**:
  - In local dev: run `docker compose up -d postgres` or start your local service.
  - In cloud/Vercel: ensure `DATABASE_URL` is set in the Vercel Project Settings. (Note: The application will continue serving static fallback data gracefully).

### Error: `self signed certificate in certificate chain`
- **Cause**: SSL connection verification failed against a cloud PostgreSQL provider.
- **Resolution**: Ensure your connection string includes `?sslmode=require`. The connection pool in `src/db/index.ts` automatically applies `{ rejectUnauthorized: false }` for known cloud domains (neon.tech, supabase.com, railway.app, render.com).

### Error: `401 Unauthorized` when submitting changes in `/studio`
- **Cause**: The `PORTFOLIO_ADMIN_TOKEN` header did not match the server environment variable.
- **Resolution**: Check the token set on the server. The token must be at least 16 characters long. Enter the exact same string into the Studio key prompt in your browser.
