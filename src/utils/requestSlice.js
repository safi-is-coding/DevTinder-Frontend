import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addtRequest: (state, action) => action.payload,
        removeRequest: () => null,
    },
})

export const { addtRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
