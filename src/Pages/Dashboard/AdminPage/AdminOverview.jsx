import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ComponentLoading from "../../../Components/ComponentLoading";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import UsersStat from "../../../Components/Stats/UsersStat";
import EventsStat from "../../../Components/Stats/EventsStat";
import ClubsStat from "../../../Components/Stats/ClubsStat";
import MembersStat from "../../../Components/Stats/MembersStat";
import RejectedClubsStat from "../../../Components/Stats/RejectedClubsStat";
import PendingClubStat from "../../../Components/Stats/PendingClubStat";

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
  const pendingClubs =
    clubsByStatus?.find((c) => c._id === "pending")?.count || 0;
  const rejectedClubs =
    clubsByStatus?.find((c) => c._id === "rejected")?.count || 0;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">Admin Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users */}
        <UsersStat usersCount={usersCount} />

        {/* Total Events */}
        <EventsStat eventsCount={eventsCount} />

        {/* Total ClubMembers */}
        <MembersStat membersCount={membersCount} />

        {/* Approved Clubs */}
        <ClubsStat approvedClubs={approvedClubs} />

        {/* pending Clubs */}
        <PendingClubStat pendingClubs={pendingClubs} />

        {/* Rejected Clubs */}
        <RejectedClubsStat rejectedClubs={rejectedClubs} />
      </div>
    </div>
  );
};

export default AdminOverview;
