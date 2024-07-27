import { useStore } from "zustand";
import { ScheduleType } from "../types/ScheduleType";
import { filmStore } from "../zustand/filmStore";
import { formatIsoDate } from "../utils/isoDate";

export const ScheduleCard = ({
  id,
  film_id,
  schedule_datetime,
  capacity,
}: ScheduleType) => {
  const films = useStore(filmStore);
  const film = films.getFilm(film_id);

  return (
    <div className="relative group bg-base-100 w-64 image-full shadow-2xl">
      <figure>
        <img
          src={film?.img}
          alt="Film"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h2 className="text-xl font-bold">{film?.title}</h2>
        <p className="mt-2 text-wrap">{formatIsoDate(schedule_datetime)}</p>
        <div className="mt-4">
          <button className="btn btn-primary">Book Now</button>
        </div>
      </div>
    </div>
  );
};
