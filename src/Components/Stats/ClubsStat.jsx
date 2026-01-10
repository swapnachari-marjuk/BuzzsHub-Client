import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const ClubsStat = ({ approvedClubs }) => {
    return (
        <div className="stat bg-white shadow-md rounded-lg border-l-4 border-green-500">
            <div className="stat-figure text-green-500 text-3xl">
                <FaCheckCircle />
            </div>
            <div className="stat-title font-semibold">Approved Clubs</div>
            <div className="stat-value text-green-600">{approvedClubs}</div>
        </div>
    );
};

export default ClubsStat;