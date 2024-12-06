import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../Store/Store";
import axios from "axios";



interface MenuItme {
    Quantity: number,
    description: string,
    menuId: string,
    name: string,
    image: string,
    price: number,
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

interface OrderState {
    AllOrder: OrderData[] | null
}

const initialState: OrderState = {
    AllOrder: []
}

export const FetchingAllOrderData = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get("http://localhost:3000/api-Order/All/Order/Data", {
            headers: {
                authorization: `Bearer ${localStorage.getItem("Token")}`
            }
        });
        dispatch(OrderAllDataShow(response?.data)); // Dispatch the user data received    
    } catch (error) {
        console.log(error);
    }
}

const AllOrderDataShow = createSlice({
    name: "AllOrder",
    initialState,
    reducers: {
        OrderAllDataShow: (state, action: PayloadAction<OrderData[] | null>) => {
            state.AllOrder = action.payload; // Allow User to be null or UserInterFaceData
        }
    }
})

export const { OrderAllDataShow } = AllOrderDataShow.actions;
export default AllOrderDataShow.reducer;