import { useStore } from "zustand";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { filmStore } from "../zustand/filmStore";
import { authStore } from "../zustand/AuthStore";
import { FilmTable } from "../components/admin/FilmTable";
import { AddNewFilm } from "../components/admin/AddNewFilm";
import { AddSchedule } from "../components/admin/AddSchedule";
import { ScheduleTable } from "../components/admin/ScheduleTable";

/**
 * AdminDashboard component displays the admin dashboard with options to add films, view films, and manage schedules.
 *
 * @returns {JSX.Element} The rendered AdminDashboard component.
 */
const AdminDashboard = (): JSX.Element => {
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
          <h1 className="text-3xl font-mono m-8 text-neutral-content text-center bg-neutral rounded-full p-2 max-w-screen inline-block">
            Welcome {auth.username} 👋
          </h1>
          <div className="flex flex-wrap gap-10 justify-center px-4 ">
            <div className="w-full max-w-lg">
              <h2 className="text-lg font-semibold text-center text-info-content bg-info rounded-full mb-6">
                Add film
              </h2>
              <AddNewFilm />
            </div>
            <div className="w-full max-w-lg">
              <h2 className="text-lg font-semibold text-center text-info-content bg-info rounded-full mb-6">
                Film
              </h2>
              <FilmTable films={films.films} />
            </div>
            <div className="w-full max-w-lg">
              <h2 className="text-lg font-semibold text-center text-info-content bg-info rounded-full mb-6">
                Schedule
              </h2>
              <ScheduleTable schedule={films?.schedule} />
            </div>

            <div className="w-full max-w-lg">
              <h2 className="text-lg font-semibold text-center text-info-content bg-info rounded-full mb-6">
                New schedule
              </h2>
              <AddSchedule />
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default AdminDashboard;
