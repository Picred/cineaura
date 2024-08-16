import { conn } from "./index";
import fs from "fs/promises";
import jwt, { SignOptions } from "jsonwebtoken";
import { UserType } from "../types/UserType";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { generateKeyPairSync } from "crypto";

/**
 * Represents a pair of RSA keys.
 */
type KeyPair = {
  privateKey: string;
  publicKey: string;
};

/**
 * Represents complete user information.
 */
export type UserCompleteInfo = {
  id: number;
  username: string;
  password: string;
  isAdmin: boolean;
};

/**
 * Options for signing JWT tokens.
 */
export const tokenOptions: SignOptions = {
  expiresIn: "2h",
  algorithm: "RS256",
};

/**
 * Registers a new user in the database.
 * @param user - The user information to register.
 */
export function registerUserDB(user: UserType) {
  const sql =
    "insert into users (username, password, isAdmin) values (?, ?, ?);";

  conn.execute<ResultSetHeader>(sql, [user.username, user.password, false]);
}

/**
 * Generates a pair of RSA keys and saves them to the file system.
 * @returns A promise that resolves to the generated key pair.
 */
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

/**
 * Loads the RSA keys from the file system.
 * @returns A promise that resolves to the loaded key pair.
 */
export async function loadKeys(): Promise<KeyPair> {
  const privateKey = await fs.readFile("data/privateKey.pem", "utf-8");
  const publicKey = await fs.readFile("data/publicKey.pem", "utf-8");

  return { privateKey: privateKey, publicKey: publicKey };
}

/**
 * Retrieves user information by username.
 * @param username - The username to search for.
 * @returns A promise that resolves to the user information or null if not found.
 */
export async function getUserInfoByUsername(
  username: string
): Promise<UserCompleteInfo | null> {
  const sql = "SELECT * FROM users WHERE username = ?";
  try {
    const [results] = await conn.query<UserCompleteInfo[] & RowDataPacket[]>(
      sql,
      [username]
    );

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

/**
 * Signs a JWT token for a user.
 * @param user - The user information to include in the token.
 * @param key - The private key to sign the token with.
 * @returns The signed JWT token.
 */
export function signToken(user: UserCompleteInfo, key: string): string {
  const payload = { id: user.id, isAdmin: user.isAdmin };
  return jwt.sign(payload, key, tokenOptions);
}

/**
 * Verifies a JWT token.
 * @param token - The token to verify.
 * @param publicKey - The public key to verify the token with.
 * @returns The decoded token payload.
 */
export const verifyToken = (token: string, publicKey: string) => {
  const payload = jwt.verify(token, publicKey, tokenOptions);
  return payload;
};
