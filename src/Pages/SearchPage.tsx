import React from 'react';
import Filtercuisines from './Filtercuisines';
import { MdOutlineLocationOn } from "react-icons/md";
import { FaEarthAmericas } from "react-icons/fa6";

const SearchPage: React.FC = () => {
    return (
        <div className="bg-black text-white min-h-screen p-6 flex">
            {/* Sidebar filter section */}
            <div className="w-1/4 h-full">
                <Filtercuisines />
            </div>

            {/* Main content area */}
            <div className="w-3/4 ml-4">
                <div className="flex items-center mt-4 space-x-2">
                    <input
                        type="text"
                        placeholder="Search by restaurants & cuisines"
                        className="border border-gray-600 bg-gray-800 text-white rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <button className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300">
                        Search
                    </button>
                </div>

                <h1 className="mt-6 text-lg font-semibold text-gray-300">(3) Search result Found</h1>

                <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-gray-900 rounded-lg shadow-lg p-4">
                        <img
                            src="https://via.placeholder.com/300x200"
                            alt="Restaurant"
                            className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-white">Restaurant Name</h2>
                            <p className="text-gray-400 flex gap-1"><MdOutlineLocationOn className='mt-1 text-[23px]' /> City:Pune</p>
                            <p className="text-gray-400 flex gap-2"><FaEarthAmericas className='mt-1 text-[18px]' /> Country:india</p>

                            <p className="mt-2 text-black truncate">
                                <span className='bg-white rounded-full text-[15px]'>menu1</span>
                            </p>
                            <button className="bg-orange-500 text-white font-semibold py-2 px-4 mt-4 rounded-lg w-full hover:bg-orange-600 transition duration-300">
                                View Menu
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg shadow-lg p-4">
                        <img
                            src="https://via.placeholder.com/300x200"
                            alt="Restaurant"
                            className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-white">Restaurant Name</h2>
                            <p className="text-gray-400 flex gap-1"><MdOutlineLocationOn className='mt-1 text-[23px]' /> City:Pune</p>
                            <p className="text-gray-400 flex gap-2"><FaEarthAmericas className='mt-1 text-[18px]' /> Country:india</p>

                            <p className="mt-2 text-black truncate">
                                <span className='bg-white rounded-full text-[15px]'>menu1</span>
                            </p>
                            <button className="bg-orange-500 text-white font-semibold py-2 px-4 mt-4 rounded-lg w-full hover:bg-orange-600 transition duration-300">
                                View Menu
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg shadow-lg p-4">
                        <img
                            src="https://via.placeholder.com/300x200"
                            alt="Restaurant"
                            className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-white">Restaurant Name</h2>
                            <p className="text-gray-400 flex gap-1"><MdOutlineLocationOn className='mt-1 text-[23px]' /> City:Pune</p>
                            <p className="text-gray-400 flex gap-2"><FaEarthAmericas className='mt-1 text-[18px]' /> Country:india</p>

                            <p className="mt-2 text-black truncate">
                                <span className='bg-white rounded-full text-[15px]'>menu1</span>
                            </p>
                            <button className="bg-orange-500 text-white font-semibold py-2 px-4 mt-4 rounded-lg w-full hover:bg-orange-600 transition duration-300">
                                View Menu
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg shadow-lg p-4">
                        <img
                            src="https://via.placeholder.com/300x200"
                            alt="Restaurant"
                            className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-white">Restaurant Name</h2>
                            <p className="text-gray-400 flex gap-1"><MdOutlineLocationOn className='mt-1 text-[23px]' /> City:Pune</p>
                            <p className="text-gray-400 flex gap-2"><FaEarthAmericas className='mt-1 text-[18px]' /> Country:india</p>

                            <p className="mt-2 text-black truncate">
                                <span className='bg-white rounded-full text-[15px]'>menu1</span>
                            </p>
                            <button className="bg-orange-500 text-white font-semibold py-2 px-4 mt-4 rounded-lg w-full hover:bg-orange-600 transition duration-300">
                                View Menu
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg shadow-lg p-4">
                        <img
                            src="https://via.placeholder.com/300x200"
                            alt="Restaurant"
                            className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-white">Restaurant Name</h2>
                            <p className="text-gray-400 flex gap-1"><MdOutlineLocationOn className='mt-1 text-[23px]' /> City:Pune</p>
                            <p className="text-gray-400 flex gap-2"><FaEarthAmericas className='mt-1 text-[18px]' /> Country:india</p>

                            <p className="mt-2 text-black truncate">
                                <span className='bg-white rounded-full text-[15px]'>menu1</span>
                            </p>
                            <button className="bg-orange-500 text-white font-semibold py-2 px-4 mt-4 rounded-lg w-full hover:bg-orange-600 transition duration-300">
                                View Menu
                            </button>
                        </div>
                    </div>

                    {/* Repeat this card structure for other search results */}
                </div>

            
                
            </div>
        </div>
    );
};

export default SearchPage;
