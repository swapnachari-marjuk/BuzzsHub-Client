import React, { useState } from "react";
import ClubsCard from "../../Components/ClubsCard";
import { useQuery } from "@tanstack/react-query";
import ComponentLoading from "../../Components/ComponentLoading";
import useAxios from "../../hooks/useAxios";

const Clubs = () => {
  const axiosInstance = useAxios();
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const { data: cardsData, isLoading } = useQuery({
    queryKey: ["clubs", "status", sort, search, category],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/clubs?status=approved&sort=${sort}&search=${search}&category=${category}`
      );
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

      {cardsData.length === 0 ? (
        <div className="text-center text-gray-500">
          No upcoming events found.
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
            <form onSubmit={handleSearch} className="w-full max-w-sm join">
              <input
                type="text"
                placeholder="Search by club name..."
                className="input input-bordered w-full join-item"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-primary join-item bg-pink-600 border-none text-white"
              >
                Search
              </button>
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
                <option value="Art & Design">Art & Design</option>
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

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 lg:px-0 px-5">
            {cardsData?.map((data) => (
              <ClubsCard key={data._id} data={data} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Clubs;
