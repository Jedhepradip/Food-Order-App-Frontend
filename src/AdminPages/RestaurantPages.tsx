import React, { useEffect, useState } from 'react'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from '@stripe/stripe-js'
import { useNavigate } from 'react-router-dom';
// import { Elements } from '@stripe/react-stripe-js'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from "react-hook-form"
import { AppDispatch, RootState } from '../Redux/Store/Store';
// import { FetchingUserData } from '../Redux/Features/UserSlice';
// import { UserInterFaceData } from '../interface/UserInterface';
import { FetchingRestaurant } from '../Redux/Features/RestaurantSlice';
import { RestaurantInterface } from '../interface/RestaurantInterface';
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { FetchingUserAllRestaurant } from '../Redux/Features/RestaurantAllSlice';

// interface PaymentPageProps {
//     SetShowMenuId: string | number,
// }

// interface CheckoutFormData {
//     email: string;
// }

interface RestaurantInterfaceInput {
    file: string,
    city: string,
    country: string,
    RestaurantBanner: string,
    cuisines: string,
    deliveryTime: string,
    restaurantName: string,
}

interface UserRestaurentProps {
    RestaurentID: string;
    // closeMenuModal: () => void;
}

interface PaymentData {
    name: string;
    email: string;
    amount: number;
    paymentId: string;
}

