import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { addUser } from "../redux/features/userSlice";
import Navbar from "./Navbar";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const apiUrl = import.meta.env.VITE_API_URL;

  const getUser = async () => {
    try {
      if (userData) {
        return;
      }
      const res = await axios.get(`${apiUrl}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (e) {
      if (e.status === 401) {
        navigate("/login");
      }
      console.log(e);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
