import axios from "axios";
import { removeUserFromFeed } from "../redux/features/feedSlice";
import { useDispatch } from "react-redux";

const UserCard = ({ user, isProfile = false, handleEdit }) => {
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleUserCard = async (status, userId) => {
    try {
      const response = await axios.post(
        `${apiUrl}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(removeUserFromFeed(userId));
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex justify-center m-8">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img
            className="rounded-2xl"
            src={user.photoUrl}
            alt="Shoes"
            height="200px"
            width="250px"
          />
        </figure>
        <div className="card-body text-center">
          <h2 className="card-titlen text-center text-xl">
            {`${user.firstName} ${user.lastName}`}
            {isProfile && (
              <svg
                onClick={() => handleEdit(true)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 cursor-pointer hover:bg-violet-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            )}
          </h2>
          <p>
            {user.age} - {user.gender}
          </p>
          <p>{user.about}</p>
          {!isProfile && (
            <div className="card-actions justify-center m-4">
              <button
                className="btn btn-soft btn-error"
                onClick={() => handleUserCard("ignored", user._id)}
              >
                Ignore
              </button>
              <button
                className="btn btn-soft btn-success"
                onClick={() => handleUserCard("interested", user._id)}
              >
                Interested
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
