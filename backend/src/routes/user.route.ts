import { Request, Response } from "express";
import {
  registerUserDB,
  getUserInfoByUsername,
  signToken,
  loadKeys,
  UserCompleteInfo,
} from "../db/userOperations";
import express from "express";

import { userAuth } from "../middlewares/userAuth";

const userRouter = express.Router();

const cookieOptions = {
  expires: new Date(Date.now() + 1.44e7),
  httpOnly: false,
  secure: false,
};

userRouter.post("/auth/register", async (req: Request, res: Response) => {
  getUserInfoByUsername(req.body.username).then(async (user) => {
    if (user) {
      res.status(401).send({ msg: "Username already exists." });
    } else {
      registerUserDB(req.body);
      res.send({ msg: "User registered." });
    }
  });
});

userRouter.post("/auth/login", async (req: Request, res: Response) => {
  getUserInfoByUsername(req.body.username).then(async (user) => {
    if (user) {
      if (user.password === req.body.password) {
        const keys = await loadKeys();
        const token = signToken(user, keys.privateKey);
        res
          .cookie("token", token, cookieOptions)
          .send({ msg: "User logged.", isAdmin: user.isAdmin });
        console.log(cookieOptions.expires);
      } else {
        res.status(401).send({ msg: "Wrong password." });
      }
    } else {
      res.status(401).send({ msg: "User not found. Please register." });
    }
  });
});

export default userRouter;
