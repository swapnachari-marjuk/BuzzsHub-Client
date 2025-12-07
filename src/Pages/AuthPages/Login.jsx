import React from "react";
import { Link } from "react-router";

const Login = () => {
  return (
    <div className="card w-full max-w-sm shrink-0">
      <div className="card-body">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-primary mt-4">Login</button>
        </fieldset>
        <span>
          Don't have an account?{" "}
          <Link
            className="underline decoration-pink-400 text-pink-400 hover:decoration-pink-500 hover:text-pink-500"
            to={"/register"}
          >
            Register
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
