import { createPool } from "mysql2/promise";

/**
 * Creates a connection pool to the MySQL database.
 */
export const conn = createPool({
  host: "localhost",
  user: "user",
  password: "password",
  database: "cineaura",
  connectionLimit: 10,
});
