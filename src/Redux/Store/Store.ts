import { configureStore } from "@reduxjs/toolkit";
import UserReducers from "../Features/UserSlice"
export const store = configureStore({
    reducer: {
        User: UserReducers
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;