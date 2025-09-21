import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addrequests, removeRequest } from "../redux/features/requestsSlice";

const Requests = () => {
  const requests = useSelector((state) => state.requests || []);
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_URL;
  const fetchConnections = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/requests/received`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(addrequests(response.data.data));
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleRequestReview = async (status, requestId) => {
    try {
      const response = await axios.post(
        `${apiUrl}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(removeRequest(requestId));
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  return (
    <div className="w-1/2 mx-auto bg-base-100">
      <h1 className="my-5 font-bold text-center">Connection Requests</h1>
      {requests.length > 0 ? (
        <ul className="list bg-base-100 rounded-box shadow-lg">
          {requests.map((request, index) => {
            const { _id, firstName, lastName, age, gender, photoUrl, about } =
              request.fromUserId;
            return (
              <li key={_id} className="list-row border-1 mt-5 bg-base-300">
                <div>
                  <img className="size-10 rounded-full" src={photoUrl} />
                </div>
                <div>
                  <div>{`${firstName} ${lastName}`}</div>
                  {gender && age && (
                    <div className="text-xs font-semibold opacity-60">
                      {age}, {gender}
                    </div>
                  )}
                  {about && (
                    <div className="text-xs font-semibold opacity-60">
                      {about}
                    </div>
                  )}
                </div>
                <button
                  className="btn btn-soft btn-error px-2 text-xs"
                  onClick={(e) => handleRequestReview("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-soft btn-secondary px-2 text-xs"
                  onClick={(e) => handleRequestReview("accepted", request._id)}
                >
                  Accept
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <h3 className="text-center bg-base-300">No Request Found!</h3>
      )}
    </div>
  );
};
export default Requests;
