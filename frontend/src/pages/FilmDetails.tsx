import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FilmType } from "../types/FilmType";
import { useState, useEffect } from "react";
import { getFilmById } from "../api/film.api";

const FilmDetails = () => {
  const [film, setFilm] = useState<FilmType>({} as FilmType);
  const { id: filmId } = useParams();

  useEffect(() => {
    if (filmId) {
      getFilmById(Number(filmId))
        .then((film) => {
          setFilm(film as FilmType);
        })
        .catch((error) => {
          console.error("Error fetching film:", error);
        });
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="relative">
        <img src={film.img} className="h-96 w-full object-cover" alt="" />
      </div>
      <div className="container mx-auto grid grid-cols-12 gap-6">
        <div className="flex flex-col gap-4 col-span-12 md:col-span-4 lg:col-span-3">
          <div className="relative h-48">
            <div className="absolute bottom-0 w-full">
              <img
                src={film.img}
                className=" rounded mx-auto max-h-60 sm:max-h-96"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-8 lg:col-span-9">
          <h1 className="text-6xl font-bold">
            {film.title} ({film.release_year})
          </h1>
          <p className="text-info text-lg mt-2">
            {film.genre} | {film.duration} minutes
          </p>
          <div
            className="radial-progress text-secondary mt-2"
            style={{ "--value": film.rating * 10 } as React.CSSProperties}
            role="progressbar"
          >
            {film.rating}
          </div>
          <p className="text-info text-lg mt-2">Description</p>
          <p className="text-white text-lg mt-1">{film.description}</p>
          <p className="text-info text-lg mt-2">Cast</p>
          <p className="text-white text-lg mt-1 mb-10">{film.cast}</p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FilmDetails;
