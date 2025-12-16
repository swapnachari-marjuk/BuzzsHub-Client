import React from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import ComponentLoading from "../../Components/ComponentLoading";
import { useParams } from "react-router";
import ErrorPage from "../ErrorPage/ErrorPage";

const EventsDetails = () => {
  const { eventsId: id } = useParams();
  const axios = useAxios();

  const {
    data: event,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["eventDetails", id],
    queryFn: async () => {
      const res = await axios.get(`/events/${id}`);
      return res.data;
    },
  });

  console.log(event);

  if (isLoading) {
    return <ComponentLoading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  if (!event) {
    return (
      <div className="text-center text-gray-500 p-8">
        No event found with ID: {id}
      </div>
    );
  }

  const {
    title,
    description,
    eventFee,
    location,
    date,
    isPaid,
    maxAttendees,
    clubID,
  } = event;

  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const feeDisplay = isPaid ? `$${eventFee}` : "Free";
  const feeText = isPaid ? "Registration Fee" : "Cost";

  return (
    <div className="container mx-auto max-w-4xl p-6 md:p-10">
      <header className="bg-white p-6 rounded-t-xl shadow-md border-b-4 border-pink-500">
        <div className="flex justify-between items-start">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            {title}
          </h1>
          <span
            className={`px-4 py-2 text-md font-bold rounded-full uppercase tracking-wider ${
              isPaid
                ? "bg-pink-100 text-pink-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {isPaid ? "Paid Event" : "Free"}
          </span>
        </div>
        <p className="text-xl text-pink-600 mt-2 font-semibold">{feeDisplay}</p>
      </header>

      <div className="bg-white p-6 md:p-8 shadow-md rounded-b-xl mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Key Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b pb-6 mb-6">
          {/* Location */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 uppercase">
              Location
            </span>
            <span className="text-lg font-semibold text-gray-800">
              {location}
            </span>
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 uppercase">
              Date
            </span>
            <span className="text-lg font-semibold text-gray-800">
              {formattedDate}
            </span>
          </div>

          {/* Fee */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-500 uppercase">
              {feeText}
            </span>
            <span className="text-lg font-bold text-pink-600">
              {feeDisplay}
            </span>
          </div>
        </div>

        <section className="mb-8">
          <h3 className="text-xl font-bold mb-3 text-gray-800">
            About the Event
          </h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {description}
          </p>
        </section>

        <section className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-3 text-gray-800">
            Additional Details
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <span className="font-semibold">Maximum Attendees:</span>{" "}
              {maxAttendees || "Unlimited"}
            </li>
            <li>
              <span className="font-semibold">Organizing Club ID:</span>{" "}
              {clubID}
            </li>
          </ul>
        </section>
      </div>

      <div className="text-center p-4">
        <button
          className="btn btn-primary text-xl font-bold rounded-full shadow-lg hover:bg-pink-700 transition-all duration-300"
          onClick={() => alert(`Registering for ${title}`)}
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default EventsDetails;
