import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const { loginUser, loading, setLoading } = useAuth();

  const handleLogin = (data) => {
    setLoading(true);
    console.log(data);
    loginUser(data.email, data.password)
      .then((res) => {
        console.log(res);
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
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
              {...register("email", { required: true })}
              type="email"
              className="input"
              placeholder="Email"
            />
          </div>
          {/* password */}
          <div>
            <label className="label">Password</label>
            <input
              {...register("password", { required: true })}
              type="password"
              className="input"
              placeholder="Password"
            />
          </div>
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-primary mt-4">
            {loading ? (
              <span className="loading loading-infinity"></span>
            ) : (
              "Login"
            )}
          </button>
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
      </form>
    </div>
  );
};

export default Login;
