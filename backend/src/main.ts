import express, { Express, Request, Response } from "express";
import userRouter from "./routes/user.route";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api", userRouter);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
