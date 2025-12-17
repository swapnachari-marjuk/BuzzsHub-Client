import React from "react";
import useAuth from "../hooks/useAuth";
import ComponentLoading from "../Components/ComponentLoading";
import { Navigate, useLocation } from "react-router";

const PrivetRout = ({ children }) => {
  const location = useLocation();
  console.log(location);
  const { user, loading } = useAuth();
  if (loading) {
    return <ComponentLoading />;
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/login" />;
  }

  return children;
};

export default PrivetRout;
