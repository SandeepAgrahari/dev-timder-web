import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
