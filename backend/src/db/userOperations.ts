import { conn } from "./index";

export const showAllUsers = () => {
  conn.connect((err) => {
    if (err) console.log(err);
    console.log("Connected to MySQL");

    const sql = "select * from users;";
    conn.query(sql, (err, result) => {
      if (err) console.log(err);
      console.log(result);
    });
  });
};
