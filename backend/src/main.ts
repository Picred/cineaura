import express, { Express, Request, Response } from "express";
import userRouter from "./routes/user.route";
const app: Express = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api", userRouter);

// app.post("/api/auth/login", (req: Request, res: Response) => {
//   console.log("Incoming request with req obj: ", req);
//   res.send("OK GRAZIE <3");
// });

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
