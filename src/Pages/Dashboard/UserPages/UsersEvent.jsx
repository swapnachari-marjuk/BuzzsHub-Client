import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const UsersEvent = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userEvents, isLoading } = useQuery({
    queryKey: ["usersClub", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/eventRegistration?participantEmail=${user?.email}&status=active`
      );
      return res.data;
    },
    enabled: !!user,
  });

  // date format
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  console.log(userEvents);

  if (isLoading)
    return <div className="p-10 text-center">Loading Clubs...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-pink-800">
          My Registered Events
        </h2>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          Total: {userEvents.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse">
          {/* Table Header */}
          <thead className="bg-pink-100 text-pink-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3 border-b">Event Title</th>
              <th className="px-4 py-3 border-b">Club ID</th>
              <th className="px-4 py-3 border-b">Registered Date</th>
              <th className="px-4 py-3 border-b">Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-pink-600">
            {userEvents.length > 0 ? (
              userEvents.map((event) => (
                <tr
                  key={event._id}
                  className="hover:bg-pink-50 transition-colors"
                >
                  <td className="px-4 py-4 border-b font-medium">
                    {event.eventName}
                  </td>
                  <td className="px-4 py-4 border-b text-sm">
                    {/* যদি ডাটাতে সরাসরি ক্লাবের নাম না থাকে তবে ID দেখানো হচ্ছে */}
                    <span className="bg-pink-200 px-2 py-1 rounded text-xs italic">
                      ID: {event.clubId.slice(-6)}...
                    </span>
                  </td>
                  <td className="px-4 py-4 border-b">
                    {formatDate(event.joinedAt)}
                  </td>
                  <td className="px-4 py-4 border-b text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        event.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-400">
                  No events found. Start registering now!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersEvent;
