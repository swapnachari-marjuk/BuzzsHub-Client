import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

const RejectedClubsStat = ({ rejectedClubs }) => {
    return (
        <div className="stat bg-white shadow-md rounded-lg border-l-4 border-red-500">
            <div className="stat-figure text-red-500 text-3xl">
                <FaTimesCircle />
            </div>
            <div className="stat-title font-semibold">Rejected Clubs</div>
            <div className="stat-value text-red-600">{rejectedClubs}</div>
        </div>
    );
};

export default RejectedClubsStat;