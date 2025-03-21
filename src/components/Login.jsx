import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("sandeep@gmail.com");
  const [password, setPassword] = useState("Sandeep@123");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;
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
      setError("");
      return navigate("/");
    } catch (e) {
      setError(e?.response?.data);
      console.log(e);
    }
  };
  return (
    <div className="flex justify-center m-30">
      <div className="bg-base-300 card card-border bg-base-100 w-96">
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
          <label className="fieldset-label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="fieldset-label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button className="btn btn-neutral mt-4" onClick={handleLogin}>
            Login
          </button>
        </fieldset>
      </div>
    </div>
  );
};

export default Login;
