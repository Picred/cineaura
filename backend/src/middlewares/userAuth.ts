import { NextFunction } from "express";
import { loadKeys, verifyToken } from "../db/userOperations";
import { Request, Response } from "express";

const jwt = require("jsonwebtoken");

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("Token not found");
  }
  try {
    const keys = await loadKeys();

    console.log(keys);
    verifyToken(token, keys.publicKey);
    next();
  } catch (error) {
    return res.status(401).send("Invalid or expired token.");
  }
};

export { userAuth };
