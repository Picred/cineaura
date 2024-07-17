import ThemeSwitcher from "./ThemeSwitcher";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user.store";

const Navbar = () => {
  const userState = useSelector((state: any) => state.user.value);
  const dispatch = useDispatch();

  return (
    <>
      <div className="navbar bg-neutral">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            CineAura
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                {!userState.username && (
                  <Link to={"/login"} className="justify-between">
                    Login
                  </Link>
                )}
              </li>

              <li>
                {userState.username && (
                  <Link to={"/"}>
                    <span
                      className="justify-between"
                      onClick={() => dispatch(logout())}
                    >
                      Logout
                    </span>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="navbar bg-neutral">
        <div className="flex-1">
          <Link to={"/"}>
            <button className="btn btn-ghost text-xl text-neutral-content">
              CineAura
            </button>
          </Link>
        </div>

        <div className="flex-none gap-4">
          {!userState.username && (
            <Link to={"/login"}>
              <button className="btn btn-ghost text-xl text-neutral-content">
                Login
              </button>
            </Link>
          )}

          {userState.username && (
            <Link to={"/"}>
              <button
                className="btn btn-ghost text-xl text-neutral-content"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(logout());
                }}
              >
                Logout
              </button>
            </Link>
          )}
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </>
  );
};

export default Navbar;
