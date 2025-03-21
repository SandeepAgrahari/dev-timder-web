import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const logoRedirectUrl = user ? "/" : "/login";
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
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
