import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";
import ComponentLoading from "../Components/ComponentLoading";

const ManagerRout = ({children}) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <ComponentLoading />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ManagerRout;
