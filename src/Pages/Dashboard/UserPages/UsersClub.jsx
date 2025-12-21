import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
const UsersClub = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userClubs, isLoading } = useQuery({
    queryKey: ["usersClub", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/clubMembers?participantEmail=${user?.email}&status=active`
      );

      return res.data;
    },
  });

  // date format
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  //   expiry date
  const getExpiryDate = (joinedAt) => {
    const date = new Date(joinedAt);
    date.setFullYear(date.getFullYear() + 1);
    return formatDate(date);
  };

  console.log(userClubs);
  if (isLoading)
    return <div className="p-10 text-center">Loading Clubs...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        My Registered Clubs
      </h2>

      {userClubs.length === 0 ? (
        <p className="text-gray-500">You haven't joined any clubs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userClubs.map((club) => (
            <div
              key={club._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-5"
            >
              {/* Club Name */}
              <h3 className="text-xl font-semibold text-pink-600 mb-2">
                {club.clubName}
              </h3>

              <div className="space-y-2 text-gray-600">
                <p className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">Location:</span>
                  {club.location || "Online"}
                </p>

                {/* Status */}
                <p className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">Status:</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${
                      club.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {club.status}
                  </span>
                </p>

                {/* Expiry Date */}
                <p className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">Expires on:</span>
                  <span className="text-orange-600 font-medium">
                    {getExpiryDate(club.joinedAt)}
                  </span>
                </p>
              </div>

              {/* Action Button (Optional) */}
              <Link
                to={`/clubDetails/${club.clubId}`}
                className="btn btn-primary"
              >
                View Club Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersClub;
