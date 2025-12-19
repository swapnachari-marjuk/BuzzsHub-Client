import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ComponentLoading from "../../../Components/ComponentLoading";
import { useQueries, useQuery } from "@tanstack/react-query";

const ClubMembers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: clubsData = [], isLoading } = useQuery({
    queryKey: ["clubs", user?.email, "approved", "managerOverview"],

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/clubs?email=${user?.email}&status=approved&purpose=managerOverview`
      );
      return res.data;
    },

    enabled: !!user,
  });

  const clubMembers = useQueries({
    queries: clubsData?.map((data) => ({
      queryKey: ["clubMembers", data?._id],

      queryFn: async () => {
        const res = await axiosSecure.get(`/clubMembers?clubId=${data._id}`);
        return res.data;
      },

      enabled: !!data?._id,
    })),
  });
  const allMembers = clubMembers.flatMap((query) => query.data || []);

  const groupedData = allMembers.reduce((acc, current) => {
    const clubName = current.clubName.trim(); 

    if (!acc[clubName]) {
      acc[clubName] = []; 
    }

    acc[clubName].push(current); 
    return acc;
  }, {});

  console.log(groupedData);

  if (isLoading) {
    return <ComponentLoading />;
  }

  return (
    <div className="p-5 space-y-12">
      {Object.entries(groupedData).map(([clubName, members]) => (
        <div key={clubName} className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-secondary">{clubName}</h2>
            <div className="badge badge-outline">{members.length} Members</div>
          </div>

          <div className="overflow-x-auto border border-base-300 rounded-lg shadow-sm">
            <table className="table w-full">
              <thead>
                <tr className="text-base">
                  <th>#</th>
                  <th>Email</th>
                  <th>Joined Date</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {members.map((member, index) => (
                  <tr key={member._id} className="hover">
                    <th>{index + 1}</th>
                    <td className="font-medium">{member.participantEmail}</td>
                    <td>
                      {new Date(member.joinedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td>
                      <div
                        className={`badge ${
                          member.status === "active"
                            ? "badge-success"
                            : "badge-ghost"
                        } badge-sm font-semibold capitalize`}
                      >
                        {member.status}
                      </div>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() =>
                          alert(`Details for: ${member.participantEmail}`)
                        }
                        className="btn btn-primary btn-xs sm:btn-sm"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClubMembers;
