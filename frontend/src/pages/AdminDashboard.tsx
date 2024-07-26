import { useStore } from "zustand";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { filmStore } from "../zustand/filmStore";
import { authStore } from "../zustand/AuthStore";
import { FilmTable } from "../components/admin/FilmTable";
import { AddNewFilm } from "../components/admin/AddNewFilm";

const AdminDashboard = () => {
  const auth = useStore(authStore);
  const films = useStore(filmStore);

  return (
    <>
      <Navbar />
      {!auth.isAdmin && (
        <div className="flex flex-row min-h-screen">
          <main className="flex-grow flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl md:text-4xl font-bold mb-4 text-error">
                Access Denied
              </h1>
              <p className="text-lg md:text-xl text-info">
                You are not an Administrator.
              </p>
            </div>
          </main>
        </div>
      )}

      {auth.isAdmin && (
        <>
          <h1 className="text-3xl font-bold text-center mb-8 text-secondary">
            Admin Dashboard
          </h1>
          <div className="flex flex-wrap gap-3 justify-center px-4">
            <div className="w-full max-w-3xl">
              <h2 className="text-lg font-bold text-center mb-4 text-secondary">
                Add film
              </h2>
              <AddNewFilm />
            </div>
            <div className="w-full max-w-3xl">
              <h2 className="text-lg font-bold text-center mb-4 text-secondary">
                Films on DB
              </h2>
              <FilmTable films={films.films} />
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default AdminDashboard;
