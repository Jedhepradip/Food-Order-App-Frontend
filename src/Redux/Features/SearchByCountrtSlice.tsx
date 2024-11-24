import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchByCountry {
    Country: string;
}

interface RestaurantState {
    SearchCountry: SearchByCountry | null; // Allow SearchCountry to be either SearchByCountry or null
}

const initialState: RestaurantState = {
    SearchCountry: null,
};

const SearchByCountrySlice = createSlice({
    name: "SearchByCountry",
    initialState,
    reducers: {
        SetSearchByCountry: (state, action: PayloadAction<SearchByCountry>) => {
            state.SearchCountry = action.payload; // Allow SearchCountry to be null or SearchByCountry
        },
    },
});

export const { SetSearchByCountry } = SearchByCountrySlice.actions;
export default SearchByCountrySlice.reducer;
