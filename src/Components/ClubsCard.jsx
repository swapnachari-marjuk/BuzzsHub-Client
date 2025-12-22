import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const ClubsCard = ({ data }) => {
  // console.log(data);
  const { _id, bannerURL, clubName, description, category, membershipFee } =
    data;

  const truncatedDescription = description.substring(0, 80);
  const needSeeMore = description.length > 100;

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
      }}
      transition={{
        type: "keyframes",
        stiffness: 300,
      }}
      className="rounded-2xl"
    >
      {bannerURL ? (
        <figure>
          <img
            className="hover:rounded-t-2xl rounded-t-xl hover:rounded-b-none w-full max-h-55 object-cover"
            src={bannerURL}
            alt={`Banner for ${clubName}`}
          />
        </figure>
      ) : (
        <div className="hover:rounded-t-2xl flex justify-center items-center bg-red-300 rounded-t-xl hover:rounded-b-none w-full min-h-55 object-cover">
          <h3 className="text-xl font-bold text-red-600">Image Not Found.</h3>
        </div>
      )}

      <div className="flex flex-col space-y-3 p-4">
        <h2 className="font-bold text-xl">{clubName}</h2>

        <p className="text-gray-600 mb-4">
          {needSeeMore ? `${truncatedDescription}... ` : description}
          {needSeeMore && <Link className="hover:underline">See more</Link>}
        </p>

        <div className="flex justify-between items-center">
          <p>
            <span className="badge bg-pink-300 text-pink-600">{category}</span>
          </p>
          <p className="text-pink-400">
            Membership Fee:{" "}
            <span className="badge text-pink-400">$ {membershipFee}</span>
          </p>
        </div>

        <div className="mt-auto">
          <Link
            to={`/clubDetails/${_id}`}
            className="btn btn-primary w-full  text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ClubsCard;
