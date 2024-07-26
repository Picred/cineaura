import { FilmType } from "../types/FilmType";
import { conn } from "./index";
import { RowDataPacket } from "mysql2/promise";

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

export async function addFilm(film: FilmType): Promise<void> {
  const sql =
    "INSERT INTO films (title, release_year, duration, genre, description, cast, rating, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

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
    ]);
  } catch (err) {
    console.log(err); // TODO: handle error without app crash
  }
}

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

export async function deleteFilm(filmId: number): Promise<void> {
  const sql = "DELETE FROM films WHERE id = ?";

  try {
    await conn.execute(sql, [filmId]);
  } catch (err) {
    console.log(err); // TODO: handle error without app crash
    // throw err;
  }
}
