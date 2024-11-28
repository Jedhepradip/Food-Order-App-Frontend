import { useState, useEffect } from "react";
import { CartItem } from "../../interface/UserInterface";
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { RxCross2 } from "react-icons/rx";

interface PaymentPageProps {
    SelectMenu: string | number | CartItem[];
    closePaymentModal: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ SelectMenu, closePaymentModal }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    const handlePayment = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) return;
        setLoading(true);

        try {
            const Token = localStorage.getItem('Token');
            if (!Token) {
                toast.error('You need to log in first.');
                return navigate('/login');
            }

            const { data } = await axios.post(
                'https://hotel-management-server-1-n9cs.onrender.com/Payment/api/create-payment-intent',
                {
                    userName,
                    userEmail,
                },
                {
                    headers: {
                        Authorization: `Bearer ${Token}`,
                    },
                }
            );

            const clientSecret = data.clientSecret;
            if (!clientSecret) {
                toast.error(<div>Failed to retrieve payment intent.</div>)
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                    billing_details: {
                        name: userName,
                        email: userEmail,
                    },
                },
            });

            if (result.error) {
                toast.error(result.error.message);
            } else if (result.paymentIntent?.status === 'succeeded') {
                closePaymentModal();
                toast.success('Payment succeeded!');
            } else {
                toast.error('Payment status is not successful.');
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else if (error.request) {
                toast.error('Network error occurred. Please try again.');
            } else {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
            setTimeout(() => {
                // closePaymentModal();
            }, 2500);
        }
    };

    useEffect(() => {
        console.log("SelectMenu :", SelectMenu);
        setUserName("pradip")
    }, [SelectMenu, userName])

    const order = [
        {
            id: 1,
            image: 'https://thumbs.dreamstime.com/b/generative-ai-fruits-vegetables-arranged-heart-shape-healthy-food-nutrition-concept-isolated-business-generative-ai-315051475.jpg',
            title: 'Product 1',
            price: 49.99,
        },
        {
            id: 2,
            image: 'https://thumbs.dreamstime.com/b/generative-ai-fruits-vegetables-arranged-heart-shape-healthy-food-nutrition-concept-isolated-business-generative-ai-315051475.jpg',
            title: 'Product 2',
            price: 89.99,
        },
        {
            id: 3,
            image: 'https://thumbs.dreamstime.com/b/generative-ai-fruits-vegetables-arranged-heart-shape-healthy-food-nutrition-concept-isolated-business-generative-ai-315051475.jpg',
            title: 'Product 3',
            price: 29.99,
        },
    ];

    return (
        <>
            <div className="absolute w-full bg-black text-white z-50">
                <ToastContainer />
                <div className="flex flex-col md:flex-row dark:bg-gray-800 w-full h-full justify-center items-center">
                    {/* Product Info Section */}
                    <div className="md:w-1/2 w-full flex dark:bg-gray-900 shadow-lg rounded-lg  from-gray-800 to-gray-900">

                        <div className="flex w-full flex-col mt-10 px-10  min-h-screen bg-black text-white">
                            <div className="bg-gray-950 shadow-lg rounded-lg p-6 w-full max-w-">
                                {/* Order Item */}
                                {order.map((val, index) => (
                                    <div className="flex items-center justify-between mb-4" key={index}>
                                        {/* Display order number */}
                                        <img src={val.image} alt={val.title} className="w-16 h-16 rounded-lg object-cover" />

                                        {/* Align title text to the start */}
                                        <div className="ml-4 flex-1">
                                            <h3 className="text-lg font-medium text-left">{val.title}</h3>
                                        </div>
                                        <div>
                                            <p className="text-white mt-1">₹ {val.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>


                    <div className="md:w-1/2 flex justify-center items-center p-5 bg-black">
                        <div className="bg-gray-950 text-white rounded-lg shadow-lg md:w-[80%] w-full p-7 max-w-xl">
                            <RxCross2 className='float-right text-white text-[23px]' onClick={() => closePaymentModal()} />
                            <p className="font-serif font-extralight text-[30px]">Pay with Cart</p>
                            <form onSubmit={handlePayment} className="space-y-4 ">
                                <span className="font-serif font-extralight">Shipping information</span>

                                {/* Email Field */}
                                <div className="p-">
                                    <label htmlFor="email" className="block text-white mb-2 font-serif">
                                        Email:
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                        className="w-full py-2 px-3 rounded-lg bg-gray-800 text-white border border-gray-600 font-serif"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                {/* Address Field */}
                                <div>
                                    <label htmlFor="address" className="block text-white mb-2 font-serif">
                                        Shipping Address:
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        className="w-full p-2 px-3 rounded-tr-lg rounded-tl-lg bg-gray-800 text-white border border-gray-600 font-serif"
                                        placeholder="Full Name"
                                        required
                                    />

                                    <select
                                        id="uk-cities"
                                        name="uk-cities"
                                        className="w-full p-3 px-3 bg-gray-800 text-white border border-gray-600 font-serif"
                                    >
                                        <option value="london">United Kingdom</option>
                                        <option value="manchester">Manchester</option>
                                        <option value="birmingham">Birmingham</option>
                                        <option value="glasgow">Glasgow</option>
                                        <option value="edinburgh">Edinburgh</option>
                                        <option value="cardiff">Cardiff</option>
                                        <option value="belfast">Belfast</option>
                                        <option value="leeds">Leeds</option>
                                        <option value="liverpool">Liverpool</option>
                                    </select>

                                    <input
                                        type="text"
                                        id="address"
                                        className="w-full p-2 px-3 rounded-bl-lg rounded-br-lg bg-gray-800 text-white border border-gray-600 font-serif"
                                        placeholder="Address"
                                        required
                                    />
                                </div>

                                {/* Payment Details */}
                                <p className="font-serif font-extralight text-[20px]">Payment Details</p>
                                <span className="font-serif font-extralight m-0 p-0 mt-2 text-gray-500">Cart information</span>

                                <div className="py-2.5 px-2.5 bg-gray-800 rounded-lg border border-gray-600">
                                    <CardElement
                                        className="p-0"
                                        options={{
                                            style: {
                                                base: {
                                                    fontSize: "16px",
                                                    color: "#ffffff", // Updated to white for better contrast
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

                                <div className="flex justify-between items-center">
                                    <div className="w-1/2 pr-0">
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            className="w-full p-2 px-3 rounded-tl-lg rounded-bl-lg bg-gray-800 text-white border border-gray-600 font-serif"
                                            required
                                        />
                                    </div>
                                    <div className="w-1/2 pl-0">
                                        <input
                                            type="text"
                                            placeholder="CVC"
                                            className="w-full p-2 px-3 rounded-tr-lg rounded-br-lg bg-gray-800 text-white border border-gray-600 font-serif"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center mb-4 ml-1">
                                    <input
                                        type="checkbox"
                                        id="show-payment-info"
                                        className="mr-1"
                                    />
                                    <label htmlFor="show-payment-info" className="font-serif text-gray-500">
                                        Billing info is same as Shipping
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-2 text-[20px] font-serif px-4 rounded-lg text-white ${loading ? "bg-blue-500 loading" : "bg-blue-500 hover:bg-blue-700"} transition duration-300`}
                                >
                                    {loading ? "Processing..." : `Pay`}
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