import { useState } from "react";
import Login from "./Login";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TopFilms from "../components/TopFilms";
import Grid from "../components/layout/Grid";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  const userState = useSelector((state: any) => state.user.value);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <h1>Home</h1>
      <h1>{userState ? "Loggato" : "Sloggato"}</h1>
      <button className="btn btn-accent">Toccami</button>
      <Footer />
    </>
  );
}
