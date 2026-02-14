import { FilmType } from "../types/FilmType";
import { useStore } from "zustand";
import { authStore } from "../zustand/AuthStore";
import { useNavigate } from "react-router-dom";
import { socket } from "../utils/socket";

/**
 * FilmCard component displays a card with film details and options to view details or delete the film.
 *
 * @param {FilmType} props - The film details to display in the card.
 * @param {number} props.id - The ID of the film.
 * @param {string} props.title - The title of the film.
 * @param {number} props.duration - The duration of the film in minutes.
 * @param {string} props.genre - The genre of the film.
 * @param {string} props.img - The URL of the film's image.
 * @param {number} props.rating - The rating of the film.
 * @returns {JSX.Element} The rendered FilmCard component.
 */
const FilmCard = ({
  id,
  title,
  duration,
  genre,
  img,
  rating,
}: FilmType): JSX.Element => {
  const auth = useStore(authStore);
  const navigate = useNavigate();

  /**
   * Navigates to the film details page for the specified film ID.
   *
   * @param {number} filmId - The ID of the film to show details for.
   */
  const showDetails = (filmId: number) => {
    navigate(`/films/${filmId}`);
  };

  /**
   * Emits a socket event to delete the specified film by its ID.
   *
   * @param {number} filmId - The ID of the film to delete.
   */
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
        <span className="absolute top-2 left-2 bg-primary-content text-primary text-sm font-bold rounded-full px-3 py-1">
          {rating}
        </span>
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
