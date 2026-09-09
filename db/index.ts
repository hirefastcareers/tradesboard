import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

function isPlaceholderDatabaseUrl(url: string) {
  return (
    url.includes("user:password@") ||
    url.includes("ep-xxx") ||
    url.includes("placeholder") ||
    url.includes("localhost/placeholder")
  );
}

export function hasDatabase() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return false;
  if (isPlaceholderDatabaseUrl(url)) return false;
  return true;
}

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url || isPlaceholderDatabaseUrl(url)) {
    throw new Error("DATABASE_URL is not set");
  }
  const sql = neon(url);
  return drizzle(sql, { schema });
}

export type Db = ReturnType<typeof getDb>;
