import { client as productionClient, db as productionDB } from "./client";
import { initInMemoryDB } from "./client-in-memory";

const isTest = process.env.NODE_ENV === "test";
const isDevelopment = process.env.NODE_ENV === "development";

// テスト環境または開発環境の場合はIn-Memoryデータベースを使用
export const { db, client } =
  isTest || isDevelopment ? await initInMemoryDB() : { db: productionDB, client: productionClient };
