import React from "react";
import { Link } from "react-router";

const EventsCard = ({ event }) => {
  const { _id, title, eventFee, location, date, isPaid } = event;
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const feeDisplay = isPaid ? `$${eventFee}` : "Free";

  return (
    <div
      key={_id}
      className="p-6 rounded-xl shadow-lg bg-white transition-all duration-300 hover:shadow-xl border border-gray-100"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className=" font-extrabold text-pink-500">{title}</h3>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${
            isPaid ? "bg-pink-100 text-pink-700" : "bg-green-100 text-green-700"
          }`}
        >
          {isPaid ? "Paid Event" : "Free Event"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t pt-4 border-gray-100">
        <div>
          <p className="text-xs text-gray-500 uppercase font-medium mb-1">
            Location
          </p>
          <p className="text-md font-semibold text-gray-700">{location}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 uppercase font-medium mb-1">
            Date
          </p>
          <p className="text-md font-semibold text-gray-700">{formattedDate}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
        <div className="text-left">
          <p className="text-xs text-gray-500 uppercase font-medium">
            Membership Fee
          </p>
          <p className="text-2xl font-bold text-pink-600 mt-0.5">
            {feeDisplay}
          </p>
        </div>

        <Link
          to={`/events/${_id}`}
          className="btn btn-sm btn-primary shadow-md transition-shadow duration-200 hover:bg-pink-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventsCard;
