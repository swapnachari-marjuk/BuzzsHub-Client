import React from "react";
import ClubsCard from "../../Components/ClubsCard";
import { useQuery } from "@tanstack/react-query";
import ComponentLoading from "../../Components/ComponentLoading";
import useAxios from "../../hooks/useAxios";

const Clubs = () => {
  const axiosInstance = useAxios();
  const { data: cardsData, isLoading } = useQuery({
    queryKey: ["clubs", "status"],
    queryFn: async () => {
      const res = await axiosInstance.get("/clubs?status=approved");
      return res.data;
    },
  });
  // console.log(cardsData);

  if (isLoading) {
    return <ComponentLoading />;
  }
  return (
    <div className="my-5">
      <h3 className="text-3xl text-center font-bold text-pink-600 mb-5">
        All clubs
      </h3>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 lg:px-0 px-5">
        {cardsData?.map((data) => (
          <ClubsCard key={data._id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default Clubs;
