import { FilmType } from "../types/FilmType";
import { useStore } from "zustand";
import { authStore } from "../zustand/AuthStore";
import { filmStore } from "../zustand/filmStore";
import { useNavigate } from "react-router-dom";
import { socket } from "../utils/socket";

const FilmCard = ({ id, title, duration, genre, img }: FilmType) => {
  const auth = useStore(authStore);
  const films = useStore(filmStore);
  const navigate = useNavigate();

  const showDetails = (filmId: number) => {
    navigate(`/films/${filmId}`);
  };

  const deleteFilm = (filmId: number) => {
    socket.emit("deleteFilm", filmId);
  };
  return (
    <div className="card bg-base-300 shadow-xl flex flex-col md:flex-row items-stretch">
      <figure className="w-full md:w-1/3 flex-shrink-0 flex items-center justify-center">
        <img
          src={img}
          alt="Film Image"
          className="w-full h-full object-content"
        />
      </figure>
      <div className="card-body w-full lg:max-w-96 max-w-80 text-balance truncate lg:truncate md:w-2/3 p-4 flex flex-col ">
        <div className="flex-grow mb-4">
          <h2 className="card-title lg:text-3xl md:text-xl mb-2 ">{title}</h2>
          <p className="mb-1">Duration: {duration} minutes</p>
          <p className="mb-1">Genre: {genre}</p>
        </div>
        <div className="card-actions flex gap-2 justify-center mt-auto">
          <button className="btn btn-secondary" onClick={() => showDetails(id)}>
            <p className="text-secondary-content">Details</p>
          </button>

          {auth.isAdmin && (
            <button className="btn btn-error" onClick={() => deleteFilm(id)}>
              <p className="text-error-content">Delete film</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilmCard;
