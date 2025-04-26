import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import * as schema from "./schema";

// PGLiteのインスタンスを作成（In-Memory）
const client = new PGlite();

// DrizzleORMのインスタンスを作成
export const db = drizzle({ client, schema });

// データベースクライアントのエクスポート（マイグレーション等で使用）
export { client };
