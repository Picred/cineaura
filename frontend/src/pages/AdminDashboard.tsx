import { useStore } from "zustand";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { filmStore } from "../zustand/filmStore";
import { FilmType } from "../api/film.api";
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const films = useStore(filmStore);
  const [filmToAdd, setFilmToAdd] = useState<FilmType>({
    title: "",
    release_year: 2024,
    duration: 100,
    genre: "",
    description: "",
    cast: "",
    img: "",
    rating: 0,
  } as FilmType);

  useEffect(() => {
    console.log(filmToAdd);
  }, [
    filmToAdd.title,
    filmToAdd.cast,
    filmToAdd.description,
    filmToAdd.duration,
    filmToAdd.genre,
    filmToAdd.img,
    filmToAdd.rating,
    filmToAdd.release_year,
  ]);

  const handleChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFilmToAdd((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddFilm = () => {
    films.add(filmToAdd);
    setFilmToAdd({
      title: "",
      release_year: 2024,
      duration: 100,
      genre: "",
      description: "",
      cast: "",
      img: "",
      rating: 0,
    });
  };

  return (
    <div>
      <Navbar />
      <h1>Admin Dashboard</h1>

      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-warning">Add new Film</h2>

          <label className="input input-bordered flex items-center gap-2 font-bold">
            Title
            <input
              required
              type="text"
              name="title"
              value={filmToAdd.title}
              placeholder="Inside Out 2"
              className="grow font-normal"
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 font-bold">
            Release year
            <input
              required
              type="number"
              name="release_year"
              value={filmToAdd.release_year}
              className="grow font-normal"
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 font-bold">
            Duration (min)
            <input
              required
              type="number"
              name="duration"
              value={filmToAdd.duration}
              className="grow font-normal"
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 font-bold">
            Genre
            <input
              required
              type="text"
              name="genre"
              value={filmToAdd.genre}
              placeholder="Animation"
              className="grow font-normal"
              onChange={handleChange}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 font-bold">
            Description
            <input
              required
              type="text"
              name="description"
              value={filmToAdd.description}
              placeholder="A story about emotions"
              className="grow font-normal"
              onChange={handleChange}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 font-bold">
            Cast
            <input
              required
              type="text"
              name="cast"
              value={filmToAdd.cast}
              placeholder="Amy Poehler, Bill Hader"
              className="grow font-normal"
              onChange={handleChange}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 font-bold">
            Image URL
            <input
              required
              type="text"
              name="img"
              value={filmToAdd.img}
              placeholder="https://www.google.com"
              className="grow font-normal"
              onChange={handleChange}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 font-bold">
            Rating (1-10)
            <input
              required
              type="number"
              name="rating"
              value={filmToAdd.rating}
              max={10}
              min={1}
              className="grow font-normal"
              onChange={handleChange}
            />
          </label>
          <div className="card-actions justify-end">
            <button className="btn btn-outline" onClick={handleAddFilm}>
              Add film
            </button>
          </div>
        </div>
      </div>

      {/* <button
        className="btn btn-outline"
        onClick={() =>
          films.add({
            title: "Iron Man",
            release_year: 2008,
            duration: 126,
            genre: "Action",
            description:
              "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
            cast: "Robert Downey Jr., Gwyneth Paltrow, Terrence Howard",
            img: "https://pad.mymovies.it/filmclub/2007/02/234/locandina.jpg",
            rating: 7.9,
          })
        }
      >
        Add film
      </button> */}

      <h1>Remove film</h1>
      <h1>Edit film</h1>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
