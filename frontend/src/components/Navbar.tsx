import ThemeSwitcher from "./ThemeSwitcher";
import { Link } from "react-router-dom";
import { authStore } from "../zustand/AuthStore";
import { useStore } from "zustand";
import { useState, useEffect } from "react";
import { filmStore } from "../zustand/filmStore";
import { formatIsoDate } from "../utils/isoDate";
import { deleteTicket } from "../api/film.api";

/**
 * Navbar component displays the navigation bar with links, user information, and ticket details.
 *
 * @returns {JSX.Element} The rendered Navbar component.
 */
const Navbar = (): JSX.Element => {
  const auth = useStore(authStore);
  const films = useStore(filmStore);
  const allTickets = films.tickets;

  const [numberOfTickets, setNumberOfTickets] = useState<number>(
    films.tickets?.length || 0
  );

  /**
   *
   * Updates the tickets for the authenticated user and sets the number of tickets.
   *
   * Dependencies: [allTickets]
   */
  useEffect(() => {
    films.updateTickets(auth.username);
    setNumberOfTickets(allTickets?.length || 0);
  }, [allTickets]);

  return (
    <div className="navbar bg-neutral p-4">
      <div className="flex items-center justify-between w-full">
        <Link to="/">
          <img
            src="/cineaura.svg"
            alt="CineAura Logo"
            className="w-12 h-12 hover:scale-110 transition-transform"
          />
        </Link>

        {auth.isAdmin && (
          <div className="hidden lg:flex lg:items-left lg:justify-left pl-4 lg:flex-1">
            <Link to="/admin-dashboard" className="btn btn-secondary text-xl">
              Admin Dashboard
            </Link>
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="dropdown dropdown-end flex-col items-center justify-center">
            <div tabIndex={0}>
              <button className="btn btn-secondary text-lg text-secondary-content">
                Tickets
                <div className="badge badge-secondary-content">
                  {numberOfTickets}
                </div>
              </button>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-72 p-3 shadow"
            >
              <li>
                <p className="font-bold text-lg justify-center">
                  All my Tickets
                </p>
                <div className="divider"></div>
              </li>
              <div className="overflow-y-scroll max-h-screen">
                {allTickets?.map((ticket) => (
                  <li
                    key={ticket.id}
                    className="m-2 hover:bg-primary hover:text-primary-content outline outline-secondary rounded-btn"
                  >
                    <div className="flex justify-between items-center">
                      <button
                        className="badge badge-error ml-3 absolute left-0 top-2 text-md font-semibold text-error-content"
                        onClick={() => deleteTicket(Number(ticket.id))}
                      >
                        Delete
                      </button>

                      <p className="truncate max-w-24 pt-1">
                        {films.getFilm(ticket.film_id)?.title}
                      </p>
                      <p className="font-bold text-md w-1/3 text-right">
                        {films.schedule &&
                          formatIsoDate(
                            films.schedule.find(
                              (s) => s.id === ticket.schedule_id
                            )?.schedule_datetime as string
                          )}
                      </p>
                    </div>
                  </li>
                ))}
              </div>
            </ul>
          </div>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between font-bold text-md">
                  {auth.username ? auth.username : "Guest"}
                </a>
              </li>
              <li>
                {!auth.username && (
                  <Link to={"/login"} className="justify-between">
                    Login
                  </Link>
                )}
              </li>
              <li>
                {auth.username && (
                  <Link to={"/"}>
                    <span
                      className="justify-between"
                      onClick={() => {
                        auth.logout();
                        films.tickets = [];
                      }}
                    >
                      Logout
                    </span>
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <ThemeSwitcher />
        </div>

        {auth.isAdmin && (
          <div className="lg:hidden fixed bottom-4 left-4 z-50 ">
            <Link to="/admin-dashboard" className="btn btn-secondary">
              Admin Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
