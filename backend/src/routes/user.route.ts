import { Request, Response } from "express";
import { registerUserDB } from "../db/userOperations";
const express = require("express");
const userRouter = express.Router();

userRouter.post("/auth/register", (req: Request, res: Response) => {
  registerUserDB(req.body);
  console.log("Incoming request with body: ", req.body);
  res.send({ username: "userLogged", password: "passwordLogged" });
});

export default userRouter;
