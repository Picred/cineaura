import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

/**
 * Creates a connection to the SQLite database.
 */
export let conn: Database;

export async function initDB() {
  conn = await open({
    filename: "./src/db/database.sqlite",
    driver: sqlite3.Database,
  });
}