const RestaurantPages: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loadingOTP, setLoadingOTP] = useState(false);
    const [Restaurant, setRestaurant] = useState<RestaurantInterface | null>(null);
    const RestaurantData = useSelector((state: RootState) => state.Restaurant.Restaurant)
    const { register, handleSubmit, formState: { errors } } = useForm<RestaurantInterfaceInput>();
    const Navigate = useNavigate()
    const Dispatch: AppDispatch = useDispatch()
    const token = localStorage.getItem("Token")

    const [Payment, SetPaymentData] = useState<PaymentData | null>(null);

    useEffect(() => {
        if (RestaurantData) {
            setRestaurant(RestaurantData)
        }
    }, [Restaurant, RestaurantData])

    useEffect(() => {
        Dispatch(FetchingRestaurant())
    }, [Dispatch])

    const CheckTheLoginUser = () => {
        if (!token) {
            Navigate("/LoginPage")
            return
        }
    }
    const onsubmit: SubmitHandler<RestaurantInterfaceInput> = async (data) => {
        setLoadingOTP(true)
        if (!token) {
            Navigate("/")
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
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api-restaurant/Create/Restaurant/User`, formdata, {
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

    
    useEffect(() => {
        const payToCheckTheRestaurant = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api-Payment/Payment/Get/Info`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    console.log("Payment data received:", response.data);
                    SetPaymentData(response.data);
                } else {
                    console.error("Unexpected status code:", response.status);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.response) {
                    const errorMessage = error.response.data.message || "Unexpected error occurred.";
                    console.error("Error response:", error.response);

                    // Display an error toast
                    toast.error(
                        <div className="font-serif text-[15px] text-black">
                            {errorMessage}
                        </div>
                    );
                } else {
                    console.error("Network or server issue:", error);

                    // Display a generic error toast
                    toast.error(
                        <div className="font-serif text-[15px] text-black">
                            Network issue or server not responding.
                        </div>
                    );
                }
            }
        };

        if (token) {
            payToCheckTheRestaurant();
        } else {
            console.warn("Token is not available.");
        }
    }, [token]); // Re-run the effect if `token` changes

    const PaymentPageData = async () => {
        try {
            // Initialize Stripe
            const stripe = await loadStripe(
                "pk_test_51Q7VKrP6jlrB3RhjwiYFqR25TaT6c8SGVXjkatIkKyq7nmtGNt4zhAFKF3lbjDUfp4emprVclNUXi1uGni0Vufje006Hvc0x24"
            );

            if (!stripe) {
                toast.error("Stripe initialization failed.");
                return;
            }
            // Retrieve token
            const token = localStorage.getItem("Token");
            if (!token) {
                toast.error("User is not authenticated. Please log in again.");
                return;
            }

            const fromdata = new FormData()
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api-Payment/restaurant/Payment/Restaurant/Data`,
                fromdata,
                {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                }
            );

            // Extract session from response
            const session = response.data;
            // Redirect to Stripe Checkout
            const result = await stripe.redirectToCheckout({ sessionId: session.id });
            if (result.error) {
                console.error("Stripe Error:", result.error.message);
                toast.error(result.error.message);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // Handle different error scenarios
            if (error.response) {
                toast.error(`Server error: ${error.response.data.message}`);
            } else if (error.request) {
                toast.error("Network error occurred. Please try again.");
            } else {
                toast.error(`Error: ${error.message}`);
            }
        }
    }

    return (
        <>
            <div className='flex justify-center w-full bg-black md:p-10 p-0'>
                <>
                    {/* <Elements stripe={stripePromise}> */}

                    {!Payment ?
                        <>
                            {Payment || Payment == null && (
                                <div onClick={() => PaymentPageData()} className='text-white h-10 w-20 bg-red-600'>
                                    PaymentPageData
                                </div>
                            )}
                        </>
                        :
                        <>
                            {!Restaurant ?
                                <>
                                    <div className='grid justify-center items-center grid-cols-1 mb-10 w-[85%]'>
                                        <ToastContainer />
                                        <div className="md:mt-6 mt-0 p-6 rounded shadow-lg font-serif">
                                            <h2 className="text-2xl text-white mb-0 text-center font-serif flex justify-center space-x-1">
                                                {"Create The Restaurant".split("").map((char, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-block animate-bounce"
                                                        style={{
                                                            animationDelay: `${index * 0.1}s`,
                                                            animationDuration: "2s",
                                                        }}
                                                    >
                                                        {char}
                                                    </span>
                                                ))}
                                            </h2>

                                            <form onSubmit={handleSubmit(onsubmit)}>
                                                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 md:mb-4 space-y-3">
                                                    <div>
                                                        <label className="block text-[20px] font-normal text-white md:mb-1">Restaurant</label>
                                                        <input {...register("restaurantName", { required: "Restaurant Name is required", minLength: { value: 1, message: "Name must be at least 5 character" } })}
                                                            type="text"
                                                            name='restaurantName'
                                                            placeholder='Restaurant Name'
                                                            className="w-full px-3 py-2 border mt-3 border-gray-300 rounded bg-black text-white"
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
                                                            type="text"
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
                                                        type='submit'
                                                        onClick={() => CheckTheLoginUser()}
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
                        </>}

                    {/* </Elements> */}
                </>
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
                `${import.meta.env.VITE_BACKEND_URL}/api-restaurant/Restaurant/Updated/${RestaurentID}`,
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
            <div className="p-6 px-10 rounded-lg shadow-lg w-full md:px-56">
                <h2 className="md:text-2xl text-[18px] mb-2 text-white md:mb-0 text-center font-serif flex justify-center space-x-1">
                    {/* Update Restaurant Details */}
                    {"Update Restaurant Details".split("").map((char, index) => (
                        <span
                            key={index}
                            className="inline-block animate-bounce"
                            style={{
                                animationDelay: `${index * 0.1}s`,
                                animationDuration: "2s",
                            }}
                        >
                            {char}
                        </span>
                    ))}
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

                                defaultValue={
                                    filteredRestaurant?.cuisines
                                        ?.map((val) => val.toString()?.replace(/,/g, ""))
                                        .join(" ") || ""
                                }

                                className="w-full px-4 py-2 border border-gray-100 rounded-lg bg-black text-white focus:ring focus:ring-orange-500 focus:outline-none"
                            />
                        </div>
                        <div className="w-full">
                            <label className="block text-lg font-medium text-white mb-1.5">
                                Delivery Time
                            </label>
                            <input
                                {...register("deliveryTime")}
                                type="text"
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