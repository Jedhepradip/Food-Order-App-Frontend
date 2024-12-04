import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { menucreateInterface } from "../../interface/MenucreateInterface";
import { AppDispatch } from "../Store/Store";
import axios from "axios";

interface Menustate {
    MenuAllData: menucreateInterface[] | null
}

const initialState: Menustate = {
    MenuAllData: []
}

export const FetchinMenuAlldata = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get("http://localhost:3000/api-Meun/AllData/Send/Menu", {
            headers: {
                authorization: `Bearer ${localStorage.getItem("Token")}`
            }
        });
        dispatch(SetMenuAllDataShow(response?.data));         
    } catch (error) {
        console.log(error);
    }
}

const MenuAllDataSlice = createSlice({
    name: "MenuAll",
    initialState,
    reducers: ({
        SetMenuAllDataShow: (state, action: PayloadAction<menucreateInterface[] | null>) => {
            state.MenuAllData = action.payload
        }
    })
})

export const { SetMenuAllDataShow } = MenuAllDataSlice.actions;
export default MenuAllDataSlice.reducer;