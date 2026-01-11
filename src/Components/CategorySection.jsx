import React from 'react';
import {
    MdFitnessCenter,
    MdGroups,
    MdOutlineExplore,
    MdComputer,
    MdCameraAlt,
    MdMenuBook,
    MdRestaurant,
    MdNetworkCheck,
    MdEmojiEvents,
    MdMusicNote
} from 'react-icons/md';


const CategorySection = () => {
    const categories = [
        { name: 'Fitness', icon: <MdFitnessCenter size={30} /> },
        { name: 'Social', icon: <MdGroups size={30} /> },
        { name: 'Travel', icon: <MdOutlineExplore size={30} /> },
        { name: 'Technology', icon: <MdComputer size={30} /> },
        { name: 'Photography', icon: <MdCameraAlt size={30} /> },
        { name: 'Education', icon: <MdMenuBook size={30} /> },
        { name: 'Food', icon: <MdRestaurant size={30} /> },
        { name: 'Networking', icon: <MdNetworkCheck size={30} /> },
        { name: 'Sports', icon: <MdEmojiEvents size={30} /> },
        { name: 'Music', icon: <MdMusicNote size={30} /> },
    ];
    return (
        <section className="py-16 mt-12 mb-6 bg-[#fff5f7] rounded-2xl"> {/* হালকা পিঙ্কিশ ব্যাকগ্রাউন্ড */}
            <div className="max-w-7xl mx-auto px-4">

                {/* সেকশন হেডার */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-pink-600 mb-3">Club Categories</h2>
                    <p className="text-gray-500 italic">Find your tribe based on your passion</p>
                    <div className="h-1.5 w-24 bg-pink-400 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* কার্ড গ্রিড */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {categories.map((cat, index) => (
                        <div
                            key={index}
                            className="group flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-pink-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                        >
                            {/* আইকন কন্টেইনার */}
                            <div className="mb-4 p-4 rounded-2xl bg-pink-50 text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors duration-300">
                                {cat.icon}
                            </div>

                            {/* ক্যাটেগরি নাম */}
                            <span className="text-lg font-bold text-gray-700 group-hover:text-pink-600 transition-colors duration-300">
                                {cat.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
