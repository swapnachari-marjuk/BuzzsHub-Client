import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import ComponentLoading from "../../../Components/ComponentLoading";
import { Link } from "react-router";

const UserUpEv = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: upcomingEvents, isLoading } = useQuery({
    queryKey: ["member-events", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/member-upcoming-events?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(upcomingEvents);

  if (isLoading) {
    return <ComponentLoading />;
  }
  return (
    <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-pink-50">
      <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
        📅 Upcoming Events from Your Clubs
      </h3>

      <div className="overflow-x-auto">
        <table className="table w-full border-separate border-spacing-y-2">
          {/* Table Head */}
          <thead>
            <tr className="text-pink-600 border-b border-pink-100">
              <th className="bg-pink-50 rounded-l-lg py-4 px-4 text-left">
                Event Title
              </th>
              <th className="bg-pink-50 py-4 px-4 text-left">Date</th>
              <th className="bg-pink-50 py-4 px-4 text-left">Location</th>
              <th className="bg-pink-50 py-4 px-4 text-left">Fee</th>
              <th className="bg-pink-50 rounded-r-lg py-4 px-4 text-center">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <tr
                  key={event._id}
                  className="hover:bg-pink-50/50 transition-colors group"
                >
                  <td className="py-4 px-4 border-b border-gray-50 font-medium text-gray-700">
                    {event.title}
                  </td>
                  <td className="py-4 px-4 border-b border-gray-50 text-gray-600 italic">
                    {new Date(event.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-4 px-4 border-b border-gray-50 text-gray-600">
                    📍 {event.location}
                  </td>
                  <td className="py-4 px-4 border-b border-gray-50">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        event.isPaid
                          ? "bg-orange-100 text-orange-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {event.isPaid ? `$${event.eventFee}` : "Free"}
                    </span>
                  </td>
                  <td className="py-4 px-4 border-b border-gray-50 text-center">
                    <Link
                      to={`/events/${event._id}`}
                      className="bg-linear-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg hover:scale-105 transition-all"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">
                  No upcoming events found for your clubs.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserUpEv;
