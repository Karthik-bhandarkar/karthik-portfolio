import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { initialProjects } from "../src/lib/portfolio-data";
import { defaultProfile } from "../src/lib/profile-store";
import { portfolioProjects, portfolioProfile } from "../src/db/schema";

async function main() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("❌ [Seed] Error: DATABASE_URL environment variable is missing.");
    console.error("👉 Please ensure .env or .env.local contains a valid PostgreSQL connection string.");
    process.exit(1);
  }

  console.log("🌱 [Seed] Connecting to PostgreSQL database...");
  const pool = new Pool({
    connectionString: databaseUrl,
    connectionTimeoutMillis: 10000,
    ssl: { rejectUnauthorized: false },
  });

  const db = drizzle(pool);

  try {
    console.log("📦 [Seed] Seeding default profile...");
    await db
      .insert(portfolioProfile)
      .values(defaultProfile)
      .onConflictDoNothing();
    console.log("✅ [Seed] Profile seeded successfully.");

    console.log(`📦 [Seed] Seeding ${initialProjects.length} initial projects...`);
    await db
      .insert(portfolioProjects)
      .values(initialProjects)
      .onConflictDoNothing();
    console.log("✅ [Seed] Projects seeded successfully.");

    console.log("🎉 [Seed] Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ [Seed] Failed to seed database:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error("Fatal error during seeding:", err);
  process.exit(1);
});
