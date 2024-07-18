import { Request, Response } from "express";
import { showAllUsers } from "../db/userOperations";
const express = require("express");
const userRouter = express.Router();

userRouter.post("/auth/login", (req: Request, res: Response) => {
  showAllUsers();
  console.log("Incoming request with body: ", req.body);
  res.send({ username: "userLogged", password: "passwordLogged" });
});

export default userRouter;
