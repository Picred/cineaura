import ThemeSwitcher from "./ThemeSwitcher";
import { Link } from "react-router-dom";
import { authStore } from "../zustand/AuthStore";
import { useStore } from "zustand";
import { useState } from "react";

const Navbar = () => {
  const auth = useStore(authStore);
  const [searchFilm, setSearchFilm] = useState("");

  const handleSearchFilm = () => {
    setSearchFilm("");
    //TODO: get film by name
  };

  return (
    <div className="navbar bg-neutral p-4">
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="btn btn-primary text-xl">
          CineAura
        </Link>

        {auth.isAdmin && (
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1">
            <Link to="/admin-dashboard" className="btn btn-secondary text-xl">
              Admin Dashboard
            </Link>
          </div>
        )}

        <div className="flex items-center gap-2">
          <div className="join lg:flex lg:items-center">
            <input
              className="input input-bordered join-item"
              placeholder="Search"
              value={searchFilm}
              onChange={(e) => setSearchFilm(e.target.value)}
            />
            <button
              className="btn btn-outline join-item rounded-lg"
              onClick={handleSearchFilm}
            >
              Search film
            </button>
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
                      onClick={() => auth.logout()}
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
          <div className="lg:hidden fixed bottom-4 right-4 z-50">
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
