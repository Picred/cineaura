import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useStore } from "zustand";
import { authStore } from "../zustand/AuthStore";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../utils/notify";

/**
 * The Register component allows users to create a new account. It uses Zustand for state management
 * and provides a form for users to enter their username, password, and repeat password. Upon successful
 * registration, the user is redirected to the login page.
 *
 * @returns {JSX.Element} The rendered Register component.
 */
const Register = (): JSX.Element => {
  const auth = useStore(authStore);
  const navigate = useNavigate();

  const [disabledForm, setDisabledForm] = useState(true);
  const [user, setUser] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });

  /**
   * Enables or disables the form submit button based on form validation.
   */
  useEffect(() => {
    if (
      user.username.trim().length > 0 &&
      user.password.trim().length > 0 &&
      user.password === user.repeatPassword
    ) {
      setDisabledForm(false);
    } else {
      setDisabledForm(true);
    }
  }, [user.username, user.password, user.repeatPassword]);

  /**
   * Handles the form submission for registering a new user.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    auth
      .register({ username: user.username, password: user.password })
      .then(() => {
        notify("Successfully registered!", "success", auth.theme as string);
        navigate("/login");
      })
      .catch((error) => {
        notify(error, "error", auth.theme as string);
      });
  };

  /**
   * Handles changes to the form inputs.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <Navbar />
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Register to your account to access all the features of CineAura.
            </p>
          </div>

          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body gap-4" onSubmit={handleSubmit}>
              {disabledForm && (
                <>
                  <div
                    role="alert"
                    className="alert alert-warning font-semibold"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 shrink-0 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>There are invalid fields!</span>
                  </div>
                </>
              )}

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
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
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
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
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
                    name="repeatPassword"
                    placeholder="Repeat password"
                    onChange={(e) => {
                      setUser({ ...user, repeatPassword: e.target.value });
                    }}
                  />
                </label>
              </div>
              <div className="form-control mt-2">
                <button
                  type="submit"
                  disabled={disabledForm}
                  className="btn btn-primary"
                >
                  Register
                </button>
              </div>
              <Link to="/login" className="link link-hover text-sm">
                Already have an account?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
