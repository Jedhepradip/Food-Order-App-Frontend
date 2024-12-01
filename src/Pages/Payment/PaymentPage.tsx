import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store/Store";
import { UserInterFaceData } from "../../interface/UserInterface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Store/Store";
import { FetchingUserData } from "../../Redux/Features/UserSlice";
import { SubmitHandler, useForm } from "react-hook-form";

interface PaymentPageProps {
    closePaymentModal: () => void;
}

interface CheckoutFormData {
    email: string;
    fullName: string;
    country: string;
    address: string;
    expiry: string;
    cvc: string;
    MenuItem: [],
}

const PaymentPage: React.FC<PaymentPageProps> = ({ closePaymentModal }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [UserInfo, setUserData] = useState<UserInterFaceData | null>(null);
    const Dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate();
    const UserData = useSelector((state: RootState) => state.User.User)
    const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>();

    useEffect(() => {
        if (UserData) {
            setUserData(UserData)
        }
    }, [UserData, UserInfo])

    useEffect(() => {
        Dispatch(FetchingUserData())
    }, [Dispatch])

    const calculateItemTotal = (price: number, quantity: number) => price * quantity;
    const calculateTotal = () => {
        return UserInfo?.items?.reduce((total, item) =>
            total + calculateItemTotal(item.Menu.price, item.quantity), 0);
    };

    const onsubmit: SubmitHandler<CheckoutFormData> = async (data) => {
        const fromdata = {
            email: data.email,
            name: data.fullName,
            country: data.country,
            address: data.address,
            expiry: data.expiry,
            cvc: data.cvc,
            MenuItem: UserInfo, // Send the array directly without converting to string
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
                "http://localhost:3000/api-Order/OrderTo/Menu/Payment",
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
                closePaymentModal();
                navigate("/OrderPage")
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
                closePaymentModal();
            }, 2500);
        }
    };


    return (
        <>
            <div className="absolute w-full bg-black text-white z-50">
                <ToastContainer />
                <div className="flex flex-col md:flex-row dark:bg-gray-800 w-full h-full justify-center items-center">
                    {/* Product Info Section */}
                    <div className="md:w-1/2 w-full flex dark:bg-gray-900 shadow-lg rounded-lg  from-gray-800 to-gray-900">

                        <div className="container mx-auto p-4 bg-black text-white min-h-screen relative">
                            <p className="font-serif font-extralight text-[30px]">Pay with Cart</p>
                            <div className="overflow-auto relative">
                                <table className="min-w-full ">
                                    <thead>
                                        <tr className='border-b'>
                                            <th className="p-3 text-left">Image</th>
                                            <th className="p-3 text-left">Title</th>
                                            {/* <th className="p-3 text-left">Price</th> */}
                                            <th className="p-3 text-left">Quantity</th>
                                            <th className="p-3 text-left">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {UserInfo?.items.map(item => (
                                            <tr key={item?.Menu?._id} className='border-b'>
                                                <td className="p-3">
                                                    <img
                                                        src={`http://localhost:3000/${item?.Menu?.menuPicture}`}
                                                        alt={item?.Menu?.name} className="w-12 h-12 rounded-full object-cover" />
                                                </td>
                                                <td className="p-3">{item?.Menu?.name}</td>
                                                {/* <td className="p-3">${item?.Menu?.price.toFixed(2)}</td> */}
                                                <td className="px-10 py-3 flex items-center">
                                                    <span>{item?.quantity}</span>
                                                </td>
                                                <td className="p-3">${calculateItemTotal(item?.Menu?.price, item?.quantity).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-3 flex justify-between items-center bg-gray-800 text-black">
                                <span className="text-lg font-bold text-white px-2 text-[21px]">Total</span>
                                <span className="px-4 py-2 font-bold text-[20px] text-white md:mr-12">${calculateTotal()}</span>
                            </div>

                        </div>

                    </div>

                    <div className="md:w-1/2 flex justify-center items-center p-5 bg-black">
                        <div className="bg-gray-950 text-white rounded-lg shadow-lg md:w-[80%] w-full p-7 max-w-xl">
                            <RxCross2 className='float-right text-white text-[23px]' onClick={() => closePaymentModal()} />
                            <p className="font-serif font-extralight text-[30px]">Pay with Cart</p>
                            <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
                                <h2 className="font-serif text-lg text-gray-300">Shipping Information</h2>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-gray-300 font-serif mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Invalid email address",
                                            },
                                        })}
                                        className={`w-full py-2 px-3 rounded-lg bg-gray-800 text-white border ${errors.email ? "border-red-500" : "border-gray-600"
                                            } font-serif`}
                                        placeholder="Enter your email"
                                    />
                                    {errors.email?.message && typeof errors.email.message === "string" && (
                                        <span className="text-red-500 text-sm">{errors.email.message}</span>
                                    )}
                                </div>

                                {/* Address Field */}
                                <div>
                                    <label htmlFor="address" className="block text-white mb-2 font-serif">
                                        Shipping Address:
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        {...register("fullName", { required: "Full Name is required" })}
                                        className={`w-full p-2 px-3 rounded-tr-lg rounded-tl-lg bg-gray-800 text-white border ${errors.fullName ? "border-red-500" : "border-gray-600"
                                            } font-serif`}
                                        placeholder="Enter your full name"
                                    />
                                    {errors.fullName?.message && typeof errors.fullName.message === "string" && (
                                        <span className="text-red-500 text-sm">{errors.fullName.message}</span>
                                    )}

                                    <select
                                        id="uk-cities"
                                        {...register("country", { required: "City is required" })}
                                        className="w-full p-2 px-3 bg-gray-800 text-white border border-gray-600 font-serif"
                                    >
                                        <option value="">Select a city</option>
                                        <option value="london">London</option>
                                        <option value="manchester">Manchester</option>
                                        <option value="birmingham">Birmingham</option>
                                        <option value="glasgow">Glasgow</option>
                                        <option value="edinburgh">Edinburgh</option>
                                        <option value="cardiff">Cardiff</option>
                                        <option value="belfast">Belfast</option>
                                        <option value="leeds">Leeds</option>
                                        <option value="liverpool">Liverpool</option>
                                    </select>
                                    {errors.country?.message && typeof errors.country.message === "string" && (
                                        <span className="text-red-500 text-sm">{errors.country.message}</span>
                                    )}

                                    <input
                                        type="text"
                                        id="address"
                                        {...register("address", { required: "Address is required" })}
                                        className={`w-full p-2 px-3 rounded-br-lg rounded-bl-lg bg-gray-800 text-white border ${errors.address ? "border-red-500" : "border-gray-600"
                                            } font-serif`}
                                        placeholder="Enter your address"
                                    />
                                    {errors.address?.message && typeof errors.address.message === "string" && (
                                        <span className="text-red-500 text-sm">{errors.address.message}</span>
                                    )}
                                </div>

                                {/* Payment Details */}
                                <h2 className="font-serif text-lg text-gray-300">Payment Details</h2>

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

                                <div className="flex gap-4">
                                    <div className="w-1/2">
                                        <input
                                            type="date"
                                            placeholder="MM/YY"
                                            {...register("expiry", { required: "Expiry date is required" })}
                                            className={`w-full p-2 px-3 rounded-lg bg-gray-800 text-white border ${errors.expiry ? "border-red-500" : "border-gray-600"
                                                } font-serif`}
                                        />
                                        {errors.expiry?.message && typeof errors.expiry.message === "string" && (
                                            <span className="text-red-500 text-sm">{errors.expiry.message}</span>
                                        )}
                                    </div>
                                    <div className="w-1/2">
                                        <input
                                            type="text"
                                            placeholder="CVC"
                                            {...register("cvc", { required: "CVC is required" })}
                                            className={`w-full p-2 px-3 rounded-lg bg-gray-800 text-white border ${errors.cvc ? "border-red-500" : "border-gray-600"
                                                } font-serif`}
                                        />
                                        {errors.cvc?.message && typeof errors.cvc.message === "string" && (
                                            <span className="text-red-500 text-sm">{errors.cvc.message}</span>
                                        )}
                                    </div>
                                </div>


                                <div className="flex items-center">
                                    <input type="checkbox" id="billing-info" className="mr-2" />
                                    <label htmlFor="billing-info" className="font-serif text-gray-300">
                                        Billing info is the same as shipping
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-2 text-lg font-serif px-4 rounded-lg text-white ${loading
                                        ? "bg-blue-500 cursor-not-allowed"
                                        : "bg-blue-500 hover:bg-blue-700"
                                        } transition duration-300`}
                                >
                                    {loading ? "Processing..." : "Pay"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentPage;