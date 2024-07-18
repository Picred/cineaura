import { conn } from "./index";
import fs from "fs";
import jwt from "jsonwebtoken";
import { UserType } from "../types/UserType";

type KeyPair = {
  private: string;
  public: string;
};

export const getJWTSecret = (): string => {
  return "mySecretKey";
};

// export const generateKeys = () => {
//   const privateKey = fs.readFileSync("./privateKey.pem", "utf-8");
//   const publicKey = fs.readFileSync("./publicKey.pem", "utf-8");
//   return { privateKey, publicKey };
// };

const loadKeys = (): KeyPair => {
  const privateKey = fs.readFileSync("./privateKey.pem", "utf-8");
  const publicKey = fs.readFileSync("./publicKey.pem", "utf-8");
  return { private: privateKey, public: publicKey };
};

export const registerUserDB = (user: UserType) => {
  // Genera KeyPair

  // signToken(user)

  // save user on db

  // return token
  console.log("Da registrare nel db: ", user);
};

export const showAllUsers = () => {
  const sql = "select * from users;";
  conn.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log(result);
  });
};
