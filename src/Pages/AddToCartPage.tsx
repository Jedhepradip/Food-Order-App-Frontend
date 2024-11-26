/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { UserInterFaceData } from '../interface/UserInterface';
import { FetchingUserData } from '../Redux/Features/UserSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/Store/Store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
// import { useNavigate } from 'react-router-dom';

import PaymentPage from './Payment/PaymentPage';


const stripePromise = loadStripe("pk_test_51Q7VKrP6jlrB3RhjwiYFqR25TaT6c8SGVXjkatIkKyq7nmtGNt4zhAFKF3lbjDUfp4emprVclNUXi1uGni0Vufje006Hvc0x24")


//Frontent pk_test_51Q7VKrP6jlrB3RhjwiYFqR25TaT6c8SGVXjkatIkKyq7nmtGNt4zhAFKF3lbjDUfp4emprVclNUXi1uGni0Vufje006Hvc0x24

//Backend sk_test_51Q7VKrP6jlrB3RhjFTQN841rp3fXw2YSB51FsLRvNQ3YOnMddwHhNnxLa7DYdJPSGt8Sf4r2sjPq6GKQop8Q2MGU00f5Sjhbm3

const AddToCartPage: React.FC = () => {
    const Dispatch: AppDispatch = useDispatch()
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);
    const [Paymentmodel, ShowPaymentModel] = useState<boolean>(false);
    const [UserInfo, setUserData] = useState<UserInterFaceData | null>(null);
    const UserData = useSelector((state: RootState) => state.User.User)

    useEffect(() => {
        Dispatch(FetchingUserData())
    }, [Dispatch])

    useEffect(() => {
        if (UserData) {
            setUserData(UserData)
        }
    }, [UserData])

    // const [cartItems, setCartItems] = useState([
    //     { id: 1, name: 'Product 1', price: 25, quantity: 2, img: 'https://thumbs.dreamstime.com/b/generative-ai-fruits-vegetables-arranged-heart-shape-healthy-food-nutrition-concept-isolated-business-generative-ai-315051475.jpg' },
    //     { id: 2, name: 'Product 2', price: 15, quantity: 1, img: 'https://thumbs.dreamstime.com/b/generative-ai-fruits-vegetables-arranged-heart-shape-healthy-food-nutrition-concept-isolated-business-generative-ai-315051475.jpg' },
    //     { id: 3, name: 'Product 3', price: 30, quantity: 3, img: 'https://thumbs.dreamstime.com/b/generative-ai-fruits-vegetables-arranged-heart-shape-healthy-food-nutrition-concept-isolated-business-generative-ai-315051475.jpg' },
    // ]);

    // useEffect(() => {
    //     setCartItems([])
    // }, [])

    // const updateQuantity = (id: number | string, action: string) => {
    //     setCartItems(prevItems =>
    //         prevItems.map(item =>
    //             item.id === id
    //                 ? {
    //                     ...item,
    //                     quantity: action === 'increase' ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
    //                 }
    //                 : item
    //         )
    //     );
    // };  

    const calculateItemTotal = (price: number, quantity: number) => price * quantity;

    const calculateTotal = () => {
        return UserInfo?.items.reduce((total, item) =>
            total + calculateItemTotal(item.Menu.price, item.quantity), 0);
    };

    const handleProceedToCheckout = () => {
        setShowCheckoutForm(true);
    };

    const SetThePaymentModel = () => {
        ShowPaymentModel(true)
    }

    const closePaymentModal = () => {
        ShowPaymentModel(false)
        setUserData(null)
    }

    const AddToCartIncreaseQuantity = async (id: number | string,) => {
        const fromdata = new FormData()
        fromdata.append("productId", id.toString())
        try {
            const response = await axios.post(`http://localhost:3000/api-restaurant/AddToCart/Increase/Quantity`, fromdata, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("Token")}`,
                }
            })

            if (response.status === 200) {
                Dispatch(FetchingUserData())
            }

        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                if (error.response.status === 409 || errorMessage === "User already exists") {
                    console.log("Error: User already exists.");
                    toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
                } else {
                    toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
                    console.log("Error:", errorMessage || "Unexpected error occurred.");
                }
            } else {
                console.log("Error: Network issue or server not responding", error);
            }
        }
    }

    const AddToCartdecreaseQuantity = async (id: number | string,) => {
        const fromdata = new FormData()
        fromdata.append("productId", id.toString())
        try {
            const response = await axios.post(`http://localhost:3000/api-restaurant/AddToCart/Decrease/Quantity`, fromdata, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("Token")}`,
                }
            })

            if (response.status === 200) {
                Dispatch(FetchingUserData())
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
                    console.log("Error:", errorMessage || "Unexpected error occurred.");
                }
            } else {
                console.log("Error: Network issue or server not responding", error);
            }
        }
    }

    const RemoveToaddToCart = async (id: number | string) => {
        try {
            const response = await axios.put(`http://localhost:3000/api-restaurant/AddToCart/Remove/MenuItems/${id}`, {}, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("Token")}`,
                }
            })

            if (response.status === 200) {
                Dispatch(FetchingUserData())
            }
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                if (error.response.status === 409 || errorMessage === "User already exists") {
                    console.log("Error: User already exists.");
                    toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
                } else {
                    toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
                    console.log("Error:", errorMessage || "Unexpected error occurred.");
                }
            } else {
                console.log("Error: Network issue or server not responding", error);
            }
        }
    };

    const ClearAllAddToCart = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/api-restaurant/ClearAll/AddToCart`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("Token")}`,
                }
            })

            if (response.status === 200) {
                Dispatch(FetchingUserData())
            }
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                if (error.response.status === 409 || errorMessage === "User already exists") {
                    console.log("Error: User already exists.");
                    toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
                } else {
                    toast.error(<div className='font-serif text-[15px] text-black'>{errorMessage}</div>);
                    console.log("Error:", errorMessage || "Unexpected error occurred.");
                }
            } else {
                console.log("Error: Network issue or server not responding", error);
            }
        }
    };

    return (

        <>
            <Elements stripe={stripePromise}>
                <ToastContainer />
                <div className='flex justify-center w-full '>
                    {/* grid grid-cols-1 place-items-center fixed inset-0 z-50 bg-black/60 */}
                    {showCheckoutForm && (
                        <div className='fixed inset-0 z-50 bg-black/85 place-items-center grid grid-cols-1'>
                            <div className="mt-6 p-6 bg-gray-900 rounded shadow-lg absolute z-50 w-[480px] ">
                                <RxCross2 className='float-right text-white text-[23px]' onClick={() => setShowCheckoutForm(false)} />
                                <h3 className="text-xl font-semibold mb-2 text-white">Review Your Order</h3>
                                <p className='text-[14px] text-gray-400 mb-2'>Double-check your delivery details ensure erveryting's in order. When you're ready,hit confirm to finalize your order</p>
                                <form>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-white">Name</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                                                defaultValue={UserInfo?.name}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white">Email</label>
                                            <input
                                                type="email"
                                                className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                                                value={UserInfo?.email}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white">Contact</label>
                                            <input
                                                type="tel"
                                                className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                                                defaultValue={UserInfo?.contact}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white">Address</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                                                defaultValue={UserInfo?.address}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white">City</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                                                defaultValue={UserInfo?.city}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-white">Country</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-600 rounded bg-gray-900 text-white"
                                                defaultValue={UserInfo?.country}
                                            />
                                        </div>
                                    </div>

                                    <button className="px-4 py-2 bg-orange-500 float-right hover:bg-orange-600 text-white rounded" onClick={() => SetThePaymentModel()}>
                                        Continue to payment
                                    </button>
                                </form>

                            </div>
                        </div>
                    )}
                </div>

                <div className="container mx-auto p-4 bg-black text-white min-h-screen relative">

                    <h2 className="text-2xl font-bold mb-1">Shopping Cart</h2>

                    <div className="flex justify-end mb-4 px-[150px]">
                        <button
                            onClick={() => ClearAllAddToCart()}
                            className="px-4 py-2 font-bold"
                        >
                            Clear All
                        </button>
                    </div>

                    <div className="overflow-auto">
                        <table className="min-w-full ">
                            <thead>
                                <tr className='border-b'>
                                    <th className="p-3 text-left">Image</th>
                                    <th className="p-3 text-left">Title</th>
                                    <th className="p-3 text-left">Price</th>
                                    <th className="p-3 text-left">Quantity</th>
                                    <th className="p-3 text-left">Total</th>
                                    <th className="p-3 text-left">Remove</th>
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
                                        <td className="p-3">${item?.Menu?.price.toFixed(2)}</td>
                                        <td className="p-3 flex items-center space-x-2">

                                            {item.quantity > 1 ?
                                                <>
                                                    <button
                                                        // onClick={() => updateQuantity(item?.Menu?._id, 'decrease')}
                                                        onClick={() => AddToCartdecreaseQuantity(item?.Menu?._id)}
                                                        className="px-1 py-1 bg-gray-400 hover:bg-gray-600 text-white rounded-full"
                                                    >
                                                        <FaMinus />
                                                    </button>
                                                </>
                                                :
                                                <>
                                                    <button
                                                        // onClick={() => updateQuantity(item?.Menu?._id, 'decrease')}
                                                        // onClick={() => AddToCartdecreaseQuantity(item?.Menu?._id)}
                                                        className="px-1 py-1 bg-gray-400 hover:bg-gray-600 text-white rounded-full"
                                                    >
                                                        <FaMinus />
                                                    </button>
                                                </>
                                            }

                                            <span>{item?.quantity}</span>
                                            <button
                                                // onClick={() => updateQuantity(item?.Menu?._id, 'increase')}
                                                onClick={() => AddToCartIncreaseQuantity(item?.Menu?._id)}
                                                className="px-1 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full"
                                            >
                                                <FaPlus />
                                            </button>
                                        </td>
                                        <td className="p-3">${calculateItemTotal(item?.Menu?.price, item?.quantity).toFixed(2)}</td>
                                        <td className="p-3">
                                            <button
                                                onClick={() => RemoveToaddToCart(item?.Menu?._id)}
                                                className="px-2 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-3 flex justify-between items-center md:pr-[100px] bg-gray-800 text-black">
                        <span className="text-lg font-bold text-white px-2 text-[21px]">Total</span>
                        <span className="px-4 py-2 font-bold text-[20px] text-white md:mr-12">${calculateTotal()}</span>
                    </div>

                    {/* Proceed to Checkout button */}
                    <div className="mt-4 flex justify-end md:pr-[100px]">
                        <button onClick={handleProceedToCheckout} className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded">
                            Proceed to Checkout
                        </button>
                    </div>

                </div>

                {Paymentmodel && UserInfo?.items?.length && (
                    <PaymentPage
                        SelectMenu={UserInfo.items}
                        closePaymentModal={closePaymentModal}
                    />
                )}


            </Elements>
        </>
    );
};


// const PaymentModel = ({ selectedProduct, closePaymentModal }) => {

//     const stripe = useStripe();
//     const elements = useElements();
//     const [loading, setLoading] = useState(false);
//     const [userName, setUserName] = useState("");
//     const [userEmail, setUserEmail] = useState("");
//     const navigate = useNavigate();


//     const handlePayment = async (event: any) => {
//         event.preventDefault();
//         if (!stripe || !elements) return;
//         setLoading(true);
//         try {
//             const Token = localStorage.getItem("Token");
//             // Check if the token exists, if not redirect to login page
//             if (!Token) {
//                 toast.error('You need to log in first.');
//                 return navigate("/login");
//             }

//             // Initiating API call to create payment intent

//             const { data } = await axios.post('https://hotel-management-server-1-n9cs.onrender.com/Payment/api/create-payment-intent', {
//                 // const { data } = await axios.post('http://localhost:3000/Payment/api/create-payment-intent', {
//                 amount: Number(selectedProduct.price),
//                 RoomsId: selectedProduct._id,
//                 userName, // Ensure userName is available
//                 userEmail, // Ensure userEmail is available
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${Token}`,
//                 },
//             });

//             const clientSecret = data.clientSecret;
//             if (!clientSecret) {
//                 throw new Error("Failed to retrieve payment intent.");
//             }

//             // Confirming the payment
//             const result = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: elements.getElement(CardElement),
//                     billing_details: {
//                         name: userName,
//                         email: userEmail,
//                     },
//                 },
//             });

//             if (result.error) {
//                 console.error('Payment failed:', result.error.message);
//                 toast.error(result.error.message);
//                 toast.error(<div className='text-red-600 font-serif'>{result.error.message}</div>);

//             } else if (result.paymentIntent?.status === 'succeeded') {
//                 toast.success(<div className='text-black font-serif'>Payment succeeded!</div>);
//                 console.log('Payment succeeded:', result.paymentIntent);
//             } else {
//                 toast.error(<div className='font-serif text-red-600 '>Payment status is not successful.</div>);
//             }
//         } catch (error: any) {
//             // Differentiating error types and messages
//             if (error.response) {
//                 console.error('API error:', error.response.data.message);
//                 toast.error(<div className='font-serif text-red-600 '>{error.response.data.message}</div>);
//             } else if (error.request) {
//                 console.error('Network error:', error.request);
//                 toast.error(<div className='font-serif text-600'>Network error occurred. Please try again.</div>);
//             } else {
//                 console.error('General error:', error.message);
//                 toast.error(<div className='font-serif text-red-600'>{error.message}</div>);
//             }
//         } finally {
//             setLoading(false);
//             setTimeout(() => {
//                 closePaymentModal();
//             }, 2500);
//         }

//     };


//     return (
//         <>
//             <ToastContainer />
//             <div className=" inset-0 bg-gray-800 bg-opacity-75 md:flex md:items-center md:justify-center flex justify-center items-center z-50 absolute md:p-40">
//                 <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg md:p-6 md:w-[55%] w-[80%] p-7 max-w-2xl md:mt-44 relative mb-[2000px]">
//                     <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white text-center">{selectedProduct.title}</h2>
//                     <p className="text-gray-700 dark:text-gray-300 mb-6 text-center ">Price: ₹{selectedProduct.price}</p>

//                     <form onSubmit={handlePayment} className="space-y-2">

//                         <div className="p-2">
//                             <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2 font-serif">Name:</label>
//                             <input
//                                 type="text"
//                                 id="name"
//                                 value={userName}
//                                 onChange={(e) => setUserName(e.target.value)}
//                                 className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-serif"
//                                 placeholder="Enter your name"
//                                 required
//                             />
//                         </div>


//                         <div className="p-2">
//                             <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2 font-serif">Email:</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 value={userEmail}
//                                 onChange={(e) => setUserEmail(e.target.value)}
//                                 className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-serif"
//                                 placeholder="Enter your email"
//                                 required
//                             />
//                         </div>


//                         <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
//                             <CardElement
//                                 className="p-2"
//                                 options={{
//                                     style: {
//                                         base: {
//                                             fontSize: '16px',
//                                             color: '#424770',
//                                             '::placeholder': {
//                                                 color: '#aab7c4',
//                                             },
//                                         },
//                                         invalid: {
//                                             color: '#9e2146',
//                                         },
//                                     },
//                                 }}
//                             />
//                         </div>


//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className={`w-full py-3 px-4 rounded-lg text-white ${loading ? 'bg-blue-500 loading' : 'bg-blue-500 hover:bg-blue-700'} transition duration-300`}
//                         >
//                             {loading ? 'Processing...' : `Pay ₹${selectedProduct.price}`}
//                         </button>
//                     </form>

//                     <button
//                         onClick={closePaymentModal}
//                         className="absolute md:top-4 md:right-4 top-2 right-1 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white rounded-full md:px-3 md:py-1 px-2 text-xl transition duration-300"
//                     >
//                         &times;
//                     </button>
//                 </div>
//             </div>
//         </>
//     )
// }

export default AddToCartPage;