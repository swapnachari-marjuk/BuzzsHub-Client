import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import ClubsStat from '../Stats/ClubsStat';
import EventsStat from '../Stats/EventsStat';
import UsersStat from '../Stats/UsersStat';
import MembersStat from '../Stats/MembersStat';


const OverviewStats = () => {
    const axiosInstance = useAxios()
    const { data: stats } = useQuery({
        queryKey: ['stats'], queryFn: async () => {
            const res = await axiosInstance.get("/publicOverview")
            return res.data
        }
    })

    console.log(stats);
    return (
        <div className='pt-12 pb-5'>
            <h3 className='text-2xl font-bold text-pink-500 text-center mb-5'>Buzz’sHub at a Glance</h3>

            <div className='grid grid-cols-3 gap-5'>
                <ClubsStat approvedClubs={stats?.totalClubs} />

                {/* Total Events */}
                <EventsStat eventsCount={stats?.totalEvents} />

                {/* Total Users */}
                <UsersStat usersCount={stats?.totalUsers} />

            </div>
        </div>
    );
};

export default OverviewStats;