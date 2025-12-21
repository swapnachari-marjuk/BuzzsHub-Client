import React from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

import EventsCard from "../../Components/EventsCard";
import ComponentLoading from "../../Components/ComponentLoading";

const Events = () => {
  const axiosInstance = useAxios();
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosInstance.get("/events");
      return res.data;
    },
  });

  console.log(events);
  if (isLoading) {
    return <ComponentLoading />;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-pink-600">
        Upcoming Events
      </h2>

      {events.length === 0 ? (
        <div className="text-center text-gray-500">
          No upcoming events found.
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8">
          {events.map((event) => (
            <EventsCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
