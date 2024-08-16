import { FilmType } from "../types/FilmType";
import { conn } from "./index";
import { RowDataPacket } from "mysql2/promise";

/**
 * Retrieves all films from the database.
 * @returns A promise that resolves to an array of films or undefined if no films are found.
 */
export async function getAllFilms(): Promise<FilmType[] | undefined> {
  const sql = "SELECT * FROM films";

  try {
    const [results] = await conn.query<FilmType[] & RowDataPacket[]>(sql);

    if (results.length) {
      return results;
    }
  } catch (err) {
    throw err;
  }
}

/**
 * Adds a new film to the database.
 * @param film - The film information to add.
 * @returns A promise that resolves when the film is added.
 */
export async function addFilm(film: FilmType): Promise<void> {
  const sql =
    "INSERT INTO films (title, release_year, duration, genre, description, cast, rating, img, coverImg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  try {
    await conn.execute(sql, [
      film.title,
      film.release_year,
      film.duration,
      film.genre,
      film.description,
      film.cast,
      film.rating,
      film.img,
      film.coverImg,
    ]);
  } catch (err) {
    console.log(err);
  }
}

/**
 * Retrieves a film by its ID from the database.
 * @param id - The ID of the film to retrieve.
 * @returns A promise that resolves to the film information or undefined if the film is not found.
 */
export async function getFilmById(id: number): Promise<FilmType | undefined> {
  const sql = "SELECT * FROM films WHERE id = ?";

  try {
    const [results] = await conn.query<FilmType[] & RowDataPacket[]>(sql, [id]);

    if (results.length) {
      return results[0];
    }
  } catch (err) {
    throw err;
  }
}

/**
 * Deletes a film from the database by its ID.
 * @param filmId - The ID of the film to delete.
 * @returns A promise that resolves when the film is deleted.
 */
export async function deleteFilm(filmId: number): Promise<void> {
  const sql = "DELETE FROM films WHERE id = ?";

  try {
    await conn.execute(sql, [filmId]);
  } catch (err) {
    console.log(err);
  }
}
