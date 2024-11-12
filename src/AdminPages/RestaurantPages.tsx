import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { RestaurantInterface } from '../interface/RestaurantInterface';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/Store/Store';
import { FetchingRestaurant } from '../Redux/Features/RestaurantSlice';

const RestaurantPages: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [Restaurant, setRestaurant] = useState<RestaurantInterface | null>(null);
    const RestaurantData = useSelector((state: RootState) => state.Restaurant.Restaurant)
    const { register, handleSubmit, formState: { errors } } = useForm<RestaurantInterface>();
    const Dispatch: AppDispatch = useDispatch()
    const token = localStorage.getItem("Token")

    useEffect(() => {
        if (RestaurantData) {
            setRestaurant(RestaurantData)
        }
    }, [RestaurantData])

    const onsubmit: SubmitHandler<RestaurantInterface> = async (data) => {
        if (!token) {
            toast.error(<div className='font-serif text-[15px] text-black'>User Not Found...</div>);
            return
        }
        const formdata = new FormData()
        formdata.append("RestaurantBanner", file!)
        formdata.append("city", data.city)
        formdata.append("country", data.country)
        formdata.append("cuisines", data.cuisines)
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
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps
    const handleRestaurantFrom = async (e: any) => {
        e.preventDefault()
        if (!token) {
            toast.error(<div className='font-serif text-[15px] text-black'>User Not Found...</div>);
            return
        }
        const fromdata = new FormData(e.target)
        fromdata.append("RestaurantBanner", file!)
        const obj = Object.fromEntries(fromdata.entries())

        console.log(obj);

        try {
            const response = await axios.put(`http://localhost:3000/api-restaurant/Restaurant/Updated/${Restaurant?._id}`, obj, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${token}`,
                }
            })
            const Restaurantdata = response.data;
            if (response.status === 200) {
                toast.success(<div className='font-serif text-[15px] text-black'>{Restaurantdata.message}</div>);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
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

    useEffect(() => {
        Dispatch(FetchingRestaurant())
    }, [Dispatch])

    console.log(Restaurant?.cuisines);

    return (
        <>
            <div className='flex justify-center w-full bg-black p-10'>
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

                                    <button className="px-6 py-2 bg-orange-500 float-right md:mt-0 mt-3 md:mr-0 mr-6 hover:bg-orange-600 rounded font-bold text-[18px]">
                                        Create
                                    </button>
                                </form>
                            </div>
                        </div>
                    </>
                    :
                    <div className='grid justify-center items-center grid-cols-1 mb-10 w-[85%]'>
                        <ToastContainer />
                        <div className="mt-6 p-6 rounded shadow-lg bg-black">
                            {/* <RxCross2 className='float-right text-white text-[23px] cursor-pointer' onClick={() => setshowupdate(false)} /> */}
                            <form onSubmit={handleRestaurantFrom}>
                                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 md:mb-4">

                                    <div>
                                        <label className="block text-[20px] font-medium text-white md:mb-1">Restaurant Name</label>
                                        <input {...register("restaurantName")}
                                            type="text"
                                            name='restaurantName'
                                            defaultValue={Restaurant?.restaurantName}
                                            className="w-full px-3 py-2 border border-gray-600 rounded bg-black text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[20px] font-medium text-white md:mb-1">City</label>
                                        <input {...register("city")}
                                            type="text"
                                            name='city'
                                            defaultValue={Restaurant?.city}
                                            className="w-full px-3 py-2 border border-gray-600 rounded bg-black text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[20px] font-medium text-white md:mb-1">Country</label>
                                        <input {...register("country")}
                                            type="text"
                                            name='country'
                                            defaultValue={Restaurant?.country}
                                            className="w-full px-3 py-2 border border-gray-600 rounded bg-black text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[20px] font-medium text-white md:mb-1">Cuisines</label>
                                        <input {...register("cuisines")}
                                            type="text"
                                            name='cuisines'
                                            defaultValue={Restaurant?.cuisines}
                                            className="w-full px-3 py-2 border border-gray-600 rounded bg-black text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[20px] font-medium text-white md:mb-1">Delivery Time</label>
                                        <input {...register("deliveryTime")}
                                            type="Time"
                                            name='deliveryTime'
                                            defaultValue={Restaurant?.deliveryTime}
                                            className="w-full px-3 py-2 border border-gray-600 rounded bg-black text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[20px] font-medium text-white mb-1">Restaurant Banner</label>
                                        <input {...register("RestaurantBanner")}
                                            type="file"
                                            name='RestaurantBanner'
                                            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                            className="w-full px-2 py-1.5 border border-gray-600 rounded bg-black text-white"
                                        />
                                    </div>

                                </div>

                                <button className="px-6 py-2 bg-orange-500 float-right md:mt-0 mt-3 md:mr-0 mr-6 hover:bg-orange-600 rounded font-bold">
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default RestaurantPages

