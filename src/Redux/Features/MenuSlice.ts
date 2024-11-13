import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../Store/Store";
import { menucreateInterface } from "../../interface/MenucreateInterface";
import axios from "axios";

interface MenuState {
    Menu: menucreateInterface[] | null
}

const initialState: MenuState = {
    Menu: []
}

export const FetchingMenuData = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get("http://localhost:3000/api-Meun/Get/Login/User/Data", {
            headers: {
                authorization: `Bearer ${localStorage.getItem("Token")}`
            }
        });
        dispatch(SetMenuData(response?.data?.menus)); // Dispatch the user data received

    } catch (error) {
        console.log(error);
    }
}

const MenuSlice = createSlice({
    name: "Menu",
    initialState,
    reducers: {
        SetMenuData: (state, action: PayloadAction<menucreateInterface[] | null>) => {
            state.Menu = action.payload; // Allow User to be null or UserInterFaceData
        }
    }
})

export const { SetMenuData } = MenuSlice.actions;
export default MenuSlice.reducer;