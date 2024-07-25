import { Request, Response } from "express";
import {
  createFilm,
  getAllFilms,
  getFilmById,
  //   getFilmById,
  //   updateFilm,
  //   deleteFilm,
} from "../db/filmsOperations";
import express from "express";

const filmRouter = express.Router();

// Create a new Film
filmRouter.post("/films", async (req: Request, res: Response) => {
  try {
    await createFilm(req.body);
    res.status(201).send({ msg: "Movie created." });
  } catch (error) {
    res.status(500).send({ msg: "Error creating movie.", error });
  }
});

// Get all films
filmRouter.get("/films", async (req: Request, res: Response) => {
  try {
    const films = await getAllFilms();
    res.send(films);
  } catch (error) {
    res.status(500).send({ msg: "Error retrieving films.", error });
  }
});

// Get a movie by ID
filmRouter.get("/films/:id", async (req: Request, res: Response) => {
  try {
    const film = await getFilmById(Number(req.params.id));
    if (film) {
      res.send(film);
    } else {
      res.status(404).send({ msg: "Film not found." });
    }
  } catch (error) {
    res.status(500).send({ msg: "Error retrieving film.", error });
  }
});

// // Update a movie by ID
// filmRouter.put("/movies/:id", async (req: Request, res: Response) => {
//   try {
//     const updated = await updateMovieDB(req.params.id, req.body);
//     if (updated) {
//       res.send({ msg: "Movie updated." });
//     } else {
//       res.status(404).send({ msg: "Movie not found." });
//     }
//   } catch (error) {
//     res.status(500).send({ msg: "Error updating movie.", error });
//   }
// });

// // Delete a movie by ID
// filmRouter.delete("/movies/:id", async (req: Request, res: Response) => {
//   try {
//     const deleted = await deleteMovieDB(req.params.id);
//     if (deleted) {
//       res.send({ msg: "Movie deleted." });
//     } else {
//       res.status(404).send({ msg: "Movie not found." });
//     }
//   } catch (error) {
//     res.status(500).send({ msg: "Error deleting movie.", error });
//   }
// });

export default filmRouter;
