import { useState } from "react";
import { useStore } from "zustand";
import { FilmType } from "../../types/FilmType";
import { filmStore } from "../../zustand/filmStore";

/**
 * The AddNewFilm component provides a form for adding a new film to the film store. It uses Zustand for state management
 * and maintains local state for the film details being added.
 *
 * @returns {JSX.Element} The rendered AddNewFilm component.
 */
export const AddNewFilm = (): JSX.Element => {
  const films = useStore(filmStore);
  const [filmToAdd, setFilmToAdd] = useState<FilmType>({
    title: "",
    release_year: 2024,
    duration: 100,
    genre: "",
    description: "",
    cast: "",
    img: "",
    coverImg: "",
    rating: 0,
  } as FilmType);

  /**
   * Handles changes to the form inputs and updates the local state `filmToAdd`.
   *
   * @param {React.ChangeEvent} e - The change event triggered by the form input.
   */
  const handleChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFilmToAdd((prev: FilmType) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Handles the form submission to add a new film to the film store.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleAddFilm = (e: React.FormEvent) => {
    e.preventDefault();
    films.add(filmToAdd);
    setFilmToAdd({
      title: "",
      release_year: 2024,
      duration: 100,
      genre: "",
      description: "",
      cast: "",
      img: "",
      coverImg: "",
      rating: 0,
    } as FilmType);
  };

  return (
    <form
      className="card bg-base-300 max-w-screen mx-auto shadow-xl form-control max-h-screen overflow-y-auto"
      onSubmit={handleAddFilm}
    >
      <div className="card-body flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="font-bold">Title</span>
          <input
            required
            type="text"
            name="title"
            value={filmToAdd.title}
            placeholder="Inside Out 2"
            className="input input-bordered"
            onChange={handleChange}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-bold">Release year</span>
          <input
            required
            type="number"
            name="release_year"
            value={filmToAdd.release_year}
            className="input input-bordered"
            onChange={handleChange}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-bold">Duration (min)</span>
          <input
            required
            type="number"
            name="duration"
            value={filmToAdd.duration}
            className="input input-bordered"
            onChange={handleChange}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-bold">Genre</span>
          <input
            required
            type="text"
            name="genre"
            value={filmToAdd.genre}
            placeholder="Animation"
            className="input input-bordered"
            onChange={handleChange}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-bold">Description</span>
          <input
            required
            type="text"
            name="description"
            value={filmToAdd.description}
            placeholder="A story about emotions"
            className="input input-bordered"
            onChange={handleChange}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-bold">Cast</span>
          <input
            required
            type="text"
            name="cast"
            value={filmToAdd.cast}
            placeholder="Amy Poehler, Bill Hader"
            className="input input-bordered"
            onChange={handleChange}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-bold">Image URL</span>
          <input
            required
            type="text"
            name="img"
            value={filmToAdd.img}
            placeholder="https://www.google.com"
            className="input input-bordered"
            onChange={handleChange}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-bold">Cover Image URL</span>
          <input
            required
            type="text"
            name="coverImg"
            value={filmToAdd.coverImg}
            placeholder="https://www.google.com"
            className="input input-bordered"
            onChange={handleChange}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-bold">Rating (1-10)</span>
          <input
            required
            type="number"
            name="rating"
            value={filmToAdd.rating}
            max={10}
            className="input input-bordered"
            onChange={handleChange}
          />
        </label>
        <div className="card-actions justify-end">
          <button type="submit" className="btn btn-info">
            Add film
          </button>
        </div>
      </div>
    </form>
  );
};
