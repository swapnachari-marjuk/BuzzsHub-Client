import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteForever } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageClubs = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: clubs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs");
      return res.data;
    },
  });

  const handleApprove = (id) => {
    axiosSecure.patch(`/clubs/${id}`, { status: "approved" }).then((res) => {
      console.log(res);
      if (res.data.modifiedCount) {
        toast.success("Club Approved!");
        refetch();
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/clubs/${id}`).then((res) => {
          console.log(res);
          if (res.data.deletedCount) {
            toast.success("Club deleted!");
            refetch();
          }
        });
      }
    });
  };

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
              {club.status === "pending" && (
                <td>
                  {" "}
                  <button
                    onClick={() => handleApprove(club._id)}
                    className="btn btn-sm btn-ghost"
                  >
                    <FaRegCheckCircle />
                  </button>
                  <button
                    onClick={() => handleDelete(club._id)}
                    className="btn btn-sm btn-ghost"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              )}

              {club.status === "approved" && (
                <td>
                  Approved
                  <br />
                  <span className="badge badge-primary badge-sm">
                    No action needed
                  </span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageClubs;
