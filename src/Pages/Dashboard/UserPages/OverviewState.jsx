import React from "react";
import { FaCalendarAlt, FaHandshake } from "react-icons/fa";

const OverviewState = ({ overviewData }) => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="stat bg-white shadow-md rounded-lg border-l-4 border-blue-500">
          <div className="stat-figure text-blue-500 text-3xl">
            <FaHandshake />
          </div>
          <div className="stat-title font-semibold">Total Clubs</div>
          <div className="stat-value text-blue-600">
            {overviewData?.membersClub}
          </div>
        </div>

        <div className="stat bg-white shadow-md rounded-lg border-l-4 border-purple-500">
          <div className="stat-figure text-purple-500 text-3xl">
            <FaCalendarAlt />
          </div>
          <div className="stat-title font-semibold">Total Events</div>
          <div className="stat-value text-purple-600">
            {overviewData?.membersEvents}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewState;
