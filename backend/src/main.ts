import express, { Express } from "express";
import apiRouter from "./routes/api.route";
import { generateKeys } from "./db/userOperations";
import cors from "cors";
import filmRouter from "./routes/films.route";

export const app: Express = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

generateKeys();

app.use("/api", apiRouter);
app.use("/api", filmRouter);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
