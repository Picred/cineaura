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

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

// import { getUserInfoByUsername, UserCompleteInfo } from "./db/userOperations";

// let myuser: UserCompleteInfo;
// // getUserKeysByUsername("o").then((keys) => console.log(keys));
// getUserInfoByUsername("o").then((user) => {
//   myuser = user;
//   console.log(myuser.privateKey);
// });
