import React, { useEffect, useState } from 'react';
import Filtercuisines from './Filtercuisines';
import { MdOutlineLocationOn } from "react-icons/md";
import { FaEarthAmericas } from "react-icons/fa6";
import { FetchingUserAllRestaurant } from '../Redux/Features/RestaurantAllSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/Store/Store';
import { RestaurantInterface } from '../interface/RestaurantInterface';
import { NavLink } from 'react-router-dom';

// interface Restaura {
//     _id: string;
//     restaurantName: string;
//     city: string;
//     country: string;
//     deliveryTime: string;
//     cuisines: string[];
//     RestaurantBanner: string;
//     user: string[];
//     menus: string[];
// }

const SearchPage: React.FC = () => {
    const [AllRestaurantData, setAllRestaurantData] = useState<RestaurantInterface[]>()
    const [SearchByResCui, SetSearchByResCui] = useState<string | undefined | null>(null);
    const dispatch: AppDispatch = useDispatch()
    const RestureantdataAll = useSelector((state: RootState) => state.AllRestaurant.RestaurantAll)

    console.log(RestureantdataAll);

    useEffect(() => {
        if (RestureantdataAll) {
            setAllRestaurantData(RestureantdataAll)
        }
    }, [RestureantdataAll])


    useEffect(() => {
        if (SearchByResCui?.length == 0 || undefined) {
            dispatch(FetchingUserAllRestaurant())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SearchByResCui])

    const SearchToRestaurant = () => {
        const SearchResult = AllRestaurantData?.filter(e =>
            e.restaurantName.toLowerCase().includes(SearchByResCui?.toLowerCase() || "") ||
            e.cuisines.some(cuisine => cuisine.toLowerCase().includes(SearchByResCui?.toLowerCase() || ""))
        );
        setAllRestaurantData(SearchResult);
    };

    useEffect(() => {
        dispatch(FetchingUserAllRestaurant())
    }, [dispatch])

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
                        value={SearchByResCui || ""}
                        onChange={(e) => {
                            SetSearchByResCui(e.target.value); // Update state
                            SearchToRestaurant(); // Call your custom function
                        }}
                        className="border border-gray-600 bg-gray-800 text-white rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <button className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300" onClick={() => SearchToRestaurant()}>
                        Search
                    </button>
                </div>

                <h1 className="mt-6 text-lg text-gray-300">({AllRestaurantData?.length}) Search result Found</h1>

                <div className="grid md:grid-cols-3 gap-6 mt-6">
                    {AllRestaurantData?.map((val, index: React.Key | null | undefined) => (
                        <div key={index} className="bg-gray-900 rounded-lg shadow-lg p-4">
                            <img
                                src={`http://localhost:3000/${val.RestaurantBanner}`}
                                alt="Restaurant"
                                className="w-full h-40 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h2 className="text-xl text-white font-semibold">{val.restaurantName}</h2>
                                <p className="text-gray-400 flex gap-1"><MdOutlineLocationOn className='mt-1 text-[23px]' /> City:{val.city}</p>
                                <p className="text-gray-400 flex gap-2"><FaEarthAmericas className='mt-1 text-[18px]' /> Country:{val.country}</p>

                                <div className="mt-2 text-black truncate grid grid-cols-3 gap-1 text-center justify-around items-center overflow-hidden">
                                    {val?.cuisines?.map((data, index: React.Key | null | undefined) => (
                                        <span key={index} className='bg-white rounded-full text-[15px] px-1'>{data}</span>
                                    ))}
                                </div>
                                <NavLink to={`/ViewMenuPage/${val._id}`}>
                                    <button className="bg-orange-500 text-black py-2 px-4 mt-4 rounded-lg w-full hover:bg-orange-600 transition duration-300 font-semibold">
                                        View Menu
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    ))}

                    {/* Repeat this card structure for other search results */}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
