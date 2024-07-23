import { createPool } from "mysql2/promise";

export const conn = createPool({
  host: "localhost",
  user: "user",
  password: "password",
  database: "cineaura",
  connectionLimit: 10,
});
