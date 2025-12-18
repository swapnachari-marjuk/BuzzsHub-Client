import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const ClubDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: clubDetails } = useQuery({
    queryKey: ["clubDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${id}`);
      return res.data;
    },
  });

  // Checking a existing user
  const { data: existingMembership, refetch: refetchMembershipStatus } =
    useQuery({
      queryKey: ["membership", id, user.email],
      queryFn: async () => {
        const membershipRes = await axiosSecure.get(
          `/clubMembers?clubId=${id}&participantEmail=${user.email}`
        );
        console.log("existing membership", membershipRes);
        return membershipRes.data;
      },
    });

  const {
    _id,
    bannerURL,
    clubName,
    description,
    category,
    location,
    membershipFee,
    managerEmail,
  } = clubDetails || {};

  const handleJoinFree = () => {
    const joinInfo = {
      clubName,
      clubId: id,
      participantEmail: user.email,
      status: "active",
      paymentId: "Free_Join",
    };

    if (existingMembership) {
      return toast.warning("User already joined to this Club.");
    }

    axiosSecure
      .post("/clubMembers", joinInfo)
      .then((res) => {
        if (res.data.insertedId) {
          refetchMembershipStatus();
          toast.success("Successfully joined.");
        }
        console.log(res);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.log(err);
      });

    console.log(joinInfo);
  };

  const handleJoinPaid = async () => {
    const paymentInfo = {
      clubId: _id,
      clubName,
      fee: membershipFee,
      participantEmail: user.email,
      paymentType: "clubMembership",
    };

    if (existingMembership) {
      return toast.warn("User already have joined to this club.");
    }

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden lg:m-10 md:m-5 m-2">
      {/* Banner Section */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden">
        <img
          src={bannerURL}
          alt={`${clubName} Banner`}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/10 flex items-end p-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            {clubName || "Club Name Not Found"}
          </h1>
        </div>
      </div>

      <div className="p-6 sm:p-10">
        {/* Club Meta Info and Join Button */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-6 mb-6">
          <div className="space-y-3">
            <span className="inline-block bg-pink-100 text-pink-700 text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {category || "General"}
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-600">
              <p className="flex items-center">
                <FaMapMarkerAlt className="text-pink-600 mr-2" />
                {location || "Online/Various"}
              </p>

              <p className="flex items-center">
                <FaDollarSign className="text-pink-600 mr-2" />
                {membershipFee > 0 ? `$${membershipFee}/Year` : "Free"}
              </p>

              <p className="flex items-center">
                <FaEnvelope className="text-pink-600 mr-2" />
                <a href={`mailto:${managerEmail}`} className="hover:underline">
                  Manager
                </a>
              </p>
            </div>
          </div>

          <button
            disabled={existingMembership ? true : false}
            onClick={
              membershipFee > 0 ? () => handleJoinPaid() : handleJoinFree
            }
            className={
              existingMembership
                ? "btn btn-disabled"
                : "mt-6 md:mt-0 px-8 py-3 bg-pink-600 text-white font-bold rounded-lg shadow-lg hover:bg-pink-700 transition duration-300 transform hover:scale-105"
            }
          >
            {existingMembership ? "Already joined" : "Join"}
          </button>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            About the Club
          </h2>
          <p className="text-gray-700 whitespace-pre-wrap">
            {description ||
              "No detailed description provided for this club. Join us to find your people and live your moments!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
