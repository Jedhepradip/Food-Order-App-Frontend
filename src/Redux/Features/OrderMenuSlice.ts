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

// interface user {
//     name: string;
//     email: string;
//     address: string;
//     city: string;
//     country: string,
// }

// interface OrderData {
//     MenuItemsList: MenuItme[],
//     deliveryDetails: user,
//     restaurant: string,
//     totalAmount: number,
//     createdAt: string,
//     updatedAt: string,
//     user: [],
//     __v: string,
//     _id: string,
// }


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
    restaurant: string,
    totalAmount: number,
    createdAt: string,
    updatedAt: string,
    user: user,
    __v: string,
    _id: string,
}

interface OrderState {
    Order: OrderData[] | null
}

const initialState: OrderState = {
    Order: []
}

export const FetchingOrderMenuData = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api-Order/Order/data/get`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("Token")}`
            }
        });
        dispatch(SetOrderMenuData(response?.data)); // Dispatch the user data received    
    } catch (error) {
        console.log(error);
    }
}

const OrderMenuSlice = createSlice({
    name: "Menu",
    initialState,
    reducers: {
        SetOrderMenuData: (state, action: PayloadAction<OrderData[] | null>) => {
            state.Order = action.payload; // Allow User to be null or UserInterFaceData
        }
    }
})

export const { SetOrderMenuData } = OrderMenuSlice.actions;
export default OrderMenuSlice.reducer;