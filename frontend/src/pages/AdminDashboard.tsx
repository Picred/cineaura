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
              <p className="text-lg md:text-xl text-secondary">
                You are not an Administrator.
              </p>
            </div>
          </main>
        </div>
      )}

      {auth.isAdmin && (
        <>
          <h1 className="relative text-4xl font-bold text-center text-primary">
            Admin Dashboard
          </h1>
          <div className="divider divider-primary"></div>

          <div className="flex flex-col md:flex-row gap-3 px-4 ">
            <AddNewFilm />
            <FilmTable films={films.films} />
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default AdminDashboard;
