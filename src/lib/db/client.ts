import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

// 本番環境用のPGLiteインスタンスを作成
const client = new PGlite(process.env.DATABASE_URL);

// DrizzleORMのインスタンスを作成
export const db = drizzle({ client, schema });

// データベースクライアントのエクスポート（マイグレーション等で使用）
export { client };
