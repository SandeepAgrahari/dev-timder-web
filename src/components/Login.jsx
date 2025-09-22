import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showLoginPage, setShowLoginPage] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/signup`,
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data?.data));
      return navigate("/profile");
    } catch (e) {
      setError(e?.response?.data);
      console.log(e);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (e) {
      setError(e?.response?.data);
      console.log(e);
    }
  };

  const handleChange = (e) => {
    setError("");
    const { name, value } = e.target;
    if (name === "firstName") {
      setFirstName(value);
    }
    if (name === "lastName") {
      setLastName(value);
    }
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <div className="flex justify-center m-30">
      <div className="bg-base-300 card card-border w-96">
        <fieldset className="fieldset w-auto bg-base-300 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend text-lg">Login</legend>
          {error && (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{`Error - ${error}`}</span>
            </div>
          )}
          {!showLoginPage && (
            <>
              <label className="fieldset-label">First Name</label>
              <input
                type="text"
                className="input w-auto"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={(e) => handleChange(e)}
              />
              <label className="fieldset-label">Last Name</label>
              <input
                type="text"
                className="input w-auto"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={(e) => handleChange(e)}
              />
            </>
          )}
          <label className="fieldset-label">Email</label>
          <input
            type="email"
            className="input w-auto"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => handleChange(e)}
          />

          <label className="fieldset-label">Password</label>
          <input
            type="password"
            className="input w-auto"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => handleChange(e)}
          />

          <button
            className="btn btn-neutral mt-4"
            onClick={showLoginPage ? handleLogin : handleSignUp}
          >
            {showLoginPage ? "Login" : "SignUp"}
          </button>
          <p className="mt-10 text-center text-sm/6 text-gray-400">
            {showLoginPage ? "Not a member?" : "Already registred user?"}
            <a
              href="#"
              onClick={() => setShowLoginPage((value) => !value)}
              className="font-semibold text-indigo-400 hover:text-pink-400"
            >
              <span className="m-2">{showLoginPage ? "Sign up" : "Login"}</span>
            </a>
          </p>
        </fieldset>
      </div>
    </div>
  );
};

export default Login;
