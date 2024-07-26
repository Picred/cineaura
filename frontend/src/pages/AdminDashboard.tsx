import { useStore } from "zustand";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { filmStore } from "../zustand/filmStore";
import { FilmType } from "../types/FilmType";
import React, { useEffect, useState } from "react";
import { authStore } from "../zustand/AuthStore";

const AdminDashboard = () => {
  const auth = useStore(authStore);
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
    } as FilmType);
  };

  return (
    <>
      <Navbar />
      {!auth.isAdmin && (
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl md:text-4xl font-bold mb-4 text-error">
                Access Denied
              </h1>
              <p className="text-lg md:text-xl text-info">
                You are not an Administrator.
              </p>
            </div>
          </main>
        </div>
      )}

      {auth.isAdmin && (
        <div>
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

          <h1>Remove film</h1>
          <h1>Edit film</h1>
        </div>
      )}

      <Footer />
    </>
  );
};

export default AdminDashboard;
