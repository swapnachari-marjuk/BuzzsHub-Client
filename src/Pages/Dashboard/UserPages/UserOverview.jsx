import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import OverviewState from "./OverviewState";

const UserOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: overviewData } = useQuery({
    queryKey: ["usersOverview", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/memberOverview?memberEmail=${user?.email}`
      );
      return res.data;
    },
  });

  return (
    <div>
      {/* welcome */}
      <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-pink-100">
        <h1 className="text-2xl font-semibold text-pink-700">
          Welcome to Your Dashboard 👋
        </h1>
        <p className="mt-2 text-gray-600 max-w-xl">
          Discover exciting clubs, join events that match your interests, and
          connect with people who share your passion. Your next community starts
          here.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <div className="px-4 py-2 rounded-full bg-pink-50 text-pink-600 text-sm font-medium">
            Explore Clubs
          </div>
          <div className="px-4 py-2 rounded-full bg-pink-50 text-pink-600 text-sm font-medium">
            Join Events
          </div>
          <div className="px-4 py-2 rounded-full bg-pink-50 text-pink-600 text-sm font-medium">
            Send Join Requests
          </div>
        </div>
        <OverviewState overviewData={overviewData} />
      </div>

      {/* club and events overview  */}
    </div>
  );
};

export default UserOverview;
