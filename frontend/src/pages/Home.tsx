import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const userState = useSelector((state: any) => state.user.value);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <Link to="/register">
        <button className="btn btn-secondary font-semibold w-48 h-48">
          Registrati
        </button>
      </Link>
      <h1>Home</h1>
      {/* {console.log("COOKIE: " + document.cookie)} */}
      <h1>Username: {userState.username}</h1>
      <h1>Password:{userState.password}</h1>
      <Footer />
    </>
  );
};

export default Home;
