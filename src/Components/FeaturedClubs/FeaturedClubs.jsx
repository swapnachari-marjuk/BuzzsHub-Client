import React from "react";
import Marquee from "react-fast-marquee";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router";

const FeaturedClubs = () => {
  const axios = useAxios();

  const { data: latestClubs = [] } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axios.get("/clubs?limit=5&status=approved");
      console.log(res);
      return res.data.limitedResult;
    },
  });

  return (
    <div className="my-16">
      <h2 className="text-2xl text-pink-500 font-bold text-center mb-8">
        Featured Clubs
      </h2>

      {latestClubs.length === 0 ? (
        <div className="text-center text-gray-500">No Featured Club found.</div>
      ) : (
        <Marquee speed={40} pauseOnHover={false}>
          <div className="flex gap-6 px-4">
            {latestClubs.map((club) => (
              <motion.div
                key={club._id}
                className="w-72 bg-base-100 rounded-2xl shadow-md overflow-hidden"
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0px 15px 35px rgba(0,0,0,0.25)",
                }}
                transition={{ type: "spring", stiffness: 280 }}
              >
                {/* Image Section */}
                <figure className="relative h-44 overflow-hidden">
                  {club?.bannerURL ? (
                    <img
                      src={club.bannerURL}
                      alt={club.clubName}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full flex justify-center items-center bg-red-300 object-cover transition-transform duration-500 group-hover:scale-105">
                      <h3 className="text-xl font-bold text-red-600">Image Not Found.</h3>
                    </div>
                  )}
                  {/* Category badge overlay */}
                  <span className="absolute top-3 left-3 badge bg-pink-200 text-pink-600">
                    {club.category}
                  </span>
                </figure>

                {/* Content */}
                <div className="flex flex-col p-4 space-y-3">
                  <h3 className="text-xl font-bold line-clamp-1">
                    {club.clubName}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {club.description}
                  </p>

                  {/* Fee */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-pink-500 font-medium">
                      Membership Fee
                    </span>
                    <span className="badge badge-outline text-pink-500">
                      $ {club.membershipFee}
                    </span>
                  </div>

                  {/* CTA */}
                  <Link
                    to={`/clubDetails/${club._id}`}
                    className="btn btn-sm btn-primary mt-2 w-full"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </Marquee>
      )}
    </div>
  );
};

export default FeaturedClubs;
