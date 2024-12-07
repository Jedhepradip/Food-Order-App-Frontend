import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FetchingUserAllRestaurant } from '../Redux/Features/RestaurantAllSlice';
import { RestaurantInterface } from '../interface/RestaurantInterface';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form"
import { AppDispatch, RootState } from '../Redux/Store/Store';
import { RxCross2 } from 'react-icons/rx';

interface UserRestaurentProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    RestaurentID: any;
    closeMenuModal: () => void;
}

interface RestaurantInter {
    _id: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryTime: string;
    cuisines: string[];
    RestaurantBanner: string;
    user: [];
    menus: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RestaurantEdit: React.FC<UserRestaurentProps> = ({ RestaurentID, closeMenuModal }: any) => {
    const { register, handleSubmit } = useForm();
    const [Restaurantdata, setRestaurant] = useState<RestaurantInterface[] | null>(null);
    const [RestFilterData, SetFilterData] = useState<RestaurantInterface[] | []>([]);
    const [EditLoading, SetLoadingEdit] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const Restaurant = useSelector((state: RootState) => state.AllRestaurant.RestaurantAll)
    const Dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        if (Restaurant) {
            setRestaurant(Restaurant)
        }
    }, [Restaurant, Restaurantdata])

    useEffect(() => {
        const Restaurant = Restaurantdata?.filter(val => val._id == RestaurentID)
        SetFilterData(Restaurant)
    }, [Restaurantdata, RestaurentID])


    useEffect(() => {
        Dispatch(FetchingUserAllRestaurant())
    }, [Dispatch])

    console.log(RestaurentID);


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleRestaurantFrom = async (data: any) => {
        const token = localStorage.getItem("Token")
        if (!token) {
            toast.error(<div className='font-serif text-[15px] text-black'>User Not Found...</div>);
            return;
        }

        SetLoadingEdit(true);
        const formData = new FormData();
        formData.append("RestaurantBanner", file!);
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value as string);
        });

        try {
            const response = await axios.put(
                `http://localhost:3000/api-restaurant/Restaurant/Updated/${Restaurant?._id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        authorization: `Bearer ${token}`,
                    },
                }
            );

            const Restaurantdata = response.data;
            if (response.status === 200) {
                setTimeout(() => {
                    toast.success(
                        <div className='font-serif text-[15px] text-black'>{Restaurantdata.message}</div>
                    );
                    closeMenuModal()
                    SetLoadingEdit(false);
                }, 1200);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            SetLoadingEdit(false);
            const errorMessage = error.response?.data?.message || "Unexpected error occurred.";
            toast.error(
                <div className='font-serif text-[15px] text-black'>{errorMessage}</div>
            );
        }
    };

    return (
        <>
            <div className="flex justify-center items-center w-full min-h-screen font-serif bg-black/80 fixed inset-0 z-50">
                <ToastContainer />

                <div className="p-6 rounded-lg shadow-lg bg-gray-950 w-full max-w-lg">
                    <RxCross2 className='float-right text-white text-[23px] cursor-pointer' onClick={() => closeMenuModal()}
                    />
                    <h2 className="text-2xl text-white mb-4 text-center font-serif">
                        Update Restaurant Details
                    </h2>

                    <form onSubmit={handleSubmit(handleRestaurantFrom)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Restaurant Name */}
                            <div>
                                <label className="block text-lg font-medium text-white mb-2">
                                    Restaurant Name
                                </label>
                                <input
                                    {...register("restaurantName")}
                                    type="text"
                                    defaultValue={RestFilterData?.restaurantName}
                                    className="w-full px-4 py-1.5 border border-gray-800 rounded-lg bg-gray-900 text-white focus:ring focus:ring-orange-500 focus:outline-none"
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label className="block text-lg font-medium text-white mb-2">
                                    City
                                </label>
                                <input
                                    {...register("city")}
                                    type="text"
                                    defaultValue={RestFilterData?.city}
                                    className="w-full px-4 py-1.5 border border-gray-800 rounded-lg bg-gray-900 text-white focus:ring focus:ring-orange-500 focus:outline-none"
                                />
                            </div>

                            {/* Country */}
                            <div>
                                <label className="block text-lg font-medium text-white mb-2">
                                    Country
                                </label>
                                <input
                                    {...register("country")}
                                    type="text"
                                    defaultValue={RestFilterData?.country}
                                    className="w-full px-4 py-1.5 border border-gray-800 rounded-lg bg-gray-900 text-white focus:ring focus:ring-orange-500 focus:outline-none"
                                />
                            </div>

                            {/* Cuisines */}
                            <div>
                                <label className="block text-lg font-medium text-white mb-2">
                                    Cuisines
                                </label>
                                <input
                                    {...register("cuisines")}
                                    type="text"
                                    defaultValue={RestFilterData?.cuisines}
                                    className="w-full px-4 py-1.5 border border-gray-800 rounded-lg bg-gray-900 text-white focus:ring focus:ring-orange-500 focus:outline-none"
                                />
                            </div>

                            {/* Delivery Time */}
                            <div>
                                <label className="block text-lg font-medium text-white mb-2">
                                    Delivery Time
                                </label>
                                <input
                                    {...register("deliveryTime")}
                                    type="time"
                                    defaultValue={RestFilterData?.deliveryTime}
                                    className="w-full px-4 py-1.5 border border-gray-800 rounded-lg bg-gray-900 text-white focus:ring focus:ring-orange-500 focus:outline-none"
                                />
                            </div>

                            {/* Restaurant Banner */}
                            <div>
                                <label className="block text-lg font-medium text-white mb-2">
                                    Restaurant Banner
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                    className="w-full px-4 py-1.5 border border-gray-800 rounded-lg bg-gray-900 text-white focus:ring focus:ring-orange-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end mt-6">
                            <button
                                className={`px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:ring focus:ring-orange-500 focus:outline-none transition duration-300 ${EditLoading ? 'cursor-not-allowed animate-pulse' : ''}`}
                                disabled={EditLoading}
                            >
                                {EditLoading ? (
                                    <svg
                                        className="animate-spin h-5 w-5 mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                        ></path>
                                    </svg>
                                ) : (
                                    "Update"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
};

export default RestaurantEdit;
