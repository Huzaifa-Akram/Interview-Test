import { Pool } from "pg";

const globalForDb = globalThis;

export const pool =
  globalForDb.pgPool ??
  new Pool({
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.pgPool = pool;
}

export function query(text, params) {
  return pool.query(text, params);
}
