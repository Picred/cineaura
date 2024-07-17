import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const userState = useSelector((state: any) => state.user.value);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <h1>Home</h1>
      <h1>Username: {userState.username}</h1>
      <h1>Password:{userState.password}</h1>
      <Footer />
    </>
  );
};

export default Home;
