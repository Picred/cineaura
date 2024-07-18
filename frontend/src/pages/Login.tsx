import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStore, useLoginAction } from "../redux/user.store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginAction = useLoginAction();

  const [user, setUser] = useState({ username: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(loginStore({ username: user.username, password: user.password }));

    user.username.trim().length > 0 &&
      user.password.trim().length > 0 &&
      loginAction({ username: user.username, password: user.password }).then(
        () => {
          navigate("/");
        }
      );
  };

  return (
    <>
      <Navbar />
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login</h1>
            <p className="py-6">
              Log in to your account to access all the features of CineAura.
            </p>
          </div>

          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow"
                    placeholder="Username"
                    required
                    onChange={(e) => {
                      setUser({ ...user, username: e.target.value });
                    }}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="password"
                    className="grow"
                    placeholder="Password"
                    required
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
              <Link to="/register" className="link link-hover text-sm">
                Don't have an account yet?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
