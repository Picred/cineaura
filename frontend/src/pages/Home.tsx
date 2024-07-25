import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useStore } from "zustand";
import { authStore } from "../zustand/AuthStore";
import { filmStore } from "../zustand/filmStore";
import FilmCard from "../components/FilmCard";
import { useEffect } from "react";

const Home = () => {
  const auth = useStore(authStore);
  const films = useStore(filmStore);

  useEffect(() => {
    films.update();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-8">Top 10 Films</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {films.films.map((film) => (
            <div key={film.id} className="w-full">
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
    </>
  );
};

export default Home;
