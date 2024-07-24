import { create } from "zustand";
import { FilmType, getAllFilms, addFilm, editFilm } from "../api/film.api";

interface FilmStore {
  films: FilmType[];
  add(film: FilmType): Promise<void>;
  edit(film: FilmType): Promise<void>;
  update(): Promise<void>;
}

export const filmStore = create<FilmStore>((set, get) => ({
  films: [],

  add: async (film: FilmType) => {
    try {
      await addFilm(film);
      get().update();
    } catch (error) {
      console.error("Failed to add film:", error);
      throw error;
    }
  },

  edit: async (film: FilmType) => {
    try {
      await editFilm(film);
      // Update the films list after editing a film
      get().update();
    } catch (error) {
      console.error("Failed to edit film:", error);
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
}));
