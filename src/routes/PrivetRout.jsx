import React from "react";
import useAuth from "../hooks/useAuth";
import ComponentLoading from "../Components/ComponentLoading";
import { Navigate } from "react-router";

const PrivetRout = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <ComponentLoading />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivetRout;
