import { useState } from "react";
import Login from "./Login";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TopFilms from "../components/TopFilms";
import Grid from "../components/layout/Grid";

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <Navbar />
      <Login />
      <Footer />
    </>
  );
}
