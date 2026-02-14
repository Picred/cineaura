import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useStore } from "zustand";
import { authStore } from "../zustand/AuthStore";
import { filmStore } from "../zustand/filmStore";
import FilmCard from "../components/FilmCard";
import { useEffect } from "react";
import { socket } from "../utils/socket";
import { ScheduleCard } from "../components/ScheduleCard";
import { nowPlayingStore } from "../zustand/nowPlayingStore";
import { NowPlaying } from "../components/NowPlaying";

/**
 * Home component displays the home page with now playing films, schedule, and top-rated films.
 *
 * @returns {JSX.Element} The rendered Home component.
 */
const Home = (): JSX.Element => {
  const auth = useStore(authStore);
  const films = useStore(filmStore);
  const nowPlaying = useStore(nowPlayingStore);

  /**
   * Initializes film data and set up socket event listeners
   */
  useEffect(() => {
    const initializeData = async () => {
      try {
        await films.update();
        await films.updateSchedule();
      } catch (error) {
        console.error("❌ Failed to initialize data:", error);
      }
    };

    // Always call on connect (fires immediately if already connected)
    socket.on("connect", () => {
      initializeData();
    });

    socket.on("connect_error", (error: any) => {
      console.error("❌ Socket connection error:", error);
    });

    socket.on("update", () => {
      films.update();
      films.updateSchedule();
    });
    socket.on("updateTickets", () => {
      films.updateTickets(auth.username);
    });

    socket.on("nowPlayingStart", (film: any) => {
      const startTime = Date.now();
      nowPlaying.add(
        String(film.title),
        String(film.coverImg),
        Number(film.duration),
        startTime
      );
    });

    socket.on("nowPlayingEnd", () => {
      nowPlaying.reset();
    });

    return () => {
      socket.off("connect");
      socket.off("update");
      socket.off("updateTickets");
      socket.off("nowPlayingStart");
      socket.off("nowPlayingEnd");
    };
  }, []);

  return (
    <div className="bg-base-200">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        {nowPlaying.filmTitle && (
          <>
            <h1 className="text-3xl font-bold text-center mb-8 text-primary">
              <p className="pt-2">▶ Now Playing </p>
              <div className="divider divider-neutral"></div>
            </h1>
            <NowPlaying
              title={nowPlaying.filmTitle}
              img={nowPlaying.filmImg}
              duration={nowPlaying.filmDuration}
            />
          </>
        )}

        {films.schedule && (
          <>
            <h1 className="text-3xl font-bold text-center mb-8 text-primary">
              <p className="pt-2">🕗 Schedule</p>
              <div className="divider divider-neutral"></div>
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
          </>
        )}

        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          <p className="pt-2">⭐ Most Rated</p>
          <div className="divider divider-neutral"></div>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {films.getTop10Films() &&
            films.getTop10Films().map((film) => (
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
