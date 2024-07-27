// zustand/filmStore.ts
import { create } from "zustand";
import {
  getAllFilms,
  addFilm,
  getSchedule,
  addSchedule,
  addTicket,
  getTickets,
} from "../api/film.api";
import { FilmType } from "../types/FilmType";
import { notify } from "../utils/notify";
import { ScheduleType } from "../types/ScheduleType";
import { TicketType } from "../types/TicketType";

interface FilmStore {
  films: FilmType[];
  tickets: TicketType[];
  add(film: FilmType): Promise<void>;
  update(): Promise<void>;
  getFilm(id: number): FilmType | undefined;
  getTop10Films(): FilmType[];
  schedule: ScheduleType[];
  updateSchedule(): Promise<void>;
  addSchedule(schedule: ScheduleType): Promise<void>;
  addTicket(ticket: TicketType): Promise<void>;
  updateTickets(username: string): Promise<void>;
}

export const filmStore = create<FilmStore>((set, get) => ({
  films: [],
  schedule: [],
  tickets: [],

  add: async (film: FilmType) => {
    try {
      await addFilm(film);
      notify(
        "Film added successfully",
        "success",
        String(document.documentElement.getAttribute("data-theme"))
      );
      get().update(); // TODO: array.push() instead of fetching all films
    } catch (error) {
      console.error("Failed to add film:", error);
      throw error;
    }
  },

  update: async () => {
    try {
      const films = await getAllFilms();
      set({ films });
    } catch (error) {
      console.error("Failed to fetch films:", error);
    }
  },

  getFilm: (id: number) => {
    return get().films.find((film) => film.id === id);
  },

  getTop10Films: () => {
    return get()
      .films.slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  },

  updateSchedule: async () => {
    try {
      const schedule = await getSchedule();
      set({ schedule });
    } catch (error) {
      console.error("Failed to fetch schedule:", error);
    }
  },

  addSchedule: async (schedule: ScheduleType) => {
    try {
      await addSchedule(schedule);
      notify(
        "Schedule added successfully",
        "success",
        String(document.documentElement.getAttribute("data-theme"))
      );
      get().updateSchedule();
    } catch (error) {
      console.error("Failed to add schedule:", error);
      throw error;
    }
  },

  addTicket: async (ticket: TicketType) => {
    try {
      await addTicket(ticket);
      notify(
        "Ticket booked successfully",
        "success",
        String(document.documentElement.getAttribute("data-theme"))
      );
      // get().updateTickets();
    } catch (error) {
      console.error("Failed to book ticket:", error);
      // throw error;
    }
  },

  updateTickets: async (username: string) => {
    try {
      const tickets = await getTickets(username);
      set({ tickets });
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    }
  },
}));
