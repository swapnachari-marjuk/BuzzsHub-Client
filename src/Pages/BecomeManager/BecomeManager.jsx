import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const BecomeManager = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userData } = useQuery({
    queryKey: ["user", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });
  console.log(userData);
  return <div>from become manager</div>;
};

export default BecomeManager;
