import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RestaurantInterface } from "../../interface/RestaurantInterface";
import { AppDispatch } from "../Store/Store";
import axios from "axios";

interface UserInterFaceData {
    profilePictuer: string;  //profilePicture
    name: string;
    email: string;
    contact: string;
    password: string;
    address: string;
    country: string;
    city: string;
    updatedAt: string;
    items: string[]; // Array of individual CartItem objects
    __v: string;
    _id: string;
}
interface Restaura {
    _id: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryTime: string;
    cuisines: string[];
    RestaurantBanner: string;
    user: UserInterFaceData[];
    menus: string[];
}

interface RestaurantState {
    RestaurantAll: Restaura[] | null; // Allow User to be either UserInterFaceData or null
}

const initialState: RestaurantState = {
    RestaurantAll: null
}

export const FetchingUserAllRestaurant = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api-restaurant/Get/RestaurantData/AllUser`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("Token")}`
            }
        });
        dispatch(SetAllRestaurantData(response.data)); // Dispatch the user data received
    } catch (error) {
        console.log(error);
    }
}

const RestaurantSlice = createSlice({
    name: "RestaurantAll",
    initialState,
    reducers: {
        SetAllRestaurantData: (state, action: PayloadAction<Restaura[] | null>) => {
            state.RestaurantAll = action.payload; // Allow User to be null or UserInterFaceData
        }
    }
})

export const { SetAllRestaurantData } = RestaurantSlice.actions;
export default RestaurantSlice.reducer;