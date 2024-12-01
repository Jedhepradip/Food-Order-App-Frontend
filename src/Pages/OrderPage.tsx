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
    MenuItemsList: MenuItme,
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

const OrderPage: React.FC = () => {
    const [OrderMenu, SetOrderMenuData] = useState<OrderData[]>([])
    const [OrderMenu1, SetOrderMenuData1] = useState<MenuItme | null>(null)
    const Dispatch: AppDispatch = useDispatch()
    const OrderMenuData = useSelector((state: RootState) => state.Order.Order)

    useEffect(() => {
        if (OrderMenuData?.length) {
            SetOrderMenuData(OrderMenuData)
        }

        OrderMenu.map((val) => (
            // console.log("val :", val?.MenuItemsList)
            SetOrderMenuData1(val?.MenuItemsList)
        ))
        console.log("OrderMenu1 ;", OrderMenu1);
    }, [OrderMenuData])

    useEffect(() => {
        Dispatch(FetchingOrderMenuData())
    }, [Dispatch])

    console.log(OrderMenu);



    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">Order Status: <span className='text-red-500'>pending</span></h2>

                {/* Order Item */}
                {/* {OrderMenu1.map((val, index) => (
                    <div className="flex items-center justify-between mb-4" key={index}>
                       
                        <img src={"val.MenuItemsList"} className="w-16 h-16 rounded-lg object-cover" />

                     
                        <div className="ml-4 flex-1">
                            <h3 className="text-lg font-medium text-left">{val.name}</h3>
                        </div>
                        <div>
                            <p className="text-white mt-1">₹ {val.MenuItemsList[index]?.price}</p>
                        </div>
                    </div>
                ))} */}

                {/* Continue Shopping Button */}
                <NavLink to={"/AddToCartPage"}>
                    <button
                        className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                        Continue Shopping
                    </button>
                </NavLink>
            </div>
        </div>
    );
};

export default OrderPage;