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

import { getTickets, addTicket, deleteTicket } from "./db/ticketOperations";
import {
  getSchedule,
  addSchedule,
  removeSchedule,
  removeScheduleById,
} from "./db/scheduleOperations";

export const app: Express = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

generateKeys();

app.use("/api", apiRouter);
app.use(express.static("public"));

app.use("*", (req, res) => res.sendFile("public/index.html", { root: "./" }));

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
      io.sockets.emit("updateTickets");
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

  socket.on("getSchedule", async (callback) => {
    try {
      const schedule = await getSchedule();
      callback({ success: true, schedule });
    } catch (error) {
      console.error("Error fetching schedule:", error);
      callback({ success: false, message: "Error fetching schedule" });
    }
  });

  socket.on("addSchedule", async (schedule, callback) => {
    try {
      await addSchedule(schedule);
      const film = await getFilmById(schedule.film_id);

      if (film) {
        const scheduleTime = new Date(schedule.schedule_datetime).getTime();
        const now = Date.now();
        const filmDuration = film.duration * 60000;
        const filmEndTime = scheduleTime + filmDuration;
        const timeUntilStart = scheduleTime - now;
        const timeUntilEnd = filmEndTime - now;

        setTimeout(() => {
          io.sockets.emit("nowPlayingStart", film);
        }, timeUntilStart);

        setTimeout(() => {
          io.sockets.emit("nowPlayingEnd", film);
          removeSchedule(schedule);
          io.sockets.emit("update");
        }, timeUntilEnd);
      }

      io.sockets.emit("update");
      callback({ success: true });
    } catch (error) {
      console.error("Error adding schedule:", error);
      callback({ success: false, message: "Error adding schedule" });
    }
  });

  socket.on("deleteSchedule", async (id) => {
    try {
      await removeScheduleById(id);
      io.sockets.emit("update");
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  });
  socket.on("getTickets", async (username, callback) => {
    try {
      const tickets = await getTickets(username);
      io.sockets.emit("update");
      callback({ success: true, tickets });
    } catch (error) {
      callback({ success: false, message: (error as any).message });
    }
  });

  socket.on("addTicket", async (ticket, callback) => {
    try {
      await addTicket(ticket);
      io.sockets.emit("update");
      callback({ success: true });
    } catch (error) {
      console.error("Error adding ticket:", error);
      callback({ success: false, message: "Error adding ticket" });
    }
  });

  socket.on("deleteTicket", async (id) => {
    try {
      await deleteTicket(id);
      io.sockets.emit("update");
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  });
});

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
