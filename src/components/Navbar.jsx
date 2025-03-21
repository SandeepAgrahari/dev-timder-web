import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../redux/features/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoRedirectUrl = user ? "/" : "/login";
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleLogout = async () => {
    try {
      await axios.post(`${apiUrl}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to={logoRedirectUrl} className="btn btn-ghost text-xl">
          👩‍💻 Dev Tinder
        </Link>
      </div>
      {user && (
        <div className="flex gap-2 mx-5">
          <span className="flex items-center">{`Welcom ${user.firstName}`}</span>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User Photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
