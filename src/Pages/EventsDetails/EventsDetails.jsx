import React from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import useAxios from "../../hooks/useAxios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import ComponentLoading from "../../Components/ComponentLoading";
import ErrorPage from "../ErrorPage/ErrorPage";

const EventsDetails = () => {
  const { eventsId: id } = useParams();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Event details
  const {
    data: event,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["eventDetails", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/events/${id}`);
      return res.data;
    },
  });

  // Registration status
  const { data: existingRegistration, refetch: refetchRegistration } = useQuery(
    {
      queryKey: ["registration", id, user?.email],
      queryFn: async () => {
        const registerRes = await axiosSecure.get(
          `/eventRegistration?eventId=${id}&participantEmail=${user?.email}&purpose=isExisting`
        );
        return registerRes.data;
      },
    }
  );

  console.log("existing register", existingRegistration);

  if (isLoading) return <ComponentLoading />;
  if (error) return <ErrorPage />;
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
    managerEmail,
  } = event;

  console.log(managerEmail);

  const handleRegisterFree = async () => {
    if (existingRegistration) {
      return toast.warning("You are already registered for this event.");
    }

    const registrationInfo = {
      eventId: id,
      eventName: title,
      clubId: clubID,
      participantEmail: user.email,
      status: "active",
      paymentId: "Free_Registration",
      eventManager: event.managerEmail,
    };

    try {
      const res = await axiosSecure.post(
        "/eventRegistration",
        registrationInfo
      );

      if (res.data.insertedId) {
        refetchRegistration();
        toast.success("Successfully registered for the event.");
      }
    } catch (error) {
      console.log(error);
      toast.error("something was wrong!");
    }
  };

  const handleRegisterPaid = async () => {
    if (existingRegistration) {
      return toast.warning("You are already registered for this event.");
    }

    const paymentInfo = {
      eventId: id,
      eventName: title,
      clubId: clubID,
      fee: eventFee,
      participantEmail: user.email,
      paymentType: "eventRegistration",
      eventManager: managerEmail,
      location,
    };

    try {
      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      toast.error("Unable to start payment.");
    }
  };

  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const feeDisplay = isPaid ? `$${eventFee}` : "Free";

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b pb-6 mb-6">
          <div>
            <p className="text-sm text-gray-500 uppercase">Location</p>
            <p className="text-lg font-semibold">{location}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 uppercase">Date</p>
            <p className="text-lg font-semibold">{formattedDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 uppercase">Fee</p>
            <p className="text-lg font-bold text-pink-600">{feeDisplay}</p>
          </div>
        </div>

        <section className="mb-8">
          <h3 className="text-xl font-bold mb-3">About the Event</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{description}</p>
        </section>

        <section className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Maximum Attendees:</strong> {maxAttendees || "Unlimited"}
            </li>
            <li>
              <strong>Organizing Club ID:</strong> {clubID}
            </li>
          </ul>
        </section>
      </div>

      <div className="text-center p-4">
        {user ? (
          <button
            disabled={!!existingRegistration}
            onClick={isPaid ? handleRegisterPaid : handleRegisterFree}
            className={`btn btn-primary text-xl font-bold rounded-full shadow-lg ${
              existingRegistration ? "btn-disabled" : ""
            }`}
          >
            {existingRegistration ? "Already Registered" : "Register Now"}
          </button>
        ) : (
          <Link
            to={"/login"}
            className="mt-6 md:mt-0 px-8 py-3 bg-pink-600 text-white font-bold rounded-lg shadow-lg hover:bg-pink-700 transition duration-300 transform hover:scale-105"
          >
            Login to Join
          </Link>
        )}
      </div>
    </div>
  );
};

export default EventsDetails;
