import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ComponentLoading from "../../../Components/ComponentLoading";
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaUsers, FaUserTie } from "react-icons/fa";

const AdminOverview = () => {
  console.log("Admin overview page is loaded");
  const axiosSecure = useAxiosSecure();
  const { data: overviewData, isLoading } = useQuery({
    queryKey: ["adminOverview"],
    queryFn: async () => {
      const res = await axiosSecure.get("/adminOverview");
      return res.data;
    },
  });
  console.log(overviewData);

  if (isLoading) {
    return <ComponentLoading />;
  }

  const { usersCount, eventsCount, membersCount, clubsByStatus } =
    overviewData || {};

  const approvedClubs =
    clubsByStatus?.find((c) => c._id === "approved")?.count || 0;
  const rejectedClubs =
    clubsByStatus?.find((c) => c._id === "rejected")?.count || 0;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">Admin Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="stat bg-white shadow-md rounded-lg border-l-4 border-blue-500">
          <div className="stat-figure text-blue-500 text-3xl">
            <FaUsers />
          </div>
          <div className="stat-title font-semibold">Total Users</div>
          <div className="stat-value text-blue-600">{usersCount}</div>
        </div>

        {/* Total Events */}
        <div className="stat bg-white shadow-md rounded-lg border-l-4 border-purple-500">
          <div className="stat-figure text-purple-500 text-3xl">
            <FaCalendarAlt />
          </div>
          <div className="stat-title font-semibold">Events</div>
          <div className="stat-value text-purple-600">{eventsCount}</div>
        </div>

        {/* Total ClubMembers */}
        <div className="stat bg-white shadow-md rounded-lg border-l-4 border-orange-500">
          <div className="stat-figure text-orange-500 text-3xl">
            <FaUserTie />
          </div>
          <div className="stat-title font-semibold">Club Members</div>
          <div className="stat-value text-orange-600">{membersCount}</div>
        </div>


        {/* Approved Clubs */}
        <div className="stat bg-white shadow-md rounded-lg border-l-4 border-green-500">
          <div className="stat-figure text-green-500 text-3xl">
            <FaCheckCircle />
          </div>
          <div className="stat-title font-semibold">Approved Clubs</div>
          <div className="stat-value text-green-600">{approvedClubs}</div>
        </div>

        {/* Rejected Clubs */}
        <div className="stat bg-white shadow-md rounded-lg border-l-4 border-red-500">
          <div className="stat-figure text-red-500 text-3xl">
            <FaTimesCircle />
          </div>
          <div className="stat-title font-semibold">Rejected Clubs</div>
          <div className="stat-value text-red-600">{rejectedClubs}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
