import React from 'react';
import { FaUserTie } from 'react-icons/fa';

const MembersStat = ({ membersCount }) => {
    return (
        <div className="stat bg-white shadow-md rounded-lg border-l-4 border-orange-500">
            <div className="stat-figure text-orange-500 text-3xl">
                <FaUserTie />
            </div>
            <div className="stat-title font-semibold">Club Members</div>
            <div className="stat-value text-orange-600">{membersCount}</div>
        </div>
    );
};

export default MembersStat;