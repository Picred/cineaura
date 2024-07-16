import { useState } from "react";
import Login from "./Login";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TopFilms from "../components/TopFilms";
import Grid from "../components/layout/Grid";

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [needRegistration, setNeedRegistration] = useState(false);

  const loginUser = () => {
    // setIsLogged(true);
    setNeedRegistration(true);
  };

  return (
    <>
      <Navbar />

      {needRegistration ? <h1>Registration</h1> : <Login isLogged={isLogged} />}

      <div className="btn btn-primary" onClick={loginUser}>
        Need Registration
      </div>
      <Footer />
    </>
  );
}
