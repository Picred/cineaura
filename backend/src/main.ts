import express, { Express, Request, Response } from "express";
import userRouter from "./routes/user.route";
import { generateKeys } from "./db/userOperations";
export const app: Express = express();
import cors from "cors";

const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

generateKeys();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api", userRouter);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
