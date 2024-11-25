import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterCuisinesinterface {
    Cuisines: string
}

interface FilterState {
    FilterCuisines: FilterCuisinesinterface[] | null
}

const initialState: FilterState = {
    FilterCuisines: null
}

const FilterCuisinesSlice = createSlice({
    name: "Cuisines",
    initialState,
    reducers: {
        SetFilterCuisines: (state, action: PayloadAction<FilterCuisinesinterface[] | null>) => {
            state.FilterCuisines = action.payload
        }
    }
})

export const {SetFilterCuisines} = FilterCuisinesSlice.actions
export default FilterCuisinesSlice.reducer