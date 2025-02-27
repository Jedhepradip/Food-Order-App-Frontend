import React, { useEffect, useState } from 'react';
import Filtercuisines from './Filtercuisines';
import { MdOutlineLocationOn } from "react-icons/md";
import { FaEarthAmericas } from "react-icons/fa6";
import { FetchingUserAllRestaurant } from '../Redux/Features/RestaurantAllSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/Store/Store';
import { RestaurantInterface } from '../interface/RestaurantInterface';
import { NavLink } from 'react-router-dom';

interface SearchByCountry {
    Country: string;
}

interface FilterCuisinesinterface {
    Cuisines: string
}

const SearchPage: React.FC = () => {
    const [AllRestaurantData, setAllRestaurantData] = useState<RestaurantInterface[]>()
    const [AllRestaurantDataShowUI, setAllRestaurantDataShowUI] = useState<RestaurantInterface[] | undefined | null>(null)
    const [SearchByResCui, SetSearchByResCui] = useState<string | undefined | null>(null);
    const [SearchCountry, SetSearchByCountry] = useState<SearchByCountry[] | null>(null)
    const [Cuisine, SetCuisines] = useState<FilterCuisinesinterface[] | null>(null)
    const dispatch: AppDispatch = useDispatch()
    const RestureantdataAll = useSelector((state: RootState) => state.AllRestaurant.RestaurantAll)
    const FilterCuisines = useSelector((state: RootState) => state.Cuisines.FilterCuisines)
    const SearchTheCountry = useSelector((state: RootState) => state.Search.SearchCountry)

    useEffect(() => {
        if (RestureantdataAll) {
            setAllRestaurantData(RestureantdataAll)
        }
    }, [RestureantdataAll])

    useEffect(() => {
        if (FilterCuisines) {
            SetCuisines(FilterCuisines)
        }
    }, [FilterCuisines])

    useEffect(() => {
        if (Cuisine) {
            const filterByCountry = AllRestaurantData?.filter(e =>
                e.cuisines.toString().toLowerCase().includes(Cuisine[0].Cuisines.toLowerCase())
            );
            setAllRestaurantDataShowUI(filterByCountry);
        }
    }, [AllRestaurantData, Cuisine])

    useEffect(() => {
        if (SearchTheCountry) {
            SetSearchByCountry(SearchTheCountry)
        } else {
            setAllRestaurantDataShowUI(RestureantdataAll)
        }
    }, [RestureantdataAll, SearchTheCountry, SearchTheCountry?.length])

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
        setAllRestaurantDataShowUI(SearchResult);
    };

    useEffect(() => {
        dispatch(FetchingUserAllRestaurant())
    }, [dispatch,SearchTheCountry])

    useEffect(() => {
        if (SearchCountry?.length) {
            const filterByCountry = AllRestaurantData?.filter(e =>
                e.country.toLowerCase().includes(SearchCountry[0]?.Country.toLowerCase())
            );
            setAllRestaurantDataShowUI(filterByCountry);
            // }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SearchTheCountry, SearchCountry?.length])

    return (
        <div className="bg-black text-white min-h-screen p-6 flex flex-col md:flex-row">
            <div className="md:w-1/4 w-full h-full mb-6 md:mb-0">
                <Filtercuisines />
            </div>

            <div className="md:w-3/4 w-full md:ml-4">
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

                {SearchCountry?.length ? (
                    <h1 className="mt-6 text-lg text-gray-300">({AllRestaurantDataShowUI?.length}) Search result Found</h1>
                ) : (
                    <h1 className="mt-6 text-lg text-gray-300">({AllRestaurantDataShowUI?.length}) Search result Found</h1>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                    {AllRestaurantDataShowUI?.map((val, index) => (
                        <div key={index} className="bg-gray-900 rounded-lg shadow-lg p-4">
                            <img
                                src={val.RestaurantBanner}
                                alt="Restaurant"
                                className="w-full h-40 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                                <h2 className="text-xl text-white font-semibold">{val.restaurantName}</h2>
                                <p className="text-gray-400 flex gap-1"><MdOutlineLocationOn className='mt-1 text-[23px]' /> City: {val.city}</p>
                                <p className="text-gray-400 flex gap-1 ml-1"><FaEarthAmericas className='mt-1 text-[18px]' /> Country: {val.country}</p>

                                <div className="mt-2 text-black truncate grid grid-cols-3 gap-1 text-center justify-around items-center overflow-hidden">
                                    {val?.cuisines?.map((data, index) => (
                                        <span key={index} className='bg-white font-semibold rounded-full text-[15px] px-1'>{data.charAt(0).toUpperCase() + data.slice(1).toLowerCase()}</span>
                                    ))}
                                </div> <NavLink to={`/ViewMenuPage/${val._id}`}>
                                    <button className="bg-orange-500 text-black py-2 px-4 mt-4 rounded-lg w-full hover:bg-orange-600 transition duration-300 font-semibold">
                                        View Menu
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;