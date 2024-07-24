import { conn } from "./index";
import { RowDataPacket } from "mysql2/promise";

export type FilmType = {
  title: string;
  release_year: number;
  duration: number;
  genre: string;
  description: string;
  cast: string;
  img: string;
  rating: number;
};

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

export async function createFilm(film: FilmType): Promise<void> {
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
