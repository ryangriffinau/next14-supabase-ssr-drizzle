import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";
// using vercel pg instead of pg
// import postgres from "postgres";
// import migrate from "drizzle-orm/postgres-js/migrations";

import * as dotenv from "dotenv";
import * as schema from "./migrations/schema";

dotenv.config({ path: ".env.local" });

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL is not defined");
}

export { schema };

export * from "drizzle-orm";

// if was using postgres instead of vercel pg
// export const client = postgres(process.env.POSTGRES_URL!);
// export const db = drizzle(client, { schema });

export const db = drizzle(sql, { schema });

// every time db gets used, it will trigger a migration
// keeping all schemas up to date
const migrateDb = async () => {
    try {
        console.log("🟡 Migrating client");
        await migrate(db, { migrationsFolder: "./lib/db/migrations" });
        console.log("🟢 Successfully migrated");
    } catch (err) {
        console.error(`🔴 Error migrating client: ${err}`);
    }
};
migrateDb();
