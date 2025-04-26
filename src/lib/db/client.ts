import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import * as schema from "./schema";

// DATABASE_URLからPGLiteインスタンスとDrizzleORMインスタンスを返す関数
export function getDBClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }
  const client = new PGlite(process.env.DATABASE_URL);
  const db = drizzle({ client, schema });
  return { db, client };
}
