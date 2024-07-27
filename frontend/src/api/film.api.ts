import { FilmType } from "../types/FilmType";
import { socket } from "../utils/socket";
import { ScheduleType } from "../types/ScheduleType";
import { TicketType } from "../types/TicketType";

export const getAllFilms = async (): Promise<FilmType[]> => {
  return new Promise((resolve, reject) => {
    socket.emit("getAllFilms", (response: any) => {
      if (response.success) {
        resolve(response.films);
      } else {
        reject(response.message || "Error fetching films!");
      }
    });
  });
};

export const addFilm = async (film: FilmType): Promise<void> => {
  return new Promise((resolve, reject) => {
    socket.emit("addFilm", film, (response: any) => {
      if (response.success) {
        resolve();
      } else {
        reject(new Error(response.message || "Failed to add film"));
      }
    });
  });
};

export const getFilmById = async (id: number): Promise<FilmType> => {
  return new Promise((resolve, reject) => {
    socket.emit("getFilmById", id, (response: any) => {
      if (response.success) {
        resolve(response.film);
      } else {
        reject(new Error(response.message || "Error fetching film!"));
      }
    });
  });
};

export const getSchedule = async (): Promise<ScheduleType[]> => {
  return new Promise((resolve, reject) => {
    socket.emit("getSchedule", (response: any) => {
      if (response.success) {
        resolve(response.schedule);
      } else {
        reject(response.message || "Error fetching schedule!");
      }
    });
  });
};

export const addSchedule = async (schedule: ScheduleType): Promise<void> => {
  return new Promise((resolve, reject) => {
    socket.emit("addSchedule", schedule, (response: any) => {
      if (response.success) {
        resolve();
      } else {
        reject(response.message || "Error adding schedule!");
      }
    });
  });
};
export const addTicket = async (ticket: TicketType): Promise<void> => {
  return new Promise((resolve, reject) => {
    socket.emit("addTicket", ticket, (response: any) => {
      if (response.success) {
        resolve();
      } else {
        reject(response.message || "Error adding ticket!");
      }
    });
  });
};

export const getTickets = async (): Promise<TicketType[]> => {
  return new Promise((resolve, reject) => {
    socket.emit("getTickets", (response: any) => {
      if (response.success) {
        resolve(response.tickets);
      } else {
        reject(response.message || "Error fetching tickets!");
      }
    });
  });
};
export const updateTicket = async (ticket: TicketType): Promise<void> => {
  return new Promise((resolve, reject) => {
    socket.emit("updateTicket", ticket, (response: any) => {
      if (response.success) {
        resolve();
      } else {
        reject(response.message || "Error updating ticket!");
      }
    });
  });
};
