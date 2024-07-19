import { conn } from "./index";
import fs from "fs/promises";
import jwt from "jsonwebtoken";
import { UserType } from "../types/UserType";
import { QueryError, QueryResult, ResultSetHeader } from "mysql2";
import { generateKeyPairSync } from "crypto";

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

export const registerUserDB = (user: UserType) => {
  // save user on db
  // TODO: hash password
  return new Promise<number | string>((resolve, reject) => {
    const sql = "insert into users (username, password) values (?, ?);";
    conn.query<ResultSetHeader>(
      sql,
      [user.username, user.password],
      (err, result) => {
        if (err) reject("Error: registerUserDB");
        resolve(result.affectedRows);
      }
    );
  });
};

export const generateKeys = (): Promise<KeyPair> => {
  return new Promise((resolve, reject) => {
    const { privateKey, publicKey } = generateKeyPairSync("rsa", {
      modulusLength: 1024,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });

    fs.writeFile("data/privateKey.pem", privateKey);

    fs.writeFile("data/publicKey.pem", publicKey);

    resolve({ private: privateKey, public: publicKey });
  });
};

const loadKeys = async (): Promise<KeyPair> => {
  const [privateKeyBuffer, publicKey] = await Promise.all([
    fs.readFile("data/privateKey.pem", "utf-8"),
    fs.readFile("data/publicKey.pem", "utf-8"),
  ]);
  const privateKey = privateKeyBuffer.toString();
  return { private: privateKey, public: publicKey };
};
