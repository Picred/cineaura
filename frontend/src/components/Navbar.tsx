import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";

const handleButtonClick = (e: React.MouseEvent<HTMLElement>) => {
  e.preventDefault();
  console.log("Button clicked");

  // TODO: route to homepage with react
};

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-neutral">
        <div className="flex-1">
          <button
            className="btn btn-ghost text-xl text-neutral-content"
            onClick={handleButtonClick}
          >
            CineAura
          </button>
        </div>

        <div className="flex-none gap-4">
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
