import React, { Children } from "react";
import useRole from "../hooks/useRole";
import ComponentLoading from "../Components/ComponentLoading";
import { Navigate } from "react-router";
import { toast } from "react-toastify";

const AdminRout = ({ children }) => {
  const { userRole, isLoading } = useRole();
  if (isLoading) {
    return <ComponentLoading />;
  }
  if (userRole.role !== "admin") {
    toast.warn("Are you trying to access forbidden!");
    return <Navigate to={"/"} />;
  }

  return children;
};

export default AdminRout;
