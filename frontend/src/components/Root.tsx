import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "../pages/Home";
import AdminDashboard from "../pages/AdminDashboard";
import FilmDetails from "../pages/FilmDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { socket } from "../utils/socket";
import { BookTicket } from "../pages/BookTicket";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/films/:id",
    element: <FilmDetails />,
  },
  {
    path: "/booking",
    element: <BookTicket />,
  },
  {
    path: "*",
    element: <h1>404</h1>,
  },
]);

/**
 * Root component sets up the main application structure including routing and socket event listeners.
 *
 * @returns {JSX.Element} The rendered Root component.
 */
const Root = (): JSX.Element => {
  /**
   * Sets up socket event listeners for "connect" and "disconnect" events.
   * Logs the socket connection status to the console.
   * Cleans up the event listeners when the component unmounts.
   *
   * Dependencies: []
   */
  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connected to server socket [${socket.id}]`);
    });

    socket.on("disconnect", () => {
      console.log(`Disconneted from server socket.`);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
      <ToastContainer />
    </React.StrictMode>
  );
};

export default Root;
