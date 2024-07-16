import Login from "./Login";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TopFilms from "../components/TopFilms";
import { useState } from "react";
import Grid from "../components/layout/Grid";

export default function Home() {
  // get films from db w/ useEffect()
  // TODO

  const [films, setFilms] = useState([]);
  // useEffect(() => {
  //   fetch("/api/films")
  //     .then((res) => res.json())
  //     .then((data) => setFilms([...films, data]));
  // }, []);

  return (
    <>
      <Navbar />
      {/* <TopFilms films={films} /> */}
      {/* <Grid>
        <h1>New</h1>
        <button type="button">hello</button>
      </Grid> */}
      <Login />
      <Footer />
    </>
  );
}
