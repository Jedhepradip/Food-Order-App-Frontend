import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../Redux/Store/Store';
import { FetchingOrderMenuData } from '../Redux/Features/OrderMenuSlice';

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

interface user {
        profilePictuer: string;  //profilePicture
        role: string,
        name: string;
        email: string;
        contact: string;
        password: string;
        address: string;
        idAdmin: boolean;
        country: string;
        city: string;
        updatedAt: string;
        items: string[]; // Array of individual CartItem objects
        __v: string;
        _id: string;
    }

interface OrderData {
    MenuItemsList: MenuItme[],
    deliveryDetails: deliveryDetails,
    restaurant: string,
    totalAmount: number,
    createdAt: string,
    updatedAt: string,
    user: user,
    __v: string,
    _id: string,
}

const OrderPage: React.FC = () => {
    const [OrderMenu, SetOrderMenuData] = useState<OrderData[]>([])
    const Dispatch: AppDispatch = useDispatch()
    const OrderMenuData = useSelector((state: RootState) => state.Order.Order)

    useEffect(() => {
        if (OrderMenuData) {
            SetOrderMenuData(OrderMenuData)
        }
    }, [OrderMenuData])

    useEffect(() => {
        Dispatch(FetchingOrderMenuData())
    }, [Dispatch])

    return (
        <>
            <div className="flex flex-col items-center py-10 min-h-screen bg-black text-white">
                <div className="border shadow-lg rounded-lg p-6 w-full max-w-lg">
                    <h2 className="text-3xl font-semibold mb-4 text-center">
                        Order <span className="text-red-500">Details</span>
                    </h2>
                    <div className="space-y-4">
                        {OrderMenu.map((order) =>
                            order.MenuItemsList.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center bg-gray-800 text-white shadow-md rounded-lg p-4"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 rounded-lg mr-4 object-cover border border-gray-600"
                                    />
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold">{item.name}</h2>
                                        <p className="text-gray-400 font-serif">Price: ₹{item.price}</p>
                                        <p className="text-gray-400 font-serif">Quantity: {item.Quantity}</p>
                                    </div>
                                    <div>

                                        <span
                                            className={`px-3 py-1 text-sm font-medium rounded-full ${item.status === "Pending"
                                                ? "bg-yellow-600 text-white"
                                                : item.status === "Confirmed"
                                                    ? "bg-purple-600 text-white"
                                                    : item.status === "Preparing"
                                                        ? "bg-blue-600 text-white"
                                                        : item.status === "Out for Delivery"
                                                            ? "bg-orange-600 text-white"
                                                            : "bg-green-600 text-white"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="mt-6">
                        <NavLink to="/AddToCartPage">
                            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg">
                                Continue Shopping
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderPage;