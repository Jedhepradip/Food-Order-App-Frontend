import { configureStore } from "@reduxjs/toolkit";
import UserReducers from "../Features/UserSlice"
import RestaurantReducers from "../Features/RestaurantSlice"
import MenuReducers from "../Features/MenuSlice"

export const store = configureStore({
    reducer: {
        User: UserReducers,
        Restaurant: RestaurantReducers,
        Menu: MenuReducers
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;