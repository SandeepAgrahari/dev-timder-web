import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
