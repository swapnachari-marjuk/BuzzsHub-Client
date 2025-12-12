import React from "react";
import { useQuery } from "@tanstack/react-query";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaUser, FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleManageUser = (role, email) => {
    if (email === user.email) {
      toast.warn("You'r not allowed to change your status.");
      return;
    }
    axiosSecure.patch("/users", { role, email }).then((res) => {
      if (res.data.modifiedCount) {
        toast.success("User updated successfully.");
        refetch();
      }
      console.log(res);
    });
    console.log({ role, email });
  };

  const handleMakingAdmin = (email) => {
    handleManageUser("admin", email);
  };

  const handleMakeUser = (email) => {
    handleManageUser("user", email);
  };

  const handleMakeManager = (email) => {
    handleManageUser("manager", email);
  };

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
              <td className="flex items-center gap-4">
                <button
                  className="tooltip tooltip-primary"
                  data-tip="Make Admin"
                  onClick={() => handleMakingAdmin(user.email)}
                >
                  <IoShieldCheckmarkOutline />
                </button>
                <button
                  className="tooltip tooltip-primary"
                  data-tip="Make Manager"
                  onClick={() => handleMakeManager(user.email)}
                >
                  <FaUserPlus />
                </button>
                <button
                  className="tooltip tooltip-primary"
                  data-tip="Make User"
                  onClick={() => handleMakeUser(user.email)}
                >
                  <FaUser />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
