import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, type PoolConfig } from "pg";

const databaseUrl = process.env.DATABASE_URL;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

function createPool(): Pool {
  if (!databaseUrl) {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "⚠️ [Database] DATABASE_URL environment variable is missing. Operating with fallback static data."
      );
    }
    // Dummy connection string so pool initialization does not throw at build/module-load time
    return new Pool({
      connectionString: "postgresql://postgres:postgres@127.0.0.1:5432/app_db",
      connectionTimeoutMillis: 2000,
    });
  }

  const isRemote =
    databaseUrl.includes("neon.tech") ||
    databaseUrl.includes("supabase.co") ||
    databaseUrl.includes("pooler.supabase.com") ||
    databaseUrl.includes("railway.app") ||
    databaseUrl.includes("render.com") ||
    databaseUrl.includes("sslmode=require");

  const poolConfig: PoolConfig = {
    connectionString: databaseUrl,
    max: process.env.DB_MAX_CONNECTIONS ? Number(process.env.DB_MAX_CONNECTIONS) : 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    ...(isRemote
      ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : {}),
  };

  return new Pool(poolConfig);
}

export const pool = globalForDb.__arenaNextJsPostgresqlPool ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = drizzle(pool);
