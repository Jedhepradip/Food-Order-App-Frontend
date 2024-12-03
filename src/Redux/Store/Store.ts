import { configureStore } from "@reduxjs/toolkit";
import UserReducers from "../Features/UserSlice"
import MenuReducers from "../Features/MenuSlice"
import MenuAllData from "../Features/AllMenuSlice"
import OrderReducres from "../Features/OrderMenuSlice"
import Allrestaurant from "../Features/RestaurantAllSlice"
import Filtercuisines from "../Features/CuisinesFilterSlice"
import RestaurantReducers from "../Features/RestaurantSlice"
import SetSearchByCountry from "../Features/SearchByCountrtSlice"

export const store = configureStore({
    reducer: {
        User: UserReducers,
        Menu: MenuReducers,
        Order: OrderReducres,
        MenuAll: MenuAllData,
        Cuisines: Filtercuisines,
        Search: SetSearchByCountry,
        AllRestaurant: Allrestaurant,
        Restaurant: RestaurantReducers,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;