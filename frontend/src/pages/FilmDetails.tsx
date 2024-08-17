import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FilmType } from "../types/FilmType";
import { useState, useEffect } from "react";
import { getFilmById } from "../api/film.api";

/**
 * FilmDetails component fetches and displays the details of a film based on the film ID from the URL parameters.
 *
 * @returns {JSX.Element} The rendered FilmDetails component.
 */
const FilmDetails = (): JSX.Element => {
  const [film, setFilm] = useState<FilmType>({} as FilmType);
  const { id: filmId } = useParams();

  /**
   * Fetches the film details using the ID and updates the local state.
   */
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
  }, [filmId]);

  return (
    <>
      <Navbar />
      <div
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${film.coverImg})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto grid grid-cols-1 gap-16 px-4 md:grid-cols-12 sm:gap-52 md:gap-16 bg-opacity-75 bg-black text-white p-6 rounded-lg">
          <div className="flex flex-col gap-4 col-span-1 md:col-span-4 lg:col-span-3">
            <div className="relative h-48 md:h-96">
              <div className="relative bottom-0 right-0 w-full">
                <img
                  src={film.img}
                  className="rounded mx-auto max-h-60 sm:max-h-96"
                  alt={film.title}
                />
              </div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-8 lg:col-span-9">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold">
              {film.title} ({film.release_year})
            </h1>
            <p className="text-md md:text-lg mt-2 italic font-bold">
              {film.genre} | {film.duration} minutes
            </p>

            <div
              className="radial-progress text-primary mt-2"
              style={{ "--value": film.rating * 10 } as React.CSSProperties}
              role="progressbar"
            >
              {film.rating}
            </div>
            <p className="text-md md:text-lg mt-3 italic font-bold">
              Description
            </p>
            <div className="divider divider-primary"></div>
            <p className="text-md md:text-lg mt-1">{film.description}</p>
            <div className="divider divider-primary"></div>
            <p className="text-md md:text-lg mt-2 italic font-bold">Cast</p>
            <p className="text-md md:text-lg mt-1 mb-10">{film.cast}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FilmDetails;
