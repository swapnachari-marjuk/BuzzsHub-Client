import { useQueries, useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const EventRegistration = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  //   event id and name
  const { data: eventsData = [], isLoading } = useQuery({
    queryKey: ["events", user?.email, "managerOverview"],

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/events?email=${user?.email}&purpose=managerOverview`
      );
      return res.data;
    },

    enabled: !!user,
  });

  //   getting all data and others in queries
  const eventRegistered = useQueries({
    queries: eventsData?.map((data) => ({
      queryKey: ["eventRegistration", data?._id],

      queryFn: async () => {
        const res = await axiosSecure.get(
          `/eventRegistration?eventId=${data._id}`
        );
        return res.data;
      },

      enabled: !!data?._id,
    })),
  });

  //   getting data from queries in a single array.
  const allRegistration = eventRegistered.flatMap((query) => query.data || []);

  const groupedData = allRegistration.reduce((acc, current) => {
    if (!current?.eventName) return acc;
    const eventName = current.eventName.trim();
    if (!acc[eventName]) {
      acc[eventName] = [];
    }
    acc[eventName].push(current);
    return acc;
  }, {});

  console.log(allRegistration);
  return (
    <div className="p-5 space-y-10">
      <h1 className="text-3xl font-bold mb-5">Event Registrations</h1>

      {Object.keys(groupedData).length === 0 ? (
        <div className="alert alert-info">No registrations found.</div>
      ) : (
        Object.entries(groupedData).map(([eventName, participants]) => (
          <div key={eventName} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-primary italic underline">
                Event: {eventName}
              </h2>
              <div className="badge badge-secondary">
                {participants.length} Registered
              </div>
            </div>

            <div className="overflow-x-auto border border-base-300 rounded-box shadow-md">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Participant Email</th>
                    <th>Status</th>
                    <th>Joined At</th>
                  </tr>
                </thead>

                <tbody>
                  {participants.map((reg, index) => (
                    <tr key={reg._id} className="hover">
                      <th>{index + 1}</th>
                      <td>{reg.participantEmail}</td>
                      <td>
                        <span className="badge badge-success badge-outline capitalize">
                          {reg.status || "Success"}
                        </span>
                      </td>
                      <td>{new Date(reg.joinedAt).toDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EventRegistration;
