import { Request, Response } from "express";
import express from "express";

const adminRouter = express.Router();

adminRouter.get("/adm", async (req: Request, res: Response) => {
  res.send("Admin route");
});

export default adminRouter;
