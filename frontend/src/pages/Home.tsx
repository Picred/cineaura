import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
// import { Link } from "react-router-dom";
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
      <div className="carousel carousel-end rounded-box">
        {films.films.map((film) => {
          return (
            <div className="carousel-item" key={film.id}>
              <FilmCard
                title={film.title}
                release_year={film.release_year}
                duration={film.duration}
                genre={film.genre}
                description={film.description}
                cast={film.cast}
                rating={film.rating}
                img={film.img}
              />
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default Home;
