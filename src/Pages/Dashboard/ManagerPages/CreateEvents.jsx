import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const CreateEvents = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const today = new Date().toISOString().split("T")[0];
  //   console.log(today);

  const isPaid = useWatch({
    control,
    name: "isPaid",
  });

  const onSubmit = (data) => {
    data.managerEmail = user?.email;
    axiosSecure
      .post(`/events/${id}`, data)
      .then((res) => {
        console.log(res, "hello response");
        if (res.data.result.insertedId) {
          toast.success("Created an event.");
          navigate("/dashboard");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-4">Create Event</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            className="w-full input input-bordered"
            placeholder="Event title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full textarea textarea-bordered"
            placeholder="Event description"
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            min={today}
            className="w-full input input-bordered"
            {...register("date", {
              required: "Date is required",
            })}
          />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            className="w-full input input-bordered"
            placeholder="Event location"
            {...register("location", { required: "Location is required" })}
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Is Paid */}
        <div className="flex items-center gap-2">
          <input type="checkbox" className="checkbox" {...register("isPaid")} />
          <label className="font-medium">Paid Event</label>
        </div>

        {/* Event Fee */}
        {isPaid && (
          <div>
            <label className="block mb-1 font-medium">Event Fee</label>
            <input
              type="number"
              className="w-full input input-bordered"
              placeholder="Event fee"
              {...register("eventFee", {
                required: "Event fee is required for paid events",
                min: { value: 1, message: "Fee must be greater than 0" },
              })}
            />
            {errors.eventFee && (
              <p className="text-red-500 text-sm">{errors.eventFee.message}</p>
            )}
          </div>
        )}

        {/* Max Attendees */}
        <div>
          <label className="block mb-1 font-medium">Max Attendees</label>
          <input
            type="number"
            className="w-full input input-bordered"
            placeholder="Maximum attendees"
            {...register("maxAttendees", {
              required: "Max attendees is required",
              min: { value: 1, message: "Must be at least 1" },
            })}
          />
          {errors.maxAttendees && (
            <p className="text-red-500 text-sm">
              {errors.maxAttendees.message}
            </p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvents;
