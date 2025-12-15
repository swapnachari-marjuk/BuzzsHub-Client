import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const MyEvents = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const { data: events } = useQuery({
    queryKey: ["events", user.email],
    queryFn: async () => {
      const res = await axios.get(`/events?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(events);
  return <div></div>;
};

export default MyEvents;
