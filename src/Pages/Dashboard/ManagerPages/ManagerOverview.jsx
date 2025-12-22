import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ComponentLoading from "../../../Components/ComponentLoading";
import { FaCalendarAlt, FaHandshake } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const ManagerOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: overviewData, isLoading } = useQuery({
    queryKey: ["managerOverview"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/managerOverview?managerEmail=${user?.email}`
      );
      return res.data;
    },
  });
  // console.log(overviewData);
  if (isLoading) {
    return <ComponentLoading />;
  }
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">Manager Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="stat bg-white shadow-md rounded-lg border-l-4 border-blue-500">
          <div className="stat-figure text-blue-500 text-3xl">
            <FaHandshake />
          </div>
          <div className="stat-title font-semibold">Total Clubs</div>
          <div className="stat-value text-blue-600">
            {overviewData?.managersClubs}
          </div>
        </div>

        <div className="stat bg-white shadow-md rounded-lg border-l-4 border-purple-500">
          <div className="stat-figure text-purple-500 text-3xl">
            <FaCalendarAlt />
          </div>
          <div className="stat-title font-semibold">Total Events</div>
          <div className="stat-value text-purple-600">
            {overviewData?.managersEvents}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerOverview;
