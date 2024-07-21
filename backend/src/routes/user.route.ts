import { Request, Response } from "express";
import {
  // registerUserDB2,
  registerUserDB,
  generateKeys,
  getUserInfoByUsername,
  signToken,
  loginUser,
  loadKeys,
} from "../db/userOperations";
import { userAuth } from "../middlewares/userAuth";

const express = require("express");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

userRouter.post("/auth/register", async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const token = await registerUserDB(user);

    if (typeof token === "string") {
      const cookieOptions = {
        expires: new Date(Date.now() + 7.2e6), // 2 hours
        httpOnly: false,
        secure: false,
      };

      res.cookie("token", token, cookieOptions).send({
        msg: "Registrato con successo. Un nuovo cookie è stato impostato.",
      });
    } else {
      res.status(500).send({ msg: "Errore nella registrazione dell'utente" });
    }
  } catch (e) {
    res.status(500).send({ msg: "ERRORE: " + e });
  }
});

userRouter.post("/auth/login", async (req: Request, res: Response) => {
  try {
    const token = await loginUser(req.body);
    // console.log("token dopo login: ", token);
    if (token.length == 0) {
      return res.status(401).send({ msg: "User not found." });
    }
    const cookieOptions = {
      expires: new Date(Date.now() + 7.2e6), // 2 hours
      httpOnly: true,
      secure: false,
    };

    res
      .cookie("token", token, cookieOptions)
      .send({ msg: "Successfully logged in. A new cookie was set." });
  } catch (e) {
    // res.status(401);
    res.send("ERRORE LOGIN: " + JSON.stringify(e));
  }
});

userRouter.post("/auth/verify", userAuth, (req: Request, res: Response) => {
  res.send({ msg: "Token valido." });
});

export default userRouter;
