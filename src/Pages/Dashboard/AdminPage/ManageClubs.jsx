import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteForever, MdOutlineCancel } from "react-icons/md";
import { FaEye, FaRegCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageClubs = () => {
  const modalRef = useRef();
  const axiosSecure = useAxiosSecure();
  const {
    data: clubs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs`);
      return res.data;
    },
  });

  console.log(clubs);
  const [selectedClub, setSelectedClub] = useState();

  const handleApprove = (id) => {
    axiosSecure.patch(`/clubs/${id}`, { status: "approved" }).then((res) => {
      console.log(res);
      if (res.data.modifiedCount) {
        toast.success("Club Approved!");
        refetch();
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you want to reject this club?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/clubs/${id}`, { status: "rejected" })
          .then((res) => {
            console.log(res);
            if (res.data.modifiedCount) {
              toast.success("Club rejected!");
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
      <h3 className="text-3xl font-bold text-center pb-3 text-pink-600">
        Manage Clubs
      </h3>
      {clubs?.length === 0 ? (
        <div className="text-center text-gray-500">
          No Club found.
        </div>
      ) : (
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
                      className="btn btn-sm btn-ghost tooltip"
                      data-tip="Approve club"
                    >
                      <FaRegCheckCircle />
                    </button>
                    <button
                      onClick={() => handleReject(club._id)}
                      className="btn btn-sm btn-ghost tooltip"
                      data-tip="Reject club"
                    >
                      <MdOutlineCancel />
                    </button>
                  </td>
                )}

                {club.status === "approved" && (
                  <td>
                    <button
                      onClick={() => {
                        setSelectedClub(club);
                        modalRef.current.showModal();
                      }}
                      className="tooltip tooltip-primary"
                      data-tip="View Details"
                    >
                      <FaEye />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog
        ref={modalRef}
        id="my_modal_2"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box  flex justify-center md:gap-5 gap-2">
          <div className="stats shadow">
            <div className="stat bg-pink-100 text-pink-500">
              <div className="stat-title">Total Club Members</div>
              <div className="stat-value">{selectedClub?.eventCount || 0}</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
          </div>

          <div className="stats shadow ">
            <div className="stat bg-pink-100 text-pink-500">
              <div className="stat-title">Total Club Members</div>
              <div className="stat-value">{selectedClub?.memberCount || 0}</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ManageClubs;
