import { PGlite } from "@electric-sql/pglite";
import { sql } from "drizzle-orm";
import { drizzle, PgliteDatabase } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import * as schema from "./schema";

/**
 * In-Memory データベースを作成
 * テストやローカル開発で使用
 */
export function createInMemoryDB() {
  const client = new PGlite();
  const db = drizzle({ client, schema });
  return { client, db };
}

/**
 * In-Memory データベースを初期化
 * マイグレーションの適用とシードデータの投入を行う
 */
export async function initInMemoryDB() {
  const { client, db } = createInMemoryDB();
  await db.execute(sql`CREATE SCHEMA IF NOT EXISTS public`);
  await migrate(db as unknown as PgliteDatabase<typeof schema>, {
    migrationsFolder: "drizzle",
  });
  return { client, db };
}
