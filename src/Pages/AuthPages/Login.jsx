import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const [fbError, setFbError] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loginUser, loading, setLoading } = useAuth();

  const handleLogin = (data) => {
    console.log(data);
    loginUser(data.email, data.password)
      .then((res) => {
        setLoading(true);
        console.log(res);
        setLoading(false);
        navigate("/").then(() => toast.success("User logged in successfully."));
      })
      .catch((err) => {
        console.log(err);
        setFbError(err);
        setLoading(false);
      });
  };
  return (
    <div className="card w-full max-w-sm shrink-0">
      <form onSubmit={handleSubmit(handleLogin)} className="card-body">
        <fieldset className="fieldset">
          {/* user email  */}
          <div>
            <label className="label">Email</label>
            <input
              {...register("email", {
                required: true,
                pattern: /^[\w@.]{1,}?@[\w.]*\.[\w.]*$/,
              })}
              type="email"
              className="input"
              placeholder="Email"
            />

            {errors.email?.type === "required" && (
              <p className="bg-red-200 py-1 px-3 my-2 w-fit rounded-2xl text-red-500">
                ⚠ Required an email
              </p>
            )}

            {errors.email?.type === "pattern" && (
              <p className="bg-red-200 py-1 px-3 my-2 w-fit rounded-2xl text-red-500">
                ⚠ Required a valid email
              </p>
            )}
          </div>
          {/* password */}
          <div className="relative">
            <label className="label">Password</label>
            <input
              {...register("password", {
                required: true,
                pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
              })}
              type={showPass ? `text` : `password`}
              className="input"
              placeholder="Password"
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                setShowPass(!showPass);
              }}
              className="absolute right-6 top-8"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>

            {errors.password?.type === "required" && (
              <p className="bg-red-200 py-1 px-3 my-2 w-fit rounded-2xl text-red-500">
                ⚠ Required a valid password
              </p>
            )}

            {errors.password?.type === "pattern" && (
              <p className="bg-red-200 py-1 px-3 my-2 w-fit rounded-2xl text-red-500">
                ⚠ Enter a valid password.
              </p>
            )}
          </div>
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          {fbError && (
            <p className="bg-red-200 py-1 px-3 my-2 w-fit rounded-2xl text-red-500 text-center">
              Could not log in. Please check your email and password and try
              again
            </p>
          )}

          <button className="btn btn-primary mt-4">
            {loading ? (
              <span className="loading loading-infinity"></span>
            ) : (
              "Login"
            )}
          </button>
        </fieldset>
      </form>
      <div className="flex justify-center items-center -mt-4 mb-1">
        <GoogleLogin />
      </div>
      <div>
        Don't have an account?{" "}
        <Link
          className="underline decoration-pink-400 text-pink-400 hover:decoration-pink-500 hover:text-pink-500"
          to={"/register"}
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
