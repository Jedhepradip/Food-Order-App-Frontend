import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/Store/Store';
import { RestaurantInterface } from '../interface/RestaurantInterface';
import { FetchingUserAllRestaurant } from '../Redux/Features/RestaurantAllSlice';
import { SetFilterCuisines } from '../Redux/Features/CuisinesFilterSlice';

const Filtercuisines: React.FC = () => {
    const [AllRestaurantData, setAllRestaurantData] = useState<RestaurantInterface[]>()
    const [allCuisines, setAllCuisines] = useState<string[]>([]);
    const [Cuisines, Cuisinesdata] = useState<string[]>([]);
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
        dispatch(SetFilterCuisines([{ Cuisines: Cuisines }]));
    }

    const ResetTheCuisines = () => {
        dispatch(SetFilterCuisines([{ Cuisines: "" }]));
    }

    // console.log(allCuisines.filter());

    useEffect(() => {
        const data = allCuisines?.filter((item: string) => item.trim() !== '')
        console.log(data);
        Cuisinesdata(data)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log("Cuisines ", Cuisines);


    return (

        <div className="bg-black w-full text-white md:w-72 h-auto rounded-lg shadow-lg p-5 md:p-0 mt-6 md:mt-0">
            <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-2">
                <h1 className="text-xl font-bold tracking-wide">Filter By Cuisines</h1>
                <h2 className="text-sm cursor-pointer underline hover:text-gray-400 transition-all duration-200" onClick={() => ResetTheCuisines()}>
                    Reset
                </h2>
            </div>
            <div className="space-y-3">
                {Cuisines.map((val, index) => (
                    <div
                        key={index}
                        className="flex items-center p-2 bg-gray-800 rounded-lg transition-all duration-150 hover:bg-gray-700 focus-within:bg-gray-700"
                    >
                        <input
                            type="radio"
                            id={`cuisine-${index}`}
                            name="cuisine"
                            className="form-radio text-purple-600 bg-gray-800 border-gray-700 cursor-pointer"
                            onChange={() => ClickThecuisines(val)}
                        />
                        <label
                            htmlFor={`cuisine-${index}`}
                            className="ml-3 text-sm font-medium  capitalize cursor-pointer"
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
