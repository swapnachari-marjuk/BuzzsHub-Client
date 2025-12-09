import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  // const [registerLoading, setRegisterLoading] = useState(false);
  const { createUser, updateUser, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const instanceAxios = useAxios();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    setLoading(true);
    // console.log(data);
    const displayName = data.userName;
    const email = data.userEmail;
    const password = data.userPassword;
    const pPhoto = data.userPhoto[0];

    try {
      const result = await createUser(email, password);

      const formData = new FormData();

      if (pPhoto) {
        formData.append("image", pPhoto);
      }

      const image_api_link = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_imgBB_apiKey
      }`;

      const userInfo = {
        email,
        displayName,
        photoURL: "https://i.ibb.co.com/rRBg9hyR/pp.jpg",
        role: "user",
        createdAt: new Date(),
      };

      if (formData.has("image")) {
        await axios.post(image_api_link, formData).then((res) => {
          const photoURL = res.data.data.display_url;
          // console.log(photoURL);
          userInfo.photoURL = photoURL;
        });
      } else {
        console.log("user doesn't give an url");
      }

      // updating user in firebase
      updateUser(displayName, userInfo.photoURL)
        .then(() => console.log("user also updated"))
        .catch((err) => console.log(err));

      // uploading user at mongodb
      instanceAxios
        .post("/users", userInfo)
        .then((res) => console.log(res, "user info uploaded in database."))
        .catch((err) => console.log(err));

      setLoading(false);
      navigate("/").then(toast.success("User logged in successfully."));
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
          <div className="relative">
            <label className="label">Password</label>
            <input
              {...register("userPassword")}
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
          </div>

          <button className="btn btn-primary mt-4">
            {loading ? (
              <span className="loading loading-infinity"></span>
            ) : (
              "Register"
            )}
          </button>
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
