import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useImageUpload from "../../../hooks/useImageUpload";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const UpdateClub = ({ data: club, refetch, modalRef }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      clubName: club.clubName,
      description: club.description,
      location: club.location,
      category: club.category,
    },
  });

  // if data changed, default values are also changed
  useEffect(() => {
    reset({
      clubName: club.clubName,
      description: club.description,
      location: club.location,
      category: club.category,
    });
  }, [club, reset]);

  const axiosSecure = useAxiosSecure();
  const { uploadImage } = useImageUpload(club.bannerURL);
  console.log(club);

  const handleClubUpdate = async (data) => {
    try {
      const bannerImage = data.clubBanner?.[0];
      const bannerURL = await uploadImage(bannerImage);

      const clubUpdate = {
        clubName: data.clubName,
        bannerURL,
        category: data.category,
        description: data.description,
        location: data.location,
      };
      await axiosSecure.patch(`/clubs/${club._id}`, clubUpdate);

      refetch();
      toast.success("Club updated successfully");
      modalRef.current.close();
    } catch (error) {
      console.log(error);
      toast.error("Something else!");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleClubUpdate)} className="card-body">
        <fieldset className="fieldset">
          {/* club name */}
          <div>
            <label className="label">Club Name</label>
            <input
              {...register("clubName")}
              type="text"
              className="input input-bordered"
              defaultValue={club.clubName}
              placeholder="e.g., Wanderers Crew, Tech Explorers"
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

          {/* description */}
          <div>
            <label className="label">Club Description</label>
            <textarea
              {...register("description")}
              placeholder="Describe what your club is about..."
              defaultValue={club.description}
              className="textarea textarea-primary"
            ></textarea>
          </div>

          {/* location */}
          <div>
            <label className="label">Club Location</label>
            <input
              {...register("location")}
              type="text"
              className="input input-bordered"
              defaultValue={club.location}
              placeholder="e.g., Dhaka, Chattogram, Sylhet"
            />
          </div>

          {/* category */}
          <div>
            <label className="label">Club Category</label>
            <input
              {...register("category")}
              type="text"
              className="input input-bordered"
              defaultValue={club.category}
              placeholder="e.g., Photography, Sports, Tech"
            />
          </div>

          <button className="btn btn-primary mt-4">Update</button>
        </fieldset>
      </form>
    </div>
  );
};

export default UpdateClub;
