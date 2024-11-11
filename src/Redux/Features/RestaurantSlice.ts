import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RestaurantInterface } from "../../interface/RestaurantInterface";
import { AppDispatch } from "../Store/Store";
import axios from "axios";


interface RestaurantState {
    Restaurant: RestaurantInterface | null; // Allow User to be either UserInterFaceData or null
}

const initialState: RestaurantState = {
    Restaurant: null
}

export const FetchingRestaurant = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get("http://localhost:3000/api-restaurant/Get/Restaurant/Data", {
            headers: {
                authorization: `Bearer ${localStorage.getItem("Token")}`
            }
        });
        dispatch(SetRestaurantData(response.data)); // Dispatch the user data received
    } catch (error) {
        console.log(error);
    }
}

const RestaurantSlice = createSlice({
    name: "Restaurant",
    initialState,
    reducers: {
        SetRestaurantData: (state, action: PayloadAction<RestaurantInterface | null>) => {
            state.Restaurant = action.payload; // Allow User to be null or UserInterFaceData
        }
    }
})

export const { SetRestaurantData } = RestaurantSlice.actions;
export default RestaurantSlice.reducer;