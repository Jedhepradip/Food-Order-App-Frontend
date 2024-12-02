import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../Store/Store";
import axios from "axios";



interface MenuItme {
    Quantity:number,
    description:string,
    menuId:string,
    name:string,
    price:number,
    _id:string
}

interface deliveryDetails{
    name: string;
    email: string;
    address: string;
    city: string;
    country:string,
    expiry:string,
    cvc:string,
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

interface OrderState {
    Order: OrderData[] | null
}

const initialState: OrderState = {
    Order: []
}

export const FetchingOrderMenuData = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get("http://localhost:3000/api-Order/Order/data/get", {
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