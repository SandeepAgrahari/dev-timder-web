import { useState } from "react";

const Login = () => {
  useState({});
  return (
    <div className="flex justify-center m-30">
      <div className="bg-base-300 card card-border bg-base-100 w-96">
        <fieldset className="fieldset w-auto bg-base-300 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend text-lg">Login</legend>

          <label className="fieldset-label">Email</label>
          <input type="email" className="input" placeholder="Email" />

          <label className="fieldset-label">Password</label>
          <input type="password" className="input" placeholder="Password" />

          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </div>
    </div>
  );
};

export default Login;
