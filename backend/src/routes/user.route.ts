import { Request, Response } from "express";
import {
  registerUserDB,
  generateKeys,
  getUserInfoByUsername,
  signToken,
  loginUser,
} from "../db/userOperations";
import { userAuth } from "../middlewares/userAuth";

const express = require("express");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

userRouter.post("/auth/register", async (req: Request, res: Response) => {
  try {
    await registerUserDB(req.body);
    generateKeys();

    const user = await getUserInfoByUsername(req.body.username);

    if (!user) {
      return res.status(404).send("User not found.");
    }

    const cookieOptions = {
      expires: new Date(Date.now() + 7.2e6), // 2 hours
      httpOnly: true,
      secure: false,
    };

    const token = signToken(user);

    res
      .cookie("token", token, cookieOptions)
      .send({ msg: "Congratulazioni. Controlla il token nei cookie." });
  } catch (e) {
    res.status(500).send("Error during registration process: " + e);
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

// userRouter.post("/auth/logout", (req: Request, res: Response) => {
//   res.clearCookie("token").send("Cookie eliminato.");
// remove jwt token
// });

userRouter.post("/auth/verify", userAuth, (req: Request, res: Response) => {
  res.send({ msg: "Token valido." });
});

export default userRouter;
