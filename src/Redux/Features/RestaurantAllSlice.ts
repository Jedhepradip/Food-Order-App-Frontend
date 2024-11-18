import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RestaurantInterface } from "../../interface/RestaurantInterface";
import { AppDispatch } from "../Store/Store";
import axios from "axios";


interface RestaurantState {
    RestaurantAll: RestaurantInterface | null; // Allow User to be either UserInterFaceData or null
}

const initialState: RestaurantState = {
    RestaurantAll: null
}

export const FetchingUserAllRestaurant = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get("http://localhost:3000/api-restaurant/Get/RestaurantData/AllUser", {
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
        SetAllRestaurantData: (state, action: PayloadAction<RestaurantInterface | null>) => {
            state.RestaurantAll = action.payload; // Allow User to be null or UserInterFaceData
        }
    }
})

export const { SetAllRestaurantData } = RestaurantSlice.actions;
export default RestaurantSlice.reducer;