import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://buzzshubserver.vercel.app",
  // baseURL: "http://localhost:3000",
});
const useAxiosSecure = () => {
  const { user } = useAuth();
  useEffect(() => {
    const reqInterceptors = axiosSecure.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${user?.accessToken}`;
      return config;
    });

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptors);
    };
  }, [user]);
  return axiosSecure;
};

export default useAxiosSecure;
