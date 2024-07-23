import express, { Express, Request, Response } from "express";
import userRouter from "./routes/user.route";
import { generateKeys } from "./db/userOperations";
export const app: Express = express();
const cors = require("cors");

generateKeys();

const cookieParser = require("cookie-parser");
app.use(cookieParser());
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

import { createFilm, getAllFilms } from "./db/filmsOperations";
import { FilmType } from "./db/filmsOperations";

createFilm({
  title: "MyFILM",
  release_year: 1994,
  duration: 142,
  genre: "Drama",
  description: "Two imprisone",
  cast: "Tim Robbins, Morgan Freeman, Bob Gunton",
  rating: 9.3,
}).catch((e) => {
  console.log("ERRORE: ", e);
});

// getAllFilms().then((films) => {
//   console.log(films);
// });
