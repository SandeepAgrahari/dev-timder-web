import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../redux/features/connectionsSlice";

const Connections = () => {
  const connections = useSelector((state) => state.connections || []);
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_URL;
  const fetchConnections = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/connections`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(addConnections(response.data.data));
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  return (
    <div className="w-1/3 mx-auto bg-base-300">
      {connections.length > 0 ? (
        <ul className="list bg-base-100 rounded-box shadow-lg">
          {connections.map((connection, index) => {
            const { _id, firstName, lastName, age, gender, photoUrl, about } =
              connection;
            return (
              <li key={_id} className="list-row border-1 mt-5 bg-base-300">
                <div>
                  <img className="size-10 rounded-full" src={photoUrl} />
                </div>
                <div>
                  <div>{`${firstName} ${lastName}`}</div>
                  {gender && age && (
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {age}, {gender}
                    </div>
                  )}
                  {about && (
                    <div className="text-xs font-semibold opacity-60">
                      {about}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <h1>No Connection Found!</h1>
      )}
    </div>
  );
};
export default Connections;
