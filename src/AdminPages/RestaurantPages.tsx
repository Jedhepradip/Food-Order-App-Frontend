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

interface RestaurantInterfaceInput {
    file: string,
    city: string,
    country: string,
    RestaurantBanner: string,
    cuisines: string,
    deliveryTime: string,
    restaurantName: string,
}

const RestaurantPages: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loadingOTP, setLoadingOTP] = useState(false);
    const [EditLoading, SetLoadingEdit] = useState(false);
    const [Restaurant, setRestaurant] = useState<RestaurantInterface[] | []>([]);
    const RestaurantData = useSelector((state: RootState) => state.Restaurant.Restaurant)
    const { register, handleSubmit, formState: { errors } } = useForm<RestaurantInterfaceInput>();
    const Navigate = useNavigate()
    const Dispatch: AppDispatch = useDispatch()
    const token = localStorage.getItem("Token")

    useEffect(() => {
        if (RestaurantData) {
            setRestaurant(RestaurantData || [])
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleRestaurantFrom = async (e: any) => {
        e.preventDefault()
        if (!token) {
            toast.error(<div className='font-serif text-[15px] text-black'>User Not Found...</div>);
            return
        }
        SetLoadingEdit(true)
        const fromdata = new FormData(e.target)
        fromdata.append("RestaurantBanner", file!)
        const obj = Object.fromEntries(fromdata.entries())

        try {
            const response = await axios.put(`http://localhost:3000/api-restaurant/Restaurant/Updated/${Restaurant?.map(val => val._id)}`, obj, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${token}`,
                }
            })
            const Restaurantdata = response.data;
            if (response.status === 200) {
                setTimeout(() => {
                    toast.success(<div className='font-serif text-[15px] text-black'>{Restaurantdata.message}</div>);
                    Dispatch(FetchingRestaurant())
                    SetLoadingEdit(false)
                }, 1200);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
                SetLoadingEdit(true)
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
                            <div className="mt-6 p-6 rounded shadow-lg ">
                                {/* <RxCross2 className='float-right text-white text-[23px] cursor-pointer' onClick={() => setshowupdate(false)} /> */}
                                <form onSubmit={handleSubmit(onsubmit)}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 md:mb-4">

                                        <div>
                                            <label className="block text-[20px] font-medium text-white md:mb-1">Restaurant</label>
                                            <input {...register("restaurantName", { required: "Restaurant Name is required", minLength: { value: 1, message: "Name must be at least 5 character" } })}
                                                type="text"
                                                name='restaurantName'
                                                placeholder='Restaurant Name'
                                                className="w-full px-3 py-2 border border-gray-300 rounded bg-black text-white"
                                            />
                                            {errors.restaurantName && <span className="text-red-500 text-sm">{errors.restaurantName.message}</span>}
                                        </div>

                                        <div>
                                            <label className="block text-[20px] font-medium text-white md:mb-1">City</label>
                                            <input {...register("city", { required: "City Name is required", minLength: { value: 1, message: "Name must be at least 5 character" } })}
                                                type="text"
                                                name='city'
                                                placeholder='City'
                                                className="w-full px-3 py-2 border border-gray-300 rounded bg-black text-white"
                                            />
                                            {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
                                        </div>

                                        <div>
                                            <label className="block text-[20px] font-medium text-white md:mb-1">Country</label>
                                            <input {...register("country", { required: "Country is required", minLength: { value: 1, message: "Name must be at least 5 character" } })}
                                                type="text"
                                                name='country'
                                                placeholder='Country'
                                                className="w-full px-3 py-2 border border-gray-300 rounded bg-black text-white"
                                            />
                                            {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
                                        </div>

                                        <div>
                                            <label className="block text-[20px] font-medium text-white md:mb-1">Estimated Delivery Time(mi)</label>
                                            <input {...register("deliveryTime", { required: "deliveryTime is required" })}
                                                type="Time"
                                                name='deliveryTime'
                                                placeholder='delivery Time'
                                                className="w-full px-3 py-2 border border-gray-300 rounded bg-black text-white"
                                            />
                                            {errors.deliveryTime && <span className="text-red-500 text-sm">{errors.deliveryTime.message}</span>}
                                        </div>

                                        <div>
                                            <label className="block text-[20px] font-medium text-white md:mb-1">Cuisines</label>
                                            <input {...register("cuisines", { required: "Cuisines is required", minLength: { value: 1, message: "Name must be at least 5 character" } })}
                                                type="text"
                                                name='cuisines'
                                                placeholder='italian Chinese indian'
                                                className="w-full px-3 py-2 border border-gray-300 rounded bg-black text-white"
                                            />
                                            {errors.cuisines && <span className="text-red-500 text-sm">{errors.cuisines.message}</span>}
                                        </div>

                                        <div>
                                            <label className="block text-[20px] font-medium text-white mb-1">Restaurant Banner</label>
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

                                    {/* <button className="px-6 py-2 bg-orange-500 float-right md:mt-0 mt-3 md:mr-0 mr-6 hover:bg-orange-600 rounded font-bold text-[18px]">
                                        Create
                                    </button> */}

                                    <div className="w-ful pb-2">
                                        <button
                                            // type='submit'
                                            className={`px-6 py-2 flex bg-orange-500 float-right md:mt-0 mt-3 md:mr-0 mr-6 hover:bg-orange-600 rounded font-bold ${loadingOTP ? 'cursor-not-allowed' : ''} ${loadingOTP ? 'animate-pulse' : ''}`}
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
                    <div className='grid justify-center items-center grid-cols-1 md:mb-0 mb-10 md:p-10 p-0 w-[85%]'>
                        <ToastContainer />
                        <div className="mt-6 md:p-6 p-0 rounded shadow-lg bg-black">
                            {/* <RxCross2 className='float-right text-white text-[23px] cursor-pointer' onClick={() => setshowupdate(false)} /> */}
                            <form onSubmit={handleRestaurantFrom}>
                                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 md:mb-4 md:space-y-0 space-y-1.5">

                                    <div>
                                        <label className="block md:text-[20px] text-[19px] font-medium text-white md:mb-1">Restaurant Name</label>
                                        <input {...register("restaurantName")}
                                            type="text"
                                            name='restaurantName'
                                            defaultValue={Restaurant[0]?.restaurantName}
                                            className="w-full px-3 py-2 border border-gray-600 rounded bg-black text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block md:text-[20px] text-[19px] font-medium text-white md:mb-1">City</label>
                                        <input {...register("city")}
                                            type="text"
                                            name='city'
                                            // defaultValue={Restaurant?.map(val => val.city)}
                                            className="w-full px-3 py-2 border border-gray-600 rounded bg-black text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block md:text-[20px] text-[19px] font-medium text-white md:mb-1">Country</label>
                                        <input {...register("country")}
                                            type="text"
                                            name='country'
                                            // defaultValue={Restaurant?.map(val => val.country)}
                                            className="w-full px-3 py-2 border border-gray-600 rounded bg-black text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block md:text-[20px] text-[19px] font-medium text-white md:mb-1">Cuisines</label>
                                        <input {...register("cuisines")}
                                            type="text"
                                            name='cuisines'
                                            defaultValue={Restaurant[0]?.cuisines}
                                            className="w-full px-3 py-2 border border-gray-600 rounded bg-black text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block md:text-[20px] text-[19px] font-medium text-white md:mb-1">Delivery Time</label>
                                        <input {...register("deliveryTime")}
                                            type="Time"
                                            name='deliveryTime'
                                            // defaultValue={Restaurant?.map(val => val.deliveryTime)}
                                            className="w-full px-3 py-2 border border-gray-600 rounded bg-black text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block md:text-[20px] text-[19px] font-medium text-white mb-1">Restaurant Banner</label>
                                        <input {...register("RestaurantBanner")}
                                            type="file"
                                            name='RestaurantBanner'
                                            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                            className="w-full px-2 py-1.5 border border-gray-600 rounded bg-black text-white"
                                        />
                                    </div>

                                </div>

                                <div className="w-ful pb-2 md:w-auto w-full">
                                    <button
                                        // type='submit'
                                        className={`md:px-6 md:py-2 py-1.5 flex  md:w-auto w-full bg-orange-500 float-right md:mt-0 mt-3 md:mr-0 mr-0 md:text-[17px] text-[20px] justify-center items-center font-serif hover:bg-orange-600 rounded font-medium  ${EditLoading ? 'cursor-not-allowed' : ''} ${EditLoading ? 'animate-pulse' : ''}`}
                                        disabled={EditLoading}
                                    >
                                        {EditLoading && (
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
                                        <span>{EditLoading ? 'Loading...' : 'Update'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default RestaurantPages

