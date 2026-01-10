import React from 'react';
import { MdOutlinePendingActions } from 'react-icons/md';

const PendingClubStat = ({ pendingClubs }) => {
    return (
        <div className="stat bg-white shadow-md rounded-lg border-l-4 border-green-500">
            <div className="stat-figure text-green-500 text-3xl">
                <MdOutlinePendingActions />
            </div>
            <div className="stat-title font-semibold">Pending Clubs</div>
            <div className="stat-value text-green-600">{pendingClubs}</div>
        </div>
    );
};

export default PendingClubStat;