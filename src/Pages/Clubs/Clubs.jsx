import React, { useState } from "react";
import ClubsCard from "../../Components/ClubsCard";
import { useQuery } from "@tanstack/react-query";
import ComponentLoading from "../../Components/ComponentLoading";
import useAxios from "../../hooks/useAxios";

const Clubs = () => {
  const axiosInstance = useAxios();

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const limit = 9; // per page

  const { data, isLoading } = useQuery({

    queryKey: ["clubs", "status", sort, search, category, page],
    queryFn: async () => {
      const skip = (page - 1) * limit;
      const res = await axiosInstance.get(
        `/clubs?status=approved&sort=${sort}&search=${search}&category=${category}&purpose=publicShow&limit=${limit}&skip=${skip}`
      );
      return res.data;
    },
    placeholderData: (previousData) => previousData,
  });

  console.log({ sort, category });

  const cardsData = data?.publicRes
  const totalData = data?.countData

  const totalPages = Math.ceil(totalData / limit)

  console.log(data);

  if (isLoading) {
    return <ComponentLoading />;
  }
  return (
    <div className="my-5">
      <h3 className="text-3xl text-center font-bold text-pink-600 mb-5">
        All clubs
      </h3>


      <div className="flex flex-col md:flex-row gap-4 justify-between px-4 lg:px-0 mb-8">
        <form
          className="w-full max-w-sm join">
          <input
            type="text"
            placeholder="Search by club name..."
            className="input input-bordered w-full join-item"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </form>

        <div className="flex gap-2">
          <select
            className="select select-bordered"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="">All Categories</option>
            <option value="Photography">Photography</option>
            <option value="Sports">Sports</option>
            <option value="Technology">Technology</option>
            <option value="Music">Music</option>
            <option value="Travel">Travel</option>
            <option value="Art">Art</option>
            <option value="Education">Education</option>
            <option value="Fitness">Fitness</option>
            <option value="Gaming">Gaming</option>
            <option value="Social">Social & Community</option>
          </select>

          <select
            className="select select-bordered"
            onChange={(e) => setSort(e.target.value)}
            value={sort}
          >
            <option value="">Sort By Default</option>
            <option value="newest">Newest First</option>
            <option value="highestFee">Highest Fee</option>
          </select>
        </div>
      </div>

      {cardsData?.length === 0 ? (
        <div className="text-center text-gray-500">
          No upcoming events found.
        </div>
      ) : (
        <>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 lg:px-0 px-5">
            {cardsData?.map((data) => (
              <ClubsCard key={data._id} data={data} />
            ))}
          </div>
        </>
      )}


      <div className="flex justify-center mt-5 gap-2">
        <button
          className="btn btn-sm"
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span className="px-3 py-1 bg-gray-200 rounded">{page}</span>

        <button
          className="btn btn-sm"
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Clubs;
