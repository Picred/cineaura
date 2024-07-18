import { createConnection } from "mysql2";

export const conn = createConnection({
  host: "localhost",
  user: "user",
  password: "password",
  database: "test",
  connectionLimit: 10,
});
