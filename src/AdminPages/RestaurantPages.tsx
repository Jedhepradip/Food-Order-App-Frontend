import React, { useEffect, useState } from 'react'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from "react-hook-form"
import { AppDispatch, RootState } from '../Redux/Store/Store';
import { useNavigate } from 'react-router-dom';
import { FetchingRestaurant } from '../Redux/Features/RestaurantSlice';
import { RestaurantInterface } from '../interface/RestaurantInterface';
import { FetchingUserAllRestaurant } from '../Redux/Features/RestaurantAllSlice';

interface RestaurantInterfaceInput {
    file: string,
    city: string,
    country: string,
    RestaurantBanner: string,
    cuisines: string,
    deliveryTime: string,
    restaurantName: string,
}

interface UserInterFaceData {
    profilePictuer: string;  //profilePicture
    name: string;
    email: string;
    contact: string;
    password: string;
    address: string;
    country: string;
    city: string;
    updatedAt: string;
    items: string[]; // Array of individual CartItem objects
    __v: string;
    _id: string;
}

interface RestaurantInterface1 {
    _id: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryTime: string;
    cuisines: string[];
    RestaurantBanner: string;
    user: UserInterFaceData[];
    menus: string[];
}

interface UserRestaurentProps {

    RestaurentID: string;
    // closeMenuModal: () => void;
}

