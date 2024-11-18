import { configureStore } from "@reduxjs/toolkit";
import UserReducers from "../Features/UserSlice"
import RestaurantReducers from "../Features/RestaurantSlice"
import MenuReducers from "../Features/MenuSlice"
import Allrestaurant from "../Features/RestaurantAllSlice"

export const store = configureStore({
    reducer: {
        User: UserReducers,
        Menu: MenuReducers,
        AllRestaurant: Allrestaurant,
        Restaurant: RestaurantReducers,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;