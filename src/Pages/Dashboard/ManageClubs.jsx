import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ManageClubs = () => {
  const axiosSecure = useAxiosSecure();
  const { data: clubs, isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs");
      return res.data;
    },
  });

  console.log(clubs);

  if (isLoading) {
    <div className="flex w-52 flex-col gap-4">
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>;
  }
  return (
    <div className="overflow-x-auto">
      <h3 className="text-3xl font-bold text-center pb-3">Manage Users</h3>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Sl.</th>
            <th>Club Name</th>
            <th>Managers Email</th>
            <th>Membership Fee</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clubs?.map((club, i) => (
            <tr key={club._id}>
              <th>{i + 1}</th>
              <td>{club.clubName}</td>
              <td>{club.managerEmail}</td>
              <td>{club.membershipFee}</td>
              <td>{club.status}</td>
              <td>{}</td>
              <td>{}</td>
              <td>
                <button></button>
                <button></button>
                <button></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageClubs;
