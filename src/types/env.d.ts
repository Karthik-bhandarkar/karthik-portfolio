declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly DATABASE_URL?: string;
    readonly PORTFOLIO_ADMIN_TOKEN?: string;
    readonly NEXT_PUBLIC_SITE_URL?: string;
    readonly VERCEL_URL?: string;
    readonly DB_MAX_CONNECTIONS?: string;
  }
}
