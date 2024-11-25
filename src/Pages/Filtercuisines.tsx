import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/Store/Store';
import { RestaurantInterface } from '../interface/RestaurantInterface';
import { FetchingUserAllRestaurant } from '../Redux/Features/RestaurantAllSlice';

const Filtercuisines: React.FC = () => {
    const [AllRestaurantData, setAllRestaurantData] = useState<RestaurantInterface[]>()
    const [allCuisines, setAllCuisines] = useState<string[]>([]);
    const dispatch: AppDispatch = useDispatch()
    const RestureantdataAll = useSelector((state: RootState) => state.AllRestaurant.RestaurantAll)

    useEffect(() => {
        if (RestureantdataAll) {
            setAllRestaurantData(RestureantdataAll)
        }
    }, [RestureantdataAll])

    useEffect(() => {
        dispatch(FetchingUserAllRestaurant())
    }, [dispatch])

    useEffect(() => {
        if (AllRestaurantData) {
            const filterTheCuisines = Array.from(
                new Set(
                    AllRestaurantData
                        .flatMap(restaurant => restaurant.cuisines)
                        .map(cuisine => cuisine.toLowerCase())
                )
            );
            setAllCuisines(filterTheCuisines);
        }
    }, [AllRestaurantData]);

    const ClickThecuisines = (Cuisines: string) => {
        console.log(Cuisines);
    }

    return (
        <div className="bg-black text-white p-6 w-72 h-auto fixed top-20 left-5 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-2">
                <h1 className="text-xl font-bold tracking-wide">Filter By Cuisines</h1>
                <h2 className="text-sm cursor-pointer underline hover:text-gray-400 transition-all duration-200">
                    Reset
                </h2>
            </div>
            <div className="space-y-3">
                {allCuisines.map((val, index) => (
                    <div
                        key={index}
                        className="flex items-center p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-150" onClick={() => ClickThecuisines(val)}
                    >
                        <input
                            type="checkbox"
                            id={`cuisine-${index}`}
                            className="form-checkbox text-purple-600 bg-gray-800 border-gray-700 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                        />
                        <label
                            htmlFor={`cuisine-${index}`}
                            className="ml-3 text-sm font-medium capitalize cursor-pointer"
                        >
                            {val}
                        </label>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default Filtercuisines;
