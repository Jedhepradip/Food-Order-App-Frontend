import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../Store/Store";
import axios from "axios";

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
    items: []; // Array of individual CartItem objects
    __v: string;
    _id: string;
}

interface UserAllData {
    AllUser: UserInterFaceData[] | null
}

const initialState: UserAllData = {
    AllUser: []
}

export const FetchingAllUserData = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get("http://localhost:3000/api-user/UserAll/DataSend", {
            headers: {
                authorization: `Bearer ${localStorage.getItem("Token")}`
            }
        });
        dispatch(SetAllUserData(response.data)); // Dispatch the user data received
    } catch (error) {
        console.error(error); // Changed to console.error for clarity
    }
};

const AllUserSlice = createSlice({
    name: "AllUser",
    initialState,
    reducers: {
        SetAllUserData: (state, action: PayloadAction<UserInterFaceData[] | null>) => {
            state.AllUser = action.payload; // Allow User to be null or UserInterFaceData
        }
    }
})

export const { SetAllUserData } = AllUserSlice.actions;
export default AllUserSlice.reducer; 