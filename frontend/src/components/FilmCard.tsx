import { FilmType } from "../types/FilmType";
import { useNavigate } from "react-router-dom";

const FilmCard = ({
  id,
  title,
  release_year,
  duration,
  genre,
  cast,
  img,
  rating,
}: FilmType) => {
  const navigate = useNavigate();
  const showDetails = (filmId: number) => {
    console.log("SHOW DETAILS:", filmId);
    navigate(`/films/${filmId}`);
  };

  const deleteFilm = (filmId: number) => {
    console.log("DELETE:", filmId);
  };

  return (
    <div className="card bg-base-300 shadow-xl flex flex-col md:flex-row items-stretch ">
      <figure className="w-full md:w-1/3 flex-shrink-0 flex items-center justify-center">
        <img
          src={img}
          alt="Film Image"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body w-full md:w-2/3 p-4 flex flex-col">
        <div className="flex-grow mb-4">
          <h2 className="card-title text-lg md:text-xl mb-2 ">{title}</h2>
          <p className="mb-1">Release year: {release_year}</p>
          <p className="mb-1">Duration: {duration}</p>
          <p className="mb-1">Genre: {genre}</p>
          {/* <p className="mb-1">Cast: {cast}</p> */}
          {/* <p className="mb-1">Rating: {rating}</p> */}
        </div>
        <div className="card-actions flex gap-2 justify-end mt-auto">
          <button className="btn btn-secondary" onClick={() => showDetails(id)}>
            Details
          </button>
          <button className="btn btn-error" onClick={() => deleteFilm(id)}>
            Delete film
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilmCard;
