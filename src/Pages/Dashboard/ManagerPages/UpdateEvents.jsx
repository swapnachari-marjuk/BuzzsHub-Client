import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateEvents = ({ data: event, refetch, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      maxAttendees: event.maxAttendees,
      eventFee: event.eventFee,
      isPaid: event.isPaid ? "true" : "false", // ei line
    },
  });

  useEffect(() => {
    reset({
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      maxAttendees: event.maxAttendees,
      eventFee: event.eventFee,
      isPaid: event.isPaid ? "true" : "false",
    });
  }, [event, reset]);

  const axiosSecure = useAxiosSecure();

  const isPaid = useWatch({
    control,
    name: "isPaid",
  });

  const handleEventUpdate = async (formData) => {
    const isPaidBoolean = formData.isPaid === "true";

    const eventUpdate = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      location: formData.location,
      maxAttendees: Number(formData.maxAttendees),
      eventFee: isPaidBoolean ? Number(formData.eventFee) : 0,
      isPaid: isPaidBoolean,
    };

    console.log(eventUpdate);

    try {
      const res = await axiosSecure.patch(`/events/${event._id}`, eventUpdate);
      console.log(res);

      if (res.data.modifiedCount) {
        refetch();
        toast.success("Event updated successfully!");
        onClose();
      } else {
        toast.success("Nothing to update!");
        onClose();
      }
    } catch (error) {
      console.error("Update Error:", error);
      onClose();
      toast.error("Failed to update event. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-lg p-4 max-h-[90vh] overflow-y-auto">
      <form onSubmit={handleSubmit(handleEventUpdate)} className="card-body">
        <h3 className="text-2xl font-bold text-center mb-4">
          Edit Event: {event.title}
        </h3>

        <fieldset className="grid grid-cols-1 gap-4">
          {/* Title */}
          <div className="form-control">
            <label className="label">Event Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g., Annual Tech Meetup"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Describe the event details..."
              className="textarea textarea-bordered h-24 w-full"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Date */}
          <div className="form-control">
            <label className="label">Date</label>
            <input
              {...register("date", { required: "Date is required" })}
              type="date"
              className="input input-bordered w-full"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Location */}
          <div className="form-control">
            <label className="label">Location</label>
            <input
              {...register("location", { required: "Location is required" })}
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g., City Hall, Online"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Max Attendees */}
          <div className="form-control">
            <label className="label">Max Attendees</label>
            <input
              {...register("maxAttendees", {
                required: "Max attendees is required",
                min: { value: 1, message: "Must be at least 1" },
              })}
              type="number"
              className="input input-bordered w-full"
              placeholder="e.g., 50"
            />
            {errors.maxAttendees && (
              <p className="text-red-500 text-sm mt-1">
                {errors.maxAttendees.message}
              </p>
            )}
          </div>

          {/* isPaid Radio */}
          <div className="form-control">
            <label className="label">Paid Event?</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  {...register("isPaid", { required: true })}
                  type="radio"
                  value="true"
                  className="radio radio-primary"
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  {...register("isPaid", { required: true })}
                  type="radio"
                  value="false"
                  className="radio radio-primary"
                />
                No
              </label>
            </div>
          </div>

          {isPaid === "true" && (
            <div>
              <label className="label">Event Fee (BDT)</label>
              <input
                type="number"
                {...register("eventFee", {
                  required: "Fee is required for paid events",
                  min: 0,
                })}
                className="input input-bordered"
                placeholder="e.g. 500"
              />
              {errors.eventFee && (
                <p className="text-red-500 text-sm">
                  {errors.eventFee.message}
                </p>
              )}
            </div>
          )}

          {/* Submission Button */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Update Event
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default UpdateEvents;