const RestaurantPages: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loadingOTP, setLoadingOTP] = useState(false);
    const [Restaurant, setRestaurant] = useState<RestaurantInterface1[] | []>([]);
    const RestaurantData = useSelector((state: RootState) => state.Restaurant.Restaurant)
    const { register, handleSubmit, formState: { errors } } = useForm<RestaurantInterfaceInput>();
    const Navigate = useNavigate()
    const Dispatch: AppDispatch = useDispatch()
    const token = localStorage.getItem("Token")

    useEffect(() => {
        if (RestaurantData) {
            setRestaurant(RestaurantData)
        }
    }, [Restaurant, RestaurantData])

    useEffect(() => {
        Dispatch(FetchingRestaurant())
    }, [Dispatch])

    const onsubmit: SubmitHandler<RestaurantInterfaceInput> = async (data) => {
        setLoadingOTP(true)
        if (!token) {
            Navigate("/LoginPage")
            return
        }
        const formdata = new FormData()
        formdata.append("RestaurantBanner", file!)
        formdata.append("city", data.city)
        formdata.append("country", data.country)
        formdata.append("cuisines", data?.cuisines)
        formdata.append("deliveryTime", data.deliveryTime)
        formdata.append("restaurantName", data.restaurantName)
        try {
            const response = await axios.post("http://localhost:3000/api-restaurant/Create/Restaurant/User", formdata, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${token}`,
                }
            })
            const Restaurant = response.data;
            if (response.status === 200) {
                toast.success(<div className='font-serif text-[15px] text-black'>{Restaurant.message}</div>);
                Dispatch(FetchingRestaurant())
                setLoadingOTP(false)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
                setLoadingOTP(true)
                const errorMessage = error.response.data.message;
                if (error.response.status === 409 || errorMessage === "User already exists") {
                    console.log("Error: User already exists.");
                    toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
                } else {
                    toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
                    console.log("Error: ", errorMessage || "Unexpected error occurred.");
                }
            } else {
                console.log("Error: Network issue or server not responding", error);
            }
        }
    }

    return (
        <>
            <div className='flex justify-center w-full bg-black md:p-10 p-0'>
                {!Restaurant ?
                    <>  
                        <div className='grid justify-center items-center grid-cols-1 mb-10 w-[85%]'>
                            <ToastContainer />
                            <div className="md:mt-6 mt-0 p-6 rounded shadow-lg font-serif">
                                <form onSubmit={handleSubmit(onsubmit)}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 md:mb-4 space-y-3">
                                        <div>
                                            <label className="block text-[20px] font-normal text-white md:mb-1">Restaurant</label>
                                            <input {...register("restaurantName", { required: "Restaurant Name is required", minLength: { value: 1, message: "Name must be at least 5 character" } })}
                                                type="text"
                                                name='restaurantName'
                                                placeholder='Restaurant Name'
                                                className="w-full px-3 py-2 border border-gray-300 rounded bg-black text-white"
                                            />
                                            {errors.restaurantName && <span className="text-red-500 text-sm">{errors.restaurantName.message}</span>}
                                        </div>

                                        <div>
                                            <label className="block text-[20px] font-normal text-white md:mb-1">City</label>
                                            <input {...register("city", { required: "City Name is required", minLength: { value: 1, message: "Name must be at least 5 character" } })}
                                                type="text"
                                                name='city'
                                                placeholder='City'
                                                className="w-full px-3 py-2 border border-gray-300 rounded bg-black text-white"
                                            />
                                            {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
                                        </div>

                                        <div>
                                            <label className="block text-[20px] font-normal text-white md:mb-1">Country</label>
                                            <input {...register("country", { required: "Country is required", minLength: { value: 1, message: "Name must be at least 5 character" } })}
                                                type="text"
                                                name='country'
                                                placeholder='Country'
                                                className="w-full px-3 py-2 border border-gray-300 rounded bg-black text-white"
                                            />
                                            {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
                                        </div>

                                        <div>
                                            <label className="block text-[20px] font-normal text-white md:mb-1">Estimated Delivery Time(mi)</label>
                                            <input {...register("deliveryTime", { required: "deliveryTime is required" })}
                                                type="Time"
                                                name='deliveryTime'
                                                placeholder='delivery Time'
                                                className="w-full px-3 py-2 border border-gray-300 rounded bg-black text-white"
                                            />
                                            {errors.deliveryTime && <span className="text-red-500 text-sm">{errors.deliveryTime.message}</span>}
                                        </div>

                                        <div>
                                            <label className="block text-[20px] font-normal text-white md:mb-1">Cuisines</label>
                                            <input {...register("cuisines", { required: "Cuisines is required", minLength: { value: 1, message: "Name must be at least 5 character" } })}
                                                type="text"
                                                name='cuisines'
                                                placeholder='italian Chinese indian'
                                                className="w-full px-3 py-2 border border-gray-300 rounded bg-black text-white"
                                            />
                                            {errors.cuisines && <span className="text-red-500 text-sm">{errors.cuisines.message}</span>}
                                        </div>

                                        <div>
                                            <label className="block text-[20px] font-normal text-white mb-1">Restaurant Banner</label>
                                            <input
                                                {...register("RestaurantBanner", { required: "Restaurant Banner is required" })}
                                                type="file"
                                                name='RestaurantBanner'
                                                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                                className="w-full px-2 py-1.5 border border-gray-300 rounded bg-black text-white"
                                            />
                                            {errors.RestaurantBanner && <span className="text-red-500 text-sm">{errors.RestaurantBanner.message}</span>}
                                        </div>
                                    </div>

                                    <div className="w-ful pb-2">
                                        <button
                                            // type='submit'
                                            className={`px-6 py-2 flex bg-orange-500 float-right md:mt-0 mt-3  hover:bg-orange-600 rounded font-serif ${loadingOTP ? 'cursor-not-allowed' : ''} ${loadingOTP ? 'animate-pulse' : ''}`}
                                            disabled={loadingOTP}
                                        >
                                            {loadingOTP && (
                                                <svg
                                                    className="animate-spin h-5 w-5 mr-2 text-white rounded-full"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
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
                                            )}
                                            <span>{loadingOTP ? 'Loading...' : 'Create'}</span>
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className='grid justify-center items-center grid-cols-1'>
                            <RestaurantEdit11 RestaurentID={Restaurant?._id} />
                        </div>
                    </>
                }
            </div>
        </>
    )
}

const RestaurantEdit11: React.FC<UserRestaurentProps> = ({ RestaurentID }) => {
    const [filteredRestaurant, setFilteredRestaurant] = useState<RestaurantInterface | null>(null);
    const restaurants = useSelector((state: RootState) => state.AllRestaurant.RestaurantAll);
    const [editLoading, setEditLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const { register, handleSubmit } = useForm();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (restaurants) {
            const restaurant = restaurants.find((r) => r._id === RestaurentID) || null;
            setFilteredRestaurant(restaurant);
        }
    }, [restaurants, RestaurentID]);

    useEffect(() => {
        dispatch(FetchingUserAllRestaurant());
    }, [dispatch]);

    const handleRestaurantForm = async (data: Record<string, string>) => {
        const token = localStorage.getItem("Token");
        if (!token) {
            toast.error(
                <div className="font-serif text-[15px] text-black">User Not Found...</div>
            );
            return;
        }

        setEditLoading(true);
        const formData = new FormData();
        if (file) formData.append("RestaurantBanner", file);
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const response = await axios.put(
                `http://localhost:3000/api-restaurant/Restaurant/Updated/${RestaurentID}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        authorization: `Bearer ${token}`,
                    },
                }
            );

            const responseData = response.data;
            if (response.status === 200) {
                setTimeout(() => {
                    toast.success(
                        <div className="font-serif text-[15px] text-black">{responseData.message}</div>
                    );
                    dispatch(FetchingUserAllRestaurant());
                    setEditLoading(false);
                }, 1200);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setEditLoading(false);
            const errorMessage = error.response?.data?.message || "Unexpected error occurred.";
            toast.error(
                <div className="font-serif text-[15px] text-black">{errorMessage}</div>
            );
        }
    };

    return (
        <div className="flex justify-center items-center font-serif bg-black/70">
            <ToastContainer />
            <div className="p-6 rounded-lg shadow-lg w-full md:px-56">
                <h2 className="text-2xl text-white mb-4 text-center font-serif">
                    Update Restaurant Details
                </h2>
                <form onSubmit={handleSubmit(handleRestaurantForm)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full bg-black">
                        <div className="w-full">
                            <label className="block text-lg font-medium text-white mb-1.5">
                                Restaurant Name
                            </label>
                            <input
                                {...register("restaurantName")}
                                type="text"
                                defaultValue={filteredRestaurant?.restaurantName || ""}
                                className="w-full px-4 py-2 border border-gray-100  rounded-lg bg-black text-white focus:ring focus:ring-orange-500 focus:outline-none"
                            />
                        </div>
                        <div className="w-full">
                            <label className="block text-lg font-medium text-white mb-1.5">
                                City
                            </label>
                            <input
                                {...register("city")}
                                type="text"
                                defaultValue={filteredRestaurant?.city || ""}
                                className="w-full px-4 py-2 border border-gray-100 rounded-lg bg-black text-white focus:ring focus:ring-orange-500 focus:outline-none"
                            />
                        </div>
                        <div className="w-full">
                            <label className="block text-lg font-medium text-white mb-1.5">
                                Country
                            </label>
                            <input
                                {...register("country")}
                                type="text"
                                defaultValue={filteredRestaurant?.country || ""}
                                className="w-full px-4 py-2 border border-gray-100 rounded-lg bg-black text-white focus:ring focus:ring-orange-500 focus:outline-none"
                            />
                        </div>
                        <div className="w-full">
                            <label className="block text-lg font-medium text-white mb-1.5">
                                Cuisines
                            </label>
                            <input
                                {...register("cuisines")}
                                type="text"
                                defaultValue={filteredRestaurant?.cuisines || ""}
                                className="w-full px-4 py-2 border border-gray-100 rounded-lg bg-black text-white focus:ring focus:ring-orange-500 focus:outline-none"
                            />
                        </div>
                        <div className="w-full">
                            <label className="block text-lg font-medium text-white mb-1.5">
                                Delivery Time
                            </label>
                            <input
                                {...register("deliveryTime")}
                                type="time"
                                defaultValue={filteredRestaurant?.deliveryTime || ""}
                                className="w-full px-4 py-2 border border-gray-100 rounded-lg bg-black text-white focus:ring focus:ring-orange-500 focus:outline-none"
                            />
                        </div>
                        <div className="w-full">
                            <label className="block text-lg font-medium text-white mb-1.5">
                                Restaurant Banner
                            </label>
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                className="w-full px-4 py-2 border border-gray-100 rounded-lg bg-black text-white focus:ring focus:ring-orange-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6 w-full">
                        <button
                            // type='submit'
                            className={`px-6 py-2 bg-orange-500 flex text-white rounded-lg hover:bg-orange-600 focus:ring focus:ring-orange-500 focus:outline-none transition duration-300 ${editLoading ? 'cursor-not-allowed' : ''} ${editLoading ? 'animate-pulse' : ''}`}
                            disabled={editLoading}
                        >
                            {editLoading && (
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-white rounded-full"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
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
                            )}
                            <span>{editLoading ? 'Loading...' : 'Update'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RestaurantPages