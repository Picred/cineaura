import { Request, Response } from "express";
import { registerUserDB, generateKeys } from "../db/userOperations";
const express = require("express");
const userRouter = express.Router();

userRouter.post("/auth/register", (req: Request, res: Response) => {
  registerUserDB(req.body)
    .then((res) => {
      generateKeys();
      // signToken()
      // ogni nuovo utente che si registra comporta la cancellazione delle chiavi precedenti, come risolvo?
    })
    .catch((e) => res.status(500).send("Error during registration."));
});

export default userRouter;
