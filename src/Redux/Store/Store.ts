import { configureStore } from "@reduxjs/toolkit";
import UserReducers from "../Features/UserSlice"
import RestaurantReducers from "../Features/RestaurantSlice"
import MenuReducers from "../Features/MenuSlice"
import Allrestaurant from "../Features/RestaurantAllSlice"
import SetSearchByCountry from "../Features/SearchByCountrtSlice";

export const store = configureStore({
    reducer: {
        User: UserReducers,
        Menu: MenuReducers,
        Search: SetSearchByCountry,
        AllRestaurant: Allrestaurant,
        Restaurant: RestaurantReducers,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;