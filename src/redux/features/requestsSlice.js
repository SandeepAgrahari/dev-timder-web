import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addrequests: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      const updatedState = state.filter((req) => req._id !== action.payload);
      return updatedState;
    },
  },
});

export const { addrequests, removeRequest } = requestsSlice.actions;
export default requestsSlice.reducer;
