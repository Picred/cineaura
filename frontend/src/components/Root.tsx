import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "../App";
import AdminDashboard from "../pages/AdminDashboard";
import FilmDetails from "../pages/FilmDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import socket from "../utils/socket";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    path: "*",
    element: <h1>404</h1>,
  },
]);

const Root = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connesso al server socket:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnesso dal server socket");
    });

    // Esempio di ricezione di un evento dal server
    socket.on("messaggio", (data) => {
      console.log("Messaggio ricevuto:", data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("messaggio");
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
