import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import EventsCard from "../../Components/EventsCard";
import ComponentLoading from "../../Components/ComponentLoading";

const Events = () => {
  const axiosInstance = useAxios();

  const [page, setPage] = useState(1)
  const limit = 8

  const { data = [], isLoading } = useQuery({
    queryKey: ["events", page],
    queryFn: async () => {
      const skip = (page - 1) * limit
      const res = await axiosInstance.get(`/events?purpose=publicShow&limit=${limit}&skip=${skip}`);
      return res.data;
    },

    placeholderData: (prevData) => prevData
  });




  const events = data?.publicRes
  const totalEvents = data?.totalEvents || 0
  const totalPages = Math.ceil(totalEvents / limit)


  console.log(totalPages);

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
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <EventsCard key={event._id} event={event} />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-5 gap-2">
        <button
          className="btn btn-sm text-white bg-pink-400 hover:bg-pink-500 border-0"
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          <FaChevronLeft /> Previous
        </button>

        <span className="px-3 py-1 bg-pink-600 rounded text-white">{page}</span>

        <button
          className={"btn btn-sm text-white bg-pink-400 hover:bg-pink-500 border-0"}
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Events;
