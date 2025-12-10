import React from "react";
import { Navigate } from "react-router";
import useRole from "../../hooks/useRole";
import ComponentLoading from "../../Components/ComponentLoading";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";

const CreateClub = () => {
  const { register, handleSubmit } = useForm();
  const { userRole, isLoading } = useRole();
  const { user } = useAuth();

  const handleCreateClub = (data) => {
    console.log(data);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <ComponentLoading />
      </div>
    );
  }

  if (userRole?.role !== "club_manager") {
    return <Navigate to="/becomeManager" />;
  }

  if (userRole?.role === "club_manager") {
    return (
      <div className="flex justify-center items-center my-5">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h3 className="font-bold text-center  mt-4 -mb-3 mx-3 text-pink-500">
            Create a club.
          </h3>
          <form onSubmit={handleSubmit(handleCreateClub)} className="card-body">
            <fieldset className="fieldset space-y-3">
              {/* club name */}
              <div>
                <label className="label">Club Name</label>
                <input
                  {...register("clubName")}
                  type="text"
                  className="input input-bordered"
                  placeholder="e.g., Wanderers Crew, Tech Explorers"
                />
              </div>

              {/* description */}
              <div>
                <label className="label">Club Description</label>
                <textarea
                  {...register("description")}
                  placeholder="Describe what your club is about..."
                  className="textarea textarea-primary"
                ></textarea>
              </div>

              {/* category */}
              <div>
                <label className="label">Club Category</label>
                <input
                  {...register("category")}
                  type="text"
                  className="input input-bordered"
                  placeholder="e.g., Photography, Sports, Tech"
                />
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

              <button className="btn btn-primary mt-4">Create Club</button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
};

export default CreateClub;
