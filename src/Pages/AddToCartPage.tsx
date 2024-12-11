/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { UserInterFaceData } from '../interface/UserInterface';
import { FetchingUserData } from '../Redux/Features/UserSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/Store/Store';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { ToastContainer, toast } from 'react-toastify';
import PaymentPage from './Payment/PaymentPage';
import { NavLink } from 'react-router-dom';
const stripePromise = loadStripe("pk_test_51Q7VKrP6jlrB3RhjwiYFqR25TaT6c8SGVXjkatIkKyq7nmtGNt4zhAFKF3lbjDUfp4emprVclNUXi1uGni0Vufje006Hvc0x24")

//Backend sk_test_51Q7VKrP6jlrB3RhjFTQN841rp3fXw2YSB51FsLRvNQ3YOnMddwHhNnxLa7DYdJPSGt8Sf4r2sjPq6GKQop8Q2MGU00f5Sjhbm3

const AddToCartPage: React.FC = () => {
    const Dispatch: AppDispatch = useDispatch()
    const [loadingClearAll, SetLoadingClearAll] = useState(false)
    const [loadingRemove, SetLoadingRemove] = useState(false)
    const [loadingBuyNow, SetLoadingBuyNow] = useState(false)
    const [loadingPayment, SetContinuePayment] = useState(false)
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);
    const [Paymentmodel, ShowPaymentModel] = useState<boolean>(false);
    const [UserInfo, setUserData] = useState<UserInterFaceData | null>(null);
    const UserData = useSelector((state: RootState) => state.User.User)
    const [MenuID, SetMenuId] = useState<string | number>("")

    useEffect(() => {
        Dispatch(FetchingUserData())
    }, [Dispatch])

    useEffect(() => {
        if (UserData) {
            setUserData(UserData)
        }
    }, [UserData])

    const calculateItemTotal = (price: number, quantity: number) => price * quantity;

    const calculateTotal = () => {
        return UserInfo?.items.reduce((total, item) =>
            total + calculateItemTotal(item.Menu.price, item.quantity), 0);
    };

    const handleProceedToCheckout = (menuId: number | string,) => {
        SetLoadingBuyNow(true)
        setTimeout(() => {
            SetLoadingBuyNow(false)
            setShowCheckoutForm(true);
            SetMenuId(menuId)
        }, 1200);
    };

    const SetThePaymentModel = () => {
        SetContinuePayment(true)
        setTimeout(() => {
            ShowPaymentModel(true)
            setShowCheckoutForm(false)
            SetContinuePayment(false)
        }, 1200);
    }

    const closePaymentModal = () => {
        ShowPaymentModel(true)
        SetMenuId("")
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
        SetLoadingRemove(true)
        try {
            const response = await axios.put(`http://localhost:3000/api-restaurant/AddToCart/Remove/MenuItems/${id}`, {}, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("Token")}`,
                }
            })

            if (response.status === 200) {
                setTimeout(() => {
                    SetLoadingRemove(false)
                    Dispatch(FetchingUserData())
                }, 1200);
            }
        } catch (error: any) {
            if (error.response) {
                SetLoadingRemove(false)
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
        SetLoadingClearAll(true)
        try {
            const response = await axios.delete(`http://localhost:3000/api-restaurant/ClearAll/AddToCart`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("Token")}`,
                }
            })

            if (response.status === 200) {
                setTimeout(() => {
                    SetLoadingClearAll(false)
                    Dispatch(FetchingUserData())
                }, 1200);
            }
        } catch (error: any) {
            if (error.response) {
                SetLoadingClearAll(false)
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
            <div className='realtive w-full h-full bg-black'>
                <Elements stripe={stripePromise}>
                    <ToastContainer />
                    {Paymentmodel && MenuID && (
                        <PaymentPage
                            SetShowMenuId={MenuID}
                            closePaymentModal={closePaymentModal}
                        />
                    )}
                    <div className='flex justify-center w-full relative'>
                        {showCheckoutForm && (
                            <div className='inset-0 z-50 bg-black/85  place-items-center grid grid-cols-1'>
                                <div className="mt-6 p-10 bg-black rounded shadow-lg z-50 w-[480px]">
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

                                        {/* <button className="px-4 py-2 bg-orange-500 float-right hover:bg-orange-600 text-white rounded font-serif" onClick={() => SetThePaymentModel()}>
                                            Continue to payment
                                        </button> */}

                                        {/* <div className="w-ful pb-2 flex overflow-hidden "> */}
                                        <button
                                            onClick={() => SetThePaymentModel()}
                                            // type='submit'
                                            className={`px-4 py-2 flex bg-orange-500 float-right hover:bg-orange-600 text-white rounded font-serif ${loadingPayment ? 'cursor-not-allowed' : ''} ${loadingPayment ? 'animate-pulse' : ''}`}
                                            disabled={loadingPayment}
                                        >
                                            {loadingPayment && (
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
                                            <span>{loadingPayment ? 'Loading...' : ' Continue To Payment'}</span>
                                        </button>
                                        {/* </div> */}

                                    </form>

                                </div>
                            </div>
                        )}
                    </div>

                    <div className="container mx-auto p-4 bg-black md:block hidden text-white min-h-screen ">

                        <h2 className="text-2xl font-bold mb-1">Shopping Cart</h2>

                        <div className="flex justify-end mb-4 px-[150px]">
                            <div className="w-ful pb-2">
                                <button onClick={() => ClearAllAddToCart()}
                                    // type='submit'
                                    className={`px-6 py-2 flex bg-orange-500 float-right md:mt-0 mt-3 md:mr-0 mr-6 hover:bg-orange-600 rounded font-serif ${loadingClearAll ? 'cursor-not-allowed' : ''} ${loadingClearAll ? 'animate-pulse' : ''}`}
                                    disabled={loadingClearAll}
                                >
                                    {loadingClearAll && (
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
                                    <span>{loadingClearAll ? 'Loading...' : 'Clear All'}</span>
                                </button>
                            </div>
                        </div>

                        <div className="overflow-auto relative">
                            <table className="min-w-full ">
                                <thead>
                                    <tr className='border-b'>
                                        <th className="p-3 text-left">Image</th>
                                        <th className="p-3 text-left">Title</th>
                                        <th className="p-3 text-left">Price</th>
                                        <th className="p-3 text-left">Quantity</th>
                                        <th className="p-3 text-left">Total</th>
                                        <th className="p-0 text-left">Remove</th>
                                        <th className="p-0 text-left">BUY NOW </th>
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
                                                            onClick={() => AddToCartdecreaseQuantity(item?.Menu?._id)}
                                                            className="px-1 py-1 bg-gray-400 hover:bg-gray-600 text-white rounded-full"
                                                        >
                                                            <FaMinus />
                                                        </button>
                                                    </>
                                                    :
                                                    <>
                                                        <button
                                                            className="px-1 py-1 bg-gray-400 hover:bg-gray-600 text-white rounded-full"
                                                        >
                                                            <FaMinus />
                                                        </button>
                                                    </>
                                                }

                                                <span>{item?.quantity}</span>
                                                <button
                                                    onClick={() => AddToCartIncreaseQuantity(item?.Menu?._id)}
                                                    className="px-1 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full"
                                                >
                                                    <FaPlus />
                                                </button>
                                            </td>

                                            <td className="p-3">${calculateItemTotal(item?.Menu?.price, item?.quantity).toFixed(2)}
                                            </td>

                                            <td className="p-0">
                                                <div className="w-ful pb-2 flex">
                                                    <button
                                                        onClick={() => RemoveToaddToCart(item?.Menu?._id)}
                                                        // type='submit'
                                                        className={`px-2 py-1 flex bg-orange-500 hover:bg-orange-600 text-white rounded font-serif${loadingRemove ? 'cursor-not-allowed' : ''} ${loadingRemove ? 'animate-pulse' : ''}`}
                                                        disabled={loadingRemove}
                                                    >
                                                        {loadingRemove && (
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
                                                        <span>{loadingRemove ? 'Loading...' : 'Remove'}</span>
                                                    </button>
                                                </div>

                                            </td>

                                            <td className="p-0">
                                                <div className="w-ful pb-2 flex overflow-hidden ">
                                                    <button
                                                        onClick={() => handleProceedToCheckout(item?.Menu?._id)}
                                                        // type='submit'
                                                        className={`px-2 py-1 flex bg-orange-500 hover:bg-orange-600 text-white rounded font-serif${loadingBuyNow ? 'cursor-not-allowed' : ''} ${loadingBuyNow ? 'animate-pulse' : ''}`}
                                                        disabled={loadingBuyNow}
                                                    >
                                                        {loadingBuyNow && (
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
                                                        <span>{loadingBuyNow ? 'Loading...' : 'Buy Now'}</span>
                                                    </button>
                                                </div>
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
                            <NavLink to={"/"} >
                                <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded font-serif">
                                    {/* Proceed to Checkout                                 */}
                                    Continue Shopping
                                </button>
                            </NavLink>
                        </div>
                    </div>

                    <div className='md:hidden block '>
                        <div className="p-4 bg-black min-h-screen text-white">
                            <h2 className="text-2xl font-medium font-serif mb-5">Shopping Cart</h2>
                            <div className="space-y-4">
                                {UserInfo?.items?.map((item) => (
                                    <div
                                        key={item.Menu._id}
                                        className="flex items-center bg-gray-0 border p-3 rounded-lg shadow-md"
                                    >
                                        <img
                                            src={item.Menu.menuPicture}
                                            // alt={"Img Not Found"}
                                            className="w-16 h-16 rounded-md object-cover"
                                        />
                                        <div className="ml-3 flex-1">
                                            <h2 className="text-sm font-semibold">{item.Menu.name}</h2>
                                            <p className="text-sm text-gray-400">Price: ${item.Menu.price}</p>
                                            <div className="flex items-center space-x-2 text-sm text-gray-400">
                                                <button
                                                    onClick={() => AddToCartdecreaseQuantity(item?.Menu?._id)}
                                                    className="bg-orange-500 text-white px-2 py-1 rounded-md"
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() => AddToCartIncreaseQuantity(item?.Menu?._id)}
                                                    className="bg-orange-500 text-white px-2 py-1 rounded-md"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <p className="text-sm text-gray-300 font-bold">
                                                Total: ${calculateItemTotal(item?.Menu?.price, item.quantity)}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => RemoveToaddToCart(item.Menu._id)}
                                            className="text-red-500 font-semibold text-sm"
                                        >
                                            Remove
                                        </button>
                                        <button
                                            onClick={() => handleProceedToCheckout(item?.Menu?._id)}
                                            className="ml-3 bg-orange-500 text-white text-sm px-3 py-1 rounded-md"
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 border p-4 rounded-lg shadow-md">
                                <h2 className="text-lg font-bold">Order Summary</h2>
                                <p className="text-sm text-gray-400">
                                    Total Items: {UserInfo?.items.length}
                                </p>
                                <p className="text-sm text-gray-300 font-bold">
                                    Total Price: ${calculateTotal()}
                                </p>
                                <button
                                    onClick={() => ClearAllAddToCart()}
                                    className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
                                >
                                    Clear All
                                </button>

                                <NavLink to={"/"} >
                                    <button className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
                                        Continue Shopping
                                    </button>
                                </NavLink>
                            </div>

                            {/* Show confirmation button after clicking "Buy Now" */}
                            {/* {showBuyNow && selectedItem && (
                                <div className="mt-4 bg-green-500 text-white p-4 rounded-lg text-center">
                                    <p>Thank you for purchasing {selectedItem.title}!</p>
                                </div>
                            )} */}
                        </div>
                    </div>

                </Elements>
            </div>

        </>
    );
};

export default AddToCartPage;