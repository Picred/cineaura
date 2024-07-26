import { create } from "zustand";
import { getAllFilms, addFilm } from "../api/film.api";
import { FilmType } from "../types/FilmType";
import { notify } from "../utils/notify";

interface FilmStore {
  films: FilmType[];
  add(film: FilmType): Promise<void>;
  update(): Promise<void>;
  getFilm(id: number): FilmType | undefined;
  getTop10Films(): FilmType[]; // Aggiungi questo metodo
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

  getTop10Films: () => {
    return get()
      .films.slice()
      .sort((a, b) => b.rating - a.rating) // Ordina i film per rating decrescente
      .slice(0, 6);
  },
}));
