import { Request, Response } from "express";
import { showAllUsers } from "../db/userOperations";
const express = require("express");
const userRouter = express.Router();

userRouter.get("/auth/login", (req: Request, res: Response) => {
  showAllUsers();
  res.send("Hello from login route");
});

export default userRouter;
