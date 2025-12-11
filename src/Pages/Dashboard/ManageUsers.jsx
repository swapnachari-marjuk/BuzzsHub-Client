import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: userData, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  console.log(userData);
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
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userData?.map((user, i) => (
            <tr key={user._id}>
              <th>{i + 1}</th>
              <td>{user.displayName}</td>
              <td>{user.email}</td>
              <td>{user.role.split("_").join(" ")}</td>
              <td>{new Date(user.createdAt).toDateString()}</td>
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

export default ManageUsers;
