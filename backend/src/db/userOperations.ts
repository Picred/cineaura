import { conn } from "./index";
import fs from "fs/promises";
import jwt from "jsonwebtoken";
import { UserType } from "../types/UserType";
import { QueryError, QueryResult, ResultSetHeader } from "mysql2";
import { generateKeyPairSync } from "crypto";

type KeyPair = {
  privateKey: string;
  publicKey: string;
};

export type UserCompleteInfo = {
  id: number;
  username: string;
  password: string;
  privateKey: string;
  publicKey: string;
  isAdmin: boolean;
};

export const getJWTSecret = (): string => {
  return "mySecretKey";
};

export const registerUserDB = async (user: UserType) => {
  // TODO: hash password
  let keyPair: KeyPair;

  await generateKeys().then((keys) => (keyPair = keys));
  //TODO: hash keys

  return new Promise<number | string>((resolve, reject) => {
    const sql =
      "insert into users (username, password, privateKey, publicKey, isAdmin) values (?, ?, ?, ?, ?);";
    conn.query<ResultSetHeader>(
      sql,
      [
        user.username,
        user.password,
        keyPair.privateKey,
        keyPair.publicKey,
        true,
      ],
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

    resolve({ privateKey: privateKey, publicKey: publicKey });
  });
};

export const getUserKeysByUsername = async (username: string) => {
  return new Promise<KeyPair>((resolve, reject) => {
    const sql = "SELECT privateKey, publicKey FROM users WHERE username = ?";

    conn.query<any>(sql, [username], (err, results) => {
      if (err) {
        reject("Error: getUserKeysByUsername");
        return;
      }

      if (results.length === 0) {
        reject("User not found");
        return;
      }

      resolve({
        privateKey: JSON.stringify(results[0].privateKey),
        publicKey: JSON.stringify(results[0].publicKey),
      });
    });
  });
};

export const getUserInfoByUsername = async (
  username: string
): Promise<UserCompleteInfo> => {
  return new Promise<UserCompleteInfo>((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE username = ?";

    conn.query<any>(sql, [username], (err, results) => {
      if (err) {
        reject({ msg: "Error: getUserIdByUsername" });
        return;
      }

      if (results.length === 0) {
        reject({ msg: "User not found" });
        return;
      }

      resolve(results[0]);
    });
  });
};
