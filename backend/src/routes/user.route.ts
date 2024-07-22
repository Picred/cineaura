import { Request, Response } from "express";
import {
  registerUserDB,
  getUserInfoByUsername,
  signToken,
  loadKeys,
} from "../db/userOperations";
import { userAuth } from "../middlewares/userAuth";

const express = require("express");
const userRouter = express.Router();

const cookieOptions = {
  expires: new Date(Date.now() + 7.2e6), // 2 hours
  httpOnly: false,
  secure: false,
};

userRouter.post("/auth/register", async (req: Request, res: Response) => {
  getUserInfoByUsername(req.body.username).then(async (user) => {
    if (user) {
      res.status(401).send({ msg: "Username already exists." });
    } else {
      registerUserDB(req.body);
      const keys = await loadKeys();
      const token = signToken(req.body, keys.privateKey);
      res
        .cookie("token", token, cookieOptions)
        .send({ msg: "User registered." });
    }
  });
});

userRouter.post("/auth/login", async (req: Request, res: Response) => {
  getUserInfoByUsername(req.body.username).then(async (user) => {
    if (user) {
      if (user.password === req.body.password) {
        const keys = await loadKeys();
        const token = signToken(req.body, keys.privateKey);
        res
          .cookie("token", token, cookieOptions)
          .send({ msg: "User registered." });
      } else {
        res.status(401).send({ msg: "Password errata." });
      }
    } else {
      res.status(401).send({ msg: "Username non trovato. Registrati" });
    }
  });
});

export default userRouter;
