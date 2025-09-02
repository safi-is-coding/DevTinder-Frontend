import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => action.payload,
        removeUserFromFeed: (state, action) => {
            if (state) {
                return state.filter(user => user._id !== action.payload);
            }
            return state;
        }
    }
})

export const {addFeed, removeUserFromFeed} = feedSlice.actions
export default feedSlice.reducer