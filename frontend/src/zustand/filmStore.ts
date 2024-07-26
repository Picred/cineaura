import { create } from "zustand";
import { getAllFilms, addFilm } from "../api/film.api";
import { FilmType } from "../types/FilmType";
import { notify } from "../utils/notify";

interface FilmStore {
  films: FilmType[];
  add(film: FilmType): Promise<void>;
  update(): Promise<void>;
  getFilm(id: number): FilmType | undefined;
  // edit(film: FilmType): Promise<void>;
}

export const filmStore = create<FilmStore>((set, get) => ({
  films: [],

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

  // edit: async (film: FilmType) => {
  //   try {
  //     await editFilm(film);
  //     // Update the films list after editing a film
  //     get().update();
  //   } catch (error) {
  //     console.error("Failed to edit film:", error);
  //     throw error;
  //   }
  // }
}));
