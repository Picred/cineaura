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
