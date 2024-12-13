import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { UserInterFaceData } from "../../interface/UserInterface";
import { AppDispatch } from "../Store/Store";
import axios from "axios";

interface Menuinterfase {
    name: string;
    description: string;
    price: number;
    menuPicture: string;
    _id: string | number;
    createdAt: string;
    restaurantId: string;
    __v: string;
    updatedAt: string;
}

export interface CartItem {
    Menu: Menuinterfase; // Single Menu object
    quantity: number; // Quantity for the specific menu item
}

export interface UserInterFaceData {
    profilePictuer: string;  //profilePicture
    name: string;
    email: string;
    contact: string;
    password: string;
    address: string;
    country: string;
    city: string;
    updatedAt: string;
    items: CartItem[]; // Array of individual CartItem objects
    __v: string;
    _id: string;
}


interface UserState {
    User: UserInterFaceData | null; // Allow User to be either UserInterFaceData or null
}

const initialState: UserState = {
    User: null, // Set initial state to null
};

export const FetchingUserData = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get("http://localhost:3000/api-user/Login/UserData", {
            headers: {
                authorization: `Bearer ${localStorage.getItem("Token")}`
            }
        });
        dispatch(SetUserData(response.data)); // Dispatch the user data received
        console.log("response.data.items[0] :",response.data.items[0].Menu.menuPictuer);
        
    } catch (error) {
        console.error(error); // Changed to console.error for clarity
    }
};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        SetUserData: (state, action: PayloadAction<UserInterFaceData | null>) => {
            state.User = action.payload; // Allow User to be null or UserInterFaceData
        }
    }
});

export const { SetUserData } = UserSlice.actions;
export default UserSlice.reducer;
