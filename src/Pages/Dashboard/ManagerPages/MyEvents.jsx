import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { CiCirclePlus } from "react-icons/ci";
import { BiMessageAltDetail, BiSolidEdit } from "react-icons/bi";
import { MdDelete, MdEventAvailable } from "react-icons/md";
import UpdateEvents from "./UpdateEvents";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyEvents = () => {
  const editModalRef = useRef(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: events, refetch } = useQuery({
    queryKey: ["events", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/events?email=${user?.email}`);
      return res.data;
    },
  });

  const closeModal = () => {
    if (editModalRef.current) {
      editModalRef.current.close();
    }
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
        axiosSecure
          .delete(`/events/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              toast.success("Event Deleted!");
            }
            console.log(res);
          })
          .catch((err) => {
            toast.error("Can't delete this event.");
            console.log(err);
          });
      }
    });
  };
  console.log(events);

  if (!events || events?.length == 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h3 className="text-2xl font-semibold text-gray-500">
          No clubs found!
        </h3>
        <p className="text-gray-400">You haven't created any clubs yet.</p>
        <Link
          to={"/dashboard/myClubs"}
          className="btn btn-primary rounded-full"
        >
          <CiCirclePlus className="text-xl" /> Create An Event
        </Link>
      </div>
    );
  }
  return (
    <div className="my-5">
      <h3 className="text-3xl text-center font-bold text-pink-600 mb-5">
        All clubs
      </h3>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sl.</th>
              <th>Name</th>
              <th>Venue</th>
              <th>Max Att.</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events?.map((data, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{data.title}</td>
                <td>{data.location}</td>
                <td>{data.maxAttendees}</td>
                <td>
                  <Link
                    to={`/events/${data._id}`}
                    className="tooltip"
                    data-tip="See Details"
                  >
                    <BiMessageAltDetail />
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedClub(data);
                      editModalRef.current.showModal();
                    }}
                    className="tooltip ml-2"
                    data-tip="Edit Event"
                  >
                    <BiSolidEdit />
                  </button>

                  <button
                    onClick={() => handleDelete(data._id)}
                    className="tooltip ml-2"
                    data-tip="Delete Event"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <dialog ref={editModalRef} className="modal">
          <div className="bg-base-100 rounded-2xl">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              {selectedClub && (
                <UpdateEvents
                  data={selectedClub}
                  refetch={refetch}
                  onClose={closeModal}
                />
              )}
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyEvents;
