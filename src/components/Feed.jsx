import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addFeed } from "../redux/features/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feedData = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  const apiUrl = import.meta.env.VITE_API_URL;

  const getFeed = async () => {
    if (feedData) return;
    try {
      const res = await axios.get(`${apiUrl}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  return feedData?.length > 0 ? (
    <UserCard user={feedData[0]} />
  ) : (
    "No card Found!"
  );
};

export default Feed;
