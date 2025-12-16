import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import useRole from "../../hooks/useRole";
import ComponentLoading from "../../Components/ComponentLoading";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useImageUpload from "../../hooks/useImageUpload";

const CreateClub = () => {
  const [clubLoading, setClubLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { userRole, isLoading: userRoleLoading } = useRole();
  const { uploadImage } = useImageUpload();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleCreateClub = async (data) => {
    try {
      setClubLoading(true);

      const bannerImage = data.clubBanner?.[0];
      const bannerURL = await uploadImage(
        bannerImage,
        "https://i.ibb.co.com/k236cqNw/Adobe-Express-file.jpg"
      );

      const clubsData = {
        clubName: data.clubName,
        description: data.description,
        category: data.category,
        location: data.location,
        bannerURL,
        membershipFee: data.membershipFee,
        managerEmail: data.managerEmail,
        status: "pending",
      };

      const clubRes = await axiosSecure.post("/clubs", clubsData);
      console.log(clubRes);
      if (clubRes.data.insertedId) {
        toast.success("Club creation request has sent successfully.");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating the club.");
    } finally {
      setClubLoading(false);
    }
  };

  if (userRoleLoading) {
    return (
      <div className="flex justify-center items-center">
        <ComponentLoading />
      </div>
    );
  }

  if (userRole?.role !== "manager") {
    return <Navigate to="/" replace />;
  }

  if (userRole?.role === "manager") {
    return (
      <div className="flex justify-center items-center my-5">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h3 className="font-bold text-center  mt-4 -mb-3 mx-3 text-pink-500">
            Create a club
          </h3>
          <form onSubmit={handleSubmit(handleCreateClub)} className="card-body">
            <fieldset className="fieldset space-y-3">
              {/* club name */}
              <div>
                <label className="label">Club Name</label>
                <input
                  {...register("clubName", {
                    required: "Club name is required.",
                  })}
                  type="text"
                  className="input input-bordered"
                  placeholder="e.g., Wanderers Crew, Tech Explorers"
                />

                {errors.clubName && (
                  <p className="text-red-500 text-sm">
                    {errors.clubName.message}
                  </p>
                )}
              </div>

              {/* description */}
              <div>
                <label className="label">Club Description</label>
                <textarea
                  {...register("description", {
                    required: "Description is required!",
                  })}
                  placeholder="Describe what your club is about..."
                  className="textarea textarea-primary"
                ></textarea>
              </div>

              {/* category */}
              <div>
                <label className="label">Club Category</label>
                <select
                  {...register("category", { required: true })}
                  className="select select-bordered w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="Photography">Photography</option>
                  <option value="Sports">Sports</option>
                  <option value="Technology">Technology</option>
                  <option value="Music">Music</option>
                  <option value="Travel">Travel</option>
                  <option value="Art & Design">Art & Design</option>
                  <option value="Education">Education</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Social">Social & Community</option>
                </select>
              </div>

              {/* location */}
              <div>
                <label className="label">Club Location</label>
                <input
                  {...register("location")}
                  type="text"
                  className="input input-bordered"
                  placeholder="e.g., Dhaka, Chattogram, Sylhet"
                />
              </div>

              {/* banner image */}
              <div>
                <label className="label">Banner Image URL</label>
                <input
                  {...register("clubBanner")}
                  type="file"
                  className="file-input file-input-primary"
                />
              </div>

              {/* membership fee */}
              <div>
                <label className="label">Membership Fee (৳)</label>
                <input
                  {...register("membershipFee")}
                  type="number"
                  className="input input-bordered"
                  placeholder="0 for free"
                  min="0"
                  defaultValue={0}
                />
              </div>

              {/* manager email */}
              <div>
                <label className="label">Manager Email</label>
                <input
                  {...register("managerEmail")}
                  type="email"
                  className="input input-bordered"
                  defaultValue={user?.email}
                  readOnly
                  name="managerEmail"
                />
              </div>

              <button className="btn btn-primary mt-4">
                {clubLoading ? (
                  <span className="loading loading-infinity"></span>
                ) : (
                  "Create Club"
                )}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
};

export default CreateClub;
