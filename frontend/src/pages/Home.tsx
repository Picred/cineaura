import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useStore } from "zustand";
import { authStore } from "../zustand/AuthStore";
import { filmStore } from "../zustand/filmStore";
import FilmCard from "../components/FilmCard";
import { useEffect } from "react";
import { socket } from "../utils/socket";
import { ScheduleCard } from "../components/ScheduleCard";

const Home = () => {
  const auth = useStore(authStore);
  const films = useStore(filmStore);

  useEffect(() => {
    films.update();
    films.updateSchedule();
    socket.on("update", () => {
      films.update();
      films.updateSchedule();
    });
    socket.on("updateTickets", () => {
      films.updateTickets(auth.username);
    });

    socket.on("nowPlayingStart", (data) => {
      console.log("Now Playing Start: ", data);
    });

    socket.on("nowPlayingEnd", () => {
      console.log("Now Playing End");
    });
  }, []);

  return (
    <div className="bg-base-200">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          ▶ Now Playing
        </h1>
        <img
          src="https://c4.wallpaperflare.com/wallpaper/922/383/695/coming-coming-soon-sign-text-wallpaper-preview.jpg"
          className="w-full h-96 object-cover rounded-lg"
        ></img>

        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          🕗 Schedules
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {films.schedule?.map((schedule) => (
            <div key={schedule.id} className="w-full h-full flex">
              <ScheduleCard
                id={schedule.id}
                film_id={schedule.film_id}
                schedule_datetime={schedule.schedule_datetime}
                capacity={schedule.capacity}
              />
            </div>
          ))}
        </div>

        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          ⭐ Most rated films ⭐
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {films.getTop10Films().map((film) => (
            <div key={film.id} className="w-full h-full flex">
              <FilmCard
                id={film.id}
                title={film.title}
                release_year={film.release_year}
                duration={film.duration}
                genre={film.genre}
                cast={film.cast}
                rating={film.rating}
                img={film.img}
              />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
