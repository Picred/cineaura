import { useNavigate } from "react-router-dom";
import { FilmType } from "../../types/FilmType";
import { socket } from "../../utils/socket";

export const FilmTable = ({ films }: { films: FilmType[] }) => {
  const navigate = useNavigate();

  const showDetails = (filmId: number) => {
    navigate(`/films/${filmId}`);
  };

  const deleteFilm = (filmId: number) => {
    socket.emit("deleteFilm", filmId);
  };

  return (
    <div className="overflow-x-auto max-h-screen flex-grow">
      <table className="table bg-base-300 min-w-full">
        <thead>
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Release year</th>
            <th className="p-2">Duration (min)</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {films?.map((film: FilmType, index: number) => (
            <tr key={index}>
              <td className="p-2">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={film.img}
                        alt="Film Image"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="font-bold">
                      [{film.id}] {film.title}
                    </div>
                    <div className="text-sm opacity-50">{film.genre}</div>
                  </div>
                </div>
              </td>
              <td className="p-2">
                {film.release_year}
                <br />
                <span className="badge badge-ghost badge-sm">
                  {film.rating}
                </span>
              </td>
              <td className="p-2">{film.duration}</td>
              <td className="p-2 gap-1 flex">
                <button
                  className="btn btn-info btn-xs"
                  onClick={() => showDetails(film.id)}
                >
                  Details
                </button>
                <button
                  className="btn btn-error btn-xs"
                  onClick={() => deleteFilm(film.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Release year</th>
            <th className="p-2">Duration</th>
            <th className="p-2"></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
