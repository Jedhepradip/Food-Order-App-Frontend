import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchByCountry {
    Country: string;
}

interface RestaurantState {
    SearchCountry: SearchByCountry[] | null; // Allow SearchCountry to be either SearchByCountry or null
}

const initialState: RestaurantState = {
    SearchCountry: null,
};

// eslint-disable-next-line react-refresh/only-export-components
const SearchByCountrySlice = createSlice({
    name: "SearchByCountry",
    initialState,
    reducers: {
        SetSearchByCountry: (state, action: PayloadAction<SearchByCountry[] | null>) => {
            state.SearchCountry = action.payload; // Allow User to be null or UserInterFaceData
        }
    }
});

export const { SetSearchByCountry } = SearchByCountrySlice.actions;
export default SearchByCountrySlice.reducer;