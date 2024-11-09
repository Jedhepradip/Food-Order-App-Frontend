import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterFaceData } from "../../interface/UserInterface";
import { AppDispatch } from "../Store/Store";
import axios from "axios";

interface UserState {
    User: UserInterFaceData[]
}

const initialState: UserState = {
    User: []
}

export const FetchingUserData = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get("http://localhost:3000/User/Information", {
            headers: {
                authorization: `Bearer ${localStorage.getItem("Token")}`
            }
        })
        dispatch(SetUserData(response.data))
    } catch (error) {
        console.log(error);
    }
}

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        SetUserData: (state, action: PayloadAction<UserInterFaceData[]>) => {
            state.User = action.payload
        }
    }
})

export const { SetUserData } = UserSlice.actions
export default UserSlice.reducer