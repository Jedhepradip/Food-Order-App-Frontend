import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../Redux/Store/Store";
import { FetchingRestaurant } from "../Redux/Features/RestaurantSlice";
import { FetchingMenuData } from "../Redux/Features/MenuSlice";
import { FetchingOrderMenuData } from "../Redux/Features/OrderMenuSlice";
import { menucreateInterface } from "../interface/MenucreateInterface";

interface MenuItme {
    Quantity: number,
    description: string,
    menuId: string,
    name: string,
    price: number,
    image: string,
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
    status: string,
    totalAmount: number,
    createdAt: string,
    updatedAt: string,
    user: [],
    __v: string,
    _id: string,
}

const OrderPage = () => {
    // const [Restaurant, setRestaurant] = useState<RestaurantInterface | null>(null);
    const [Menu, SetMenu] = useState<menucreateInterface[] | null>(null);
    const [OrderMenu, SetOrderMenuData] = useState<OrderData[]>([])
    const [MenuQun, SetMenuQun] = useState<MenuItme[]>([])
    const [OrderMenuFilter, SetOrderMenuDataFilter] = useState<OrderData[]>([])
    const [orderStatus, setOrderStatus] = useState("");

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

    useEffect(() => {
        if (Menu && Menu[0]) {  // Check if 'Menu' is not null or undefined and has elements
            const filtermenu = OrderMenu.filter((menu) => {
                const pradip = menu.MenuItemsList.some((val) => {
                    return Menu[0]._id === val?.menuId;  // Safe to access _id here
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

    console.log("OrderMenuFilter :", OrderMenuFilter);

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOrderStatus(e.target.value);
    };

    return (
        <div className="min-h-screen bg-black text-white font-serif flex flex-col items-center py-10 animate__animated animate__fadeIn">
            <div className="max-w-3xl w-full space-y-6">
                <h2 className="text-2xl font-semibold text-center text-red-500">Order Overview</h2>
                {OrderMenuFilter.map((userOrder, index) => (
                    <div key={index} className="border shadow-lg rounded-lg p-6 mb-6 animate__animated animate__fadeInUp">
                        {/* User Info */}
                        <div className="flex justify-between items-center w-full">
                            <div className="mb-4 md:w-[50%] w-full">
                                <div className="text-start mt-4 font-serif">
                                    <p className="text-lg font-medium">{userOrder.deliveryDetails.name}</p>
                                    <p className="text-md">{userOrder.deliveryDetails.address || "Not Provided"}</p>
                                    <h3 className="text-lg font-serif">Total Amount: $
                                        {/* {calculateTotalAmount(userOrder.orderItems)} */}
                                    </h3>

                                </div>
                            </div>

                            {/* Order Status */}
                            <div className="mb-4 md:w-[50%] w-full">
                                <label htmlFor="status" className="block text-lg font-medium mb-2">Order Status</label>
                                <select
                                    id="status"
                                    value={orderStatus}
                                    onChange={handleStatusChange}
                                    className="w-full p-2 rounded-lg bg-black border text-white border-none focus:outline-none"
                                >
                                    <option value="">Select Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Preparing">Preparing</option>
                                    <option value="Out for Delivery">Out for Delivery</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="flex justify-between items-center gap-2">
                            {MenuQun?.map((item) => (
                                <div className="md:w-[50%] w-full">
                                    <div
                                        key={item._id}
                                        className="flex items-center border text-white shadow-md rounded-lg p-4"
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
                            ))}
                        </div>

                        {/* Total Amount */}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default OrderPage;
