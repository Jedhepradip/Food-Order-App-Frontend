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
// import { useNavigate } from 'react-router-dom';


// Api Key

//Frontent pk_test_51Q7VKrP6jlrB3RhjwiYFqR25TaT6c8SGVXjkatIkKyq7nmtGNt4zhAFKF3lbjDUfp4emprVclNUXi1uGni0Vufje006Hvc0x24

//Backend sk_test_51Q7VKrP6jlrB3RhjFTQN841rp3fXw2YSB51FsLRvNQ3YOnMddwHhNnxLa7DYdJPSGt8Sf4r2sjPq6GKQop8Q2MGU00f5Sjhbm3

const AddToCartPage: React.FC = () => {
    const Dispatch: AppDispatch = useDispatch()
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);
    // const Navigate = useNavigate()
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

                                <button className="px-4 py-2 bg-orange-500 float-right hover:bg-orange-600 text-white rounded">
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
        </>
    );
};


export default AddToCartPage;