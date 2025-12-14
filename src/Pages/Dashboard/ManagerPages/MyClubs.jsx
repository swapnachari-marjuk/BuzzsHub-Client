import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import ComponentLoading from "../../../Components/ComponentLoading";
import { BiMessageAltDetail, BiSolidEdit } from "react-icons/bi";
import { CiCirclePlus } from "react-icons/ci";
import ClubDetails from "../../ClubDetails/ClubDetails";
import { Link } from "react-router";
import UpdateClub from "./UpdateClub";

const MyClubs = () => {
  const editModalRef = useRef(null);
  const { user } = useAuth();
  const managerEmail = user?.email;
  const axiosSecure = useAxiosSecure();
  const [selectedClub, setSelectedClub] = useState(null);

  const {
    data: cardsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cards", managerEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs?email=${managerEmail}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <ComponentLoading />;
  }

  return (
    <div className="my-5">
      <h3 className="text-3xl text-center font-bold text-pink-600 mb-5">
        All clubs
      </h3>

      <div className="text-center">
        <Link
          to={"/dashboard/createClub"}
          className="btn btn-primary rounded-full"
        >
          {" "}
          <CiCirclePlus /> Create New Club
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sl.</th>
              <th>Name</th>
              <th>Venue</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cardsData?.map((data, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{data.clubName}</td>
                <td>{data.location}</td>
                <td>{data.status}</td>
                <td>
                  <Link
                    to={`/clubDetails/${data._id}`}
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
                    data-tip="Edit Club"
                  >
                    <BiSolidEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <dialog ref={editModalRef} className="modal">
          <div className="bg-base-100 rounded-2xl">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <h3 className="text-xl font-bold text-center py-4">Edit Club</h3>
              {selectedClub && (
                <UpdateClub
                  data={selectedClub}
                  refetch={refetch}
                  modalRef={editModalRef}
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

export default MyClubs;
