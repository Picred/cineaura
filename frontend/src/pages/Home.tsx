import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useStore } from "zustand";
import { authStore } from "../zustand/AuthStore";

const Home = () => {
  const auth = useStore(authStore);

  return (
    <>
      <Navbar />
      <Link to="/register">
        <button className="btn btn-secondary font-semibold w-36 h-36">
          Registrati
        </button>
      </Link>
      <h1>Home</h1>
      <h1>Username: {auth.username}</h1>
      <Footer />
    </>
  );
};

export default Home;
