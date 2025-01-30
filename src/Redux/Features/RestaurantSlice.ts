import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RestaurantInterface } from "../../interface/RestaurantInterface";
import { AppDispatch } from "../Store/Store";
import axios from "axios";

// Corrected interface for the state
interface RestaurantState {
    Restaurant: RestaurantInterface | null;
}

const initialState: RestaurantState = {
    Restaurant: null,
};

export const FetchingRestaurant = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api-restaurant/Get/Restaurant/Data`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
            }
        );
        dispatch(SetRestaurantData(response?.data));
    } catch (error) {
        console.error("Error fetching restaurant data:", error);
    }
};
// Create a slice for restaurant state management
const RestaurantSlice = createSlice({
    name: "Restaurant",
    initialState,
    reducers: {
        SetRestaurantData: (state, action: PayloadAction<RestaurantInterface | null>) => {
            state.Restaurant = action.payload; // Set the restaurant data
        },
    },
});

// Export actions and reducer
export const { SetRestaurantData } = RestaurantSlice.actions;
export default RestaurantSlice.reducer;
