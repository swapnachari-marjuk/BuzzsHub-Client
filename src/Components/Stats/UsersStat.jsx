import React from 'react';
import { FaUsers } from 'react-icons/fa';

const UsersStat = ({ usersCount }) => {
    return (
        <div className="stat bg-white shadow-md rounded-lg border-l-4 border-blue-500">
            <div className="stat-figure text-blue-500 text-3xl">
                <FaUsers />
            </div>
            <div className="stat-title font-semibold">Total Users</div>
            <div className="stat-value text-blue-600">{usersCount}</div>
        </div>
    );
};

export default UsersStat;