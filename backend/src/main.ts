import express, { Express } from "express";
import http from "http";
import { Server } from "socket.io";
import apiRouter from "./routes/api.route";
import { generateKeys } from "./db/userOperations";
import cors from "cors";
import {
  getAllFilms,
  addFilm,
  deleteFilm,
  getFilmById,
} from "./db/filmsOperations";

export const app: Express = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

generateKeys();

app.use("/api", apiRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`New socket client [ ${socket.id} ] connected`);

  socket.on("disconnect", () => {
    console.log(`Client [${socket.id}] disconnected`);
  });

  socket.on("getAllFilms", async (callback) => {
    try {
      const films = await getAllFilms();
      callback({ success: true, films });
    } catch (error) {
      callback({ success: false, message: (error as any).message });
    }
  });

  socket.on("addFilm", async (film, callback) => {
    try {
      await addFilm(film);
      io.sockets.emit("update");
      callback({ success: true });
    } catch (error) {
      callback({ success: false, message: (error as any).message });
    }
  });

  socket.on("deleteFilm", async (id) => {
    try {
      await deleteFilm(id);
      io.sockets.emit("update");
    } catch (error) {
      console.log("There was an error during deleting film: ", error);
    }
  });

  socket.on("getFilmById", async (id, callback) => {
    try {
      const film = await getFilmById(id);
      callback({ success: true, film });
    } catch (error) {
      callback({ success: false, message: (error as any).message });
    }
  });
});

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
