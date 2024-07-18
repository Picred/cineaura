import { conn } from "./index";

export const showAllUsers = () => {
  const sql = "select * from users;";
  conn.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log(result);
  });
};
