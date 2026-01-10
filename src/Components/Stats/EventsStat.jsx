import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const EventsStat = ({ eventsCount }) => {
    return (
        <div className="stat bg-white shadow-md rounded-lg border-l-4 border-purple-500">
            <div className="stat-figure text-purple-500 text-3xl">
                <FaCalendarAlt />
            </div>
            <div className="stat-title font-semibold">Total Events</div>
            <div className="stat-value text-purple-600">{eventsCount}</div>
        </div>
    );
};

export default EventsStat;