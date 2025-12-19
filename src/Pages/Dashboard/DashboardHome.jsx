import React from "react";
import useRole from "../../hooks/useRole";
import AdminOverview from "./AdminPage/AdminOverview";
import ManagerOverview from "./ManagerPages/ManagerOverview";
import UserOverview from "./UserPages/UserOverview";

const DashboardHome = () => {
  const { userRole } = useRole();

  if (userRole?.role === "user") {
    return <UserOverview />;
  }

  if (userRole?.role === "manager") {
    return <ManagerOverview />;
  }
  if (userRole?.role === "admin") {
    return <AdminOverview />;
  }
};

export default DashboardHome;
