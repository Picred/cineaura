import { createPool } from "mysql2";

export const conn = createPool({
  host: "localhost",
  user: "user",
  password: "password",
  database: "test",
  connectionLimit: 10,
});
