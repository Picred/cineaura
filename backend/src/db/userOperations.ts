import { conn } from "./index";
import fs from "fs/promises";
import jwt, { SignOptions } from "jsonwebtoken";
import { UserType } from "../types/UserType";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { generateKeyPairSync } from "crypto";

type KeyPair = {
  privateKey: string;
  publicKey: string;
};

export type UserCompleteInfo = {
  id: number;
  username: string;
  password: string;
  isAdmin?: boolean;
};

export const tokenOptions: SignOptions = {
  expiresIn: "2h",
  algorithm: "RS256",
};

export function registerUserDB(user: UserType) {
  const sql =
    "insert into users (username, password, isAdmin) values (?, ?, ?);";

  conn.execute(sql, [user.username, user.password, true]);
}

export const generateKeys = (): Promise<KeyPair> => {
  return new Promise((resolve, reject) => {
    const { privateKey, publicKey } = generateKeyPairSync("rsa", {
      modulusLength: 2048,
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

export async function loadKeys(): Promise<KeyPair> {
  const privateKey = await fs.readFile("data/privateKey.pem", "utf-8");
  const publicKey = await fs.readFile("data/publicKey.pem", "utf-8");

  return { privateKey: privateKey, publicKey: publicKey };
}

export async function getUserInfoByUsername(
  username: string
): Promise<UserType | null> {
  const sql = "SELECT * FROM users WHERE username = ?";
  try {
    const [results] = await conn.query<UserType[] & RowDataPacket[]>(sql, [
      username,
    ]);

    if (results.length > 0) {
      return results[0];
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export function signToken(user: UserCompleteInfo, key: string): string {
  const payload = { id: user.id, isAdmin: user.isAdmin };
  return jwt.sign(payload, key, tokenOptions);
}

export const verifyToken = (token: string, publicKey: string) => {
  const payload = jwt.verify(token, publicKey, tokenOptions);
  return payload;
};
