import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    console.log(data);
  };
  return (
    <div className="card w-full max-w-sm shrink-0 ">
      <form className="card-body" onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset">
          {/* user name */}
          <div>
            <label className="label">Full Name</label>
            <input
              {...register("userName")}
              type="text"
              className="input "
              placeholder="Your full name"
            />
          </div>

          {/* user photo */}
          <div>
            <label className="label">Your Photo</label>
            <input
              {...register("userPhoto")}
              type="file"
              className="file-input file-input-primary"
            />
          </div>

          {/* user email */}
          <div>
            <label className="label">Email</label>
            <input
              {...register("userEmail")}
              type="email"
              className="input"
              placeholder="Your email"
            />
          </div>

          {/* user password */}
          <div>
            <label className="label">Password</label>
            <input
              {...register("userPassword")}
              type="password"
              className="input"
              placeholder="Password"
            />
          </div>

          <button className="btn btn-primary mt-4">Register</button>
        </fieldset>
        <div>
          <span>
            Have an account?{" "}
            <Link
              className="underline decoration-pink-400 text-pink-400 hover:decoration-pink-500 hover:text-pink-500"
              to={"/login"}
            >
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
