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

const Root = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connected to server socket [${socket.id}]`);
    });

    socket.on("disconnect", () => {
      console.log(`Disconneted from server socket [${socket.id}]`);
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
