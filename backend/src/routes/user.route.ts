import { Request, Response } from "express";
import {
  registerUserDB,
  generateKeys,
  getUserKeysByUsername,
  getUserInfoByUsername,
  UserCompleteInfo,
} from "../db/userOperations";

const express = require("express");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

userRouter.post("/auth/register", async (req: Request, res: Response) => {
  try {
    const rowsAffected = await registerUserDB(req.body);
    generateKeys();

    const keyPair = await getUserKeysByUsername(req.body.username);

    const user = await getUserInfoByUsername(req.body.username);

    if (!user) {
      return res.status(404).send("User not found.");
    }

    const payload = { id: user.id, isAdmin: user.isAdmin };
    const options = { expiresIn: "2h" };
    const cookieOptions = {
      expires: new Date(Date.now() + 7.2e6), // 2 hours
      httpOnly: true,
      secure: false,
    };

    const token = jwt.sign(payload, user.password, options);

    res
      .cookie("token", token, cookieOptions)
      .send({ msg: "Congratulazioni. Controlla il token nei cookie." }); // Assuming you want to set the token as a cookie
  } catch (e) {
    res.status(500).send("Error during registration process: " + e);
  }
});

export default userRouter;
