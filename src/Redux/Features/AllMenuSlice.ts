import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../Store/Store";
import axios from "axios";


 interface Restaurant {
    _id: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryTime: string;
    cuisines: string[];
    RestaurantBanner: string;
    user: [];
    menus: string[];
}
 interface menucreateInterface {
    name: string,
    description: string,
    price: string,
    menuPictuer: string
    _id: string
    createdAt: string,
    restaurantId: Restaurant[],
    __v: string,
    updatedAt: string,
}

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