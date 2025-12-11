import React from "react";
import useRole from "../../hooks/useRole";

const DashboardHome = () => {
  const { userRole } = useRole();

  if (userRole?.role === "user") {
    return <p className="font-bold">Dashboard for user</p>;
  }

  if (userRole?.role === "club_manager") {
    return <p className="font-bold">Dashboard for manager</p>;
  }
  if (userRole?.role === "admin") {
    return <p className="font-bold">Dashboard for user</p>;
  }

  return <div></div>;
};

export default DashboardHome;
