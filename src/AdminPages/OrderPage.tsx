import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../Redux/Store/Store";
import { FetchingRestaurant } from "../Redux/Features/RestaurantSlice";
import { FetchingMenuData } from "../Redux/Features/MenuSlice";
import { FetchingOrderMenuData } from "../Redux/Features/OrderMenuSlice";
import { menucreateInterface } from "../interface/MenucreateInterface";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

interface MenuItme {
    Quantity: number,
    description: string,
    menuId: string,
    name: string,
    price: number,
    image: string,
    status: string,
    _id: string
}

interface deliveryDetails {
    name: string;
    email: string;
    address: string;
    city: string;
    country: string,
    expiry: string,
    cvc: string,
}

interface OrderData {
    MenuItemsList: MenuItme[],
    deliveryDetails: deliveryDetails,
    restaurant: string,
    totalAmount: number,
    createdAt: string,
    updatedAt: string,
    user: [],
    __v: string,
    _id: string,
}

const OrderPage: React.FC = () => {
    // const [Restaurant, setRestaurant] = useState<RestaurantInterface | null>(null);
    const [Menu, SetMenu] = useState<menucreateInterface[] | null>(null);
    const [OrderMenu, SetOrderMenuData] = useState<OrderData[]>([])
    const [MenuQun, SetMenuQun] = useState<MenuItme[]>([])
    const [OrderMenuFilter, SetOrderMenuDataFilter] = useState<OrderData[]>([])

    // const RestaurantData = useSelector((state: RootState) => state.Restaurant.Restaurant)
    const Orderdata = useSelector((state: RootState) => state.Order.Order)
    const menudata = useSelector((state: RootState) => state.Menu.Menu)
    const Dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        if (Orderdata?.length) {
            SetOrderMenuData(Orderdata)
        }
        if (menudata) {
            SetMenu(menudata)
        }
    }, [Orderdata, menudata])


    console.log("rani ", Menu);

    useEffect(() => {
        if (Menu && Menu[0]) {  // Check if 'Menu' is not null or undefined and has elements
            const filtermenu = OrderMenu.filter((menu) => {
                const pradip = menu.MenuItemsList.some((val) => {
                    return Menu[1]?._id === val?.menuId;  // Safe to access _id here
                });
                return pradip;
            });
            SetOrderMenuDataFilter(filtermenu)
        }

        if (Menu && Menu[0]) {
            OrderMenu.filter((menu) => {
                const pradip = menu.MenuItemsList.filter((val) => {
                    return Menu[0]._id === val?.menuId;
                });
                SetMenuQun(pradip)
            });
        }
    }, [OrderMenu, Menu]);

    console.log(OrderMenu);

    console.log(Menu);


    useEffect(() => {
        Dispatch(FetchingMenuData())
        Dispatch(FetchingRestaurant())
        Dispatch(FetchingOrderMenuData())
    }, [Dispatch])


    // const calculateItemTotal = (price: number, quantity: number) => price * quantity;
    // const calculateTotal = (data: any[] | MenuItme) => {
    //     return data?.reduce((total: number, item: { price: number; Quantity: number; }) =>
    //         total + calculateItemTotal(item.price, item.Quantity), 0);
    // };


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleStatusChange = async (e: any, OrderId: string, menuID: string) => {
        const fromdata = new FormData();
        fromdata.append("status", e);
        fromdata.append("menuID", menuID)
        try {
            const response = await axios.put(
                `http://localhost:3000/api-restaurant/Status/Update/${OrderId}`,
                fromdata, // Send FormData directly
                {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("Token")}`,
                    },
                }
            );

            const UserUpdate = response.data;

            if (response.status === 200) {
                toast.success(
                    <div className='font-serif text-[15px] text-black'>{UserUpdate.message}</div>
                );
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                if (error.response.status === 409 || errorMessage === "User already exists") {
                    console.log("Error: User already exists.");
                    toast.error(
                        <div className='font-serif text-[15px] text-black'>{errorMessage}</div>
                    );
                } else {
                    toast.error(
                        <div className='font-serif text-[15px] text-black'>{errorMessage}</div>
                    );
                    console.log("Error:", errorMessage || "Unexpected error occurred.");
                }
            } else {
                console.log("Error: Network issue or server not responding", error);
            }
        }
    };


    return (
        <div className="min-h-screen bg-black text-white font-serif flex flex-col items-center py-10 animate__animated animate__fadeIn">
            <ToastContainer />
            <div className="max-w-3xl w-full space-y-6">
                <h2 className="text-2xl font-semibold text-center text-red-500">Order Overview</h2>
                {OrderMenuFilter.map((userOrder, index) => (
                    <>
                        {MenuQun?.map((item) => (
                            <div key={index} className="border shadow-lg rounded-lg p-6 mb-6 animate__animated animate__fadeInUp">
                                {/* User Info */}
                                <div className="flex justify-between items-center w-full">
                                    <div className="mb-4 md:w-[50%] w-full">
                                        <div className="text-start mt-4 font-serif">
                                            <p className="text-lg font-medium">{userOrder.deliveryDetails.name}</p>
                                            <p className="text-md">{userOrder.deliveryDetails.address || "Not Provided"}</p>
                                            <h3 className="text-lg font-serif">Total Amount: $
                                                {/* {calculateTotal(item)} */}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Order Status */}
                                    <div className="mb-4 md:w-[50%] w-full">
                                        <label htmlFor="status" className="block text-lg font-medium mb-2">Order Status</label>
                                        <select
                                            id="status"
                                            onChange={(e) => handleStatusChange(e.target.value, userOrder._id, item.menuId)}
                                            className="w-full p-2 rounded-lg bg-gray-900 border text-white border-none focus:outline-none">
                                            <option value="">Select Status</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Preparing">Preparing</option>
                                            <option value="Outfordelivery">Out for Delivery</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="flex justify-between items-center gap-2">

                                    <div className="md:w-[50%] w-full">
                                        <div
                                            key={item._id}
                                            className="flex items-center border text-white shadow-md rounded-lg p-3"
                                        >                 <img
                                                src={`http://localhost:3000/${item.image}`}
                                                alt={item.name}
                                                className="w-16 h-16 rounded-lg mr-4 object-cover border border-gray-600"
                                            />
                                            <div className="flex-1">
                                                <h2 className="text-xl font-semibold">{item.name}</h2>
                                                <p className="text-gray-400">Price: ${item.price}</p>
                                                <p className="text-gray-400">Quantity: {item.Quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Total Amount */}
                            </div>
                        ))}
                    </>
                ))}
            </div>

        </div>
    );
};

export default OrderPage;
