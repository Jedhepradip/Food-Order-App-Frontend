import React, { useEffect, useState } from 'react'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from '@stripe/stripe-js'
import { useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler } from "react-hook-form"
import { AppDispatch, RootState } from '../Redux/Store/Store';
import { FetchingUserData } from '../Redux/Features/UserSlice';
import { UserInterFaceData } from '../interface/UserInterface';
import { FetchingRestaurant } from '../Redux/Features/RestaurantSlice';
import { RestaurantInterface } from '../interface/RestaurantInterface';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { FetchingUserAllRestaurant } from '../Redux/Features/RestaurantAllSlice';

const stripePromise = loadStripe("pk_test_51Q7VKrP6jlrB3RhjwiYFqR25TaT6c8SGVXjkatIkKyq7nmtGNt4zhAFKF3lbjDUfp4emprVclNUXi1uGni0Vufje006Hvc0x24")


interface PaymentPageProps {
    SetShowMenuId: string | number,
}

interface CheckoutFormData {
    email: string;

}

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
            const response = await axios.post("https://food-order-app-backend-9.onrender.com/api-restaurant/Create/Restaurant/User", formdata, {
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
            console.log("okok");
            try {
                const response = await axios.get("http://localhost:3000/api-Payment/Payment/Get/Info", {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("Token")}`
                    }
                });
                console.log("Response data:", response.data);
                const restaurant = response.data;
                if (response.status === 200) {
                    console.log("Paymentdata Get ", restaurant);
                    SetPaymentData(restaurant)
                }
            } catch (error) {
                // if (error.response) {
                //     const errorMessage = error.response.data.message;
                //     if (error.response.status === 409 || errorMessage === "User already exists") {
                //         console.log("Error: User already exists.");
                //         toast.error(
                //             <div className="font-serif text-[15px] text-black">
                //                 {errorMessage}
                //             </div>
                //         );
                //     } else {
                //         toast.error(
                //             <div className="font-serif text-[15px] text-black">
                //                 {errorMessage || "Unexpected error occurred."}
                //             </div>
                //         );
                //         console.log("Error: ", errorMessage);
                //     }
                // } else {
                //     console.log("Error: Network issue or server not responding", error);
                // }
                console.log(error);
            }
        };
        payToCheckTheRestaurant(); // Call the async function
    }, [token]);

    return (
        <>
            <div className='flex justify-center w-full bg-black md:p-10 p-0'>
                <>
                    <Elements stripe={stripePromise}>

                        { !Payment ?
                            <>
                                {Payment || Payment == null && (
                                    <PaymentPageData
                                        SetShowMenuId={11}
                                    />
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

                    </Elements>
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
                `https://food-order-app-backend-9.onrender.com/api-restaurant/Restaurant/Updated/${RestaurentID}`,
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

const PaymentPageData: React.FC<PaymentPageProps> = ({ SetShowMenuId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [UserInfo, setUserData] = useState<UserInterFaceData | null>(null);
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const UserData: any = useSelector((state: RootState) => state.User.User)
    const { handleSubmit } = useForm<CheckoutFormData>();
    console.log(SetShowMenuId);
    useEffect(() => {
        if (UserData) {
            setUserData(UserData)
        }
    }, [UserData, UserInfo])

    useEffect(() => {
        dispatch(FetchingUserData());
    }, [dispatch]);

    const onsubmit: SubmitHandler<CheckoutFormData> = async () => {
        const fromdata = {
            totaleAmount: "50000"
        };
        if (!stripe || !elements) return;
        setLoading(true);

        try {
            const Token = localStorage.getItem("Token");
            if (!Token) {
                toast.error("You need to log in first.");
                return navigate("/login");
            }

            const { data } = await axios.post(
                // `https://food-order-app-backend-9.onrender.com/api-Order/OrderTo/Menu/Payment/${UserInfo?._id}`,
                `http://localhost:3000/api-Order/OrderTo/Menu/Payment/${UserInfo?._id}`,
                fromdata, // Send FormData directly,
                {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${Token}`, // Do not set Content-Type manually
                    },
                }
            );

            setLoading(false);

            const clientSecret = data.clientSecret;
            if (!clientSecret) {
                toast.error(<div>Failed to retrieve payment intent.</div>);
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                    billing_details: {
                        email: data.email,
                        name: data.fullName,
                        address: data.address,
                    },
                },
            });

            if (result.error) {
                toast.error(result.error.message);
            } else if (result.paymentIntent?.status === "succeeded") {
                // payToCheckTheRestaurant()             
                toast.success("Payment succeeded!");
            } else {
                toast.error("Payment status is not successful.");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else if (error.request) {
                toast.error("Network error occurred. Please try again.");
            } else {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
            setTimeout(() => {
            }, 2500);
        }
    };

    return (
        <>
            <div className="absolute w-full bg-black text-white z-30">
                <ToastContainer />
                <div className="flex flex-col md:flex-row dark:bg-gray-800 w-full h-full justify-center items-center">
                    {/* Product Info Section */}
                    <div className="md:w-1/2 p-5 w-full flex dark:bg-gray-950 shadow-lg rounded-lg from-gray-950 to-gray-900">
                        <div className="p-5 animate-fade-in-up">
                            <h1 className="font-serif text-3xl text-blue-500 animate-bounce">CraveCourier Website Registration Fees</h1>
                            <p className="mt-3 text-lg text-gray-300 animate-pulse">
                                Complete your registration for <span className="text-yellow-400">CraveCourier</span> with a one-time
                                registration fee of <span className="text-green-400 font-bold">₹50,000</span>. This fee ensures
                                premium access and benefits tailored to your needs.
                            </p>
                            <p className="mt-3 text-lg text-gray-300 animate-fade-in">
                                By registering, you gain exclusive access to CraveCourier's advanced features, such as seamless courier tracking,
                                priority shipping benefits, and a dedicated support team. Start growing your business with unmatched reliability.
                            </p>
                            <div className="mt-5 animate-pulse">
                                <p className="text-lg text-gray-200">Payment Information:</p>
                                <ul className="mt-2 list-disc list-inside text-gray-400 animate-slide-in">
                                    <li>Email: <span className="text-gray-200">{"userEmail"}</span></li>
                                    <li>Contact: <span className="text-gray-200">{"userContact"}</span></li>
                                    <li>Amount to Pay: <span className="text-green-400">₹50,000</span></li>
                                </ul>
                            </div>
                            <p className="mt-3 text-gray-300 animate-fade-in">
                                Join <span className="text-yellow-400">CraveCourier</span> today and experience efficiency like never before.
                                Make your payments securely and confidently. Let us help you take your courier business to the next level.
                            </p>
                        </div>
                    </div>

                    {/* Payment Form Section */}
                    <div className="md:w-1/2 w-full flex dark:bg-gray-950 shadow-lg md:p-12 p-5 rounded-lg from-gray-950 to-gray-900">
                        <div className="bg-gray-950 text-white rounded-lg shadow-lg md:w-[80%] w-full p-7 max-w-xl animate-zoom-in">
                            <p className="font-serif font-extralight text-[30px]">Pay with Card</p>
                            <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
                                {/* Payment Details */}
                                <h2 className="font-serif text-lg text-gray-300 animate-slide-in">Payment Details</h2>

                                <div className="py-3 px-2.5 bg-gray-800 rounded-lg border border-gray-600">
                                    <CardElement
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: "16px",
                                                    color: "#ffffff",
                                                    "::placeholder": {
                                                        color: "#aab7c4",
                                                    },
                                                },
                                                invalid: {
                                                    color: "#9e2146",
                                                },
                                            },
                                        }}
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-2 text-lg font-serif px-4 rounded-lg text-white ${loading
                                        ? "bg-blue-500 cursor-not-allowed animate-pulse"
                                        : "bg-blue-500 hover:bg-blue-700 animate-fade-in"
                                        } transition duration-300`}
                                >
                                    {loading ? "Processing..." : "Pay ₹50,000"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};


export default RestaurantPages