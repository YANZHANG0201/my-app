import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
  name: "tab",
  initialState: {
    isCollpase: false,
  },
  reducers: {
    collapseMenu: (state) => {
      state.isCollpase = !state.isCollpase;
    },
  },
});

export const { collapseMenu } = tabSlice.actions;
export default tabSlice.reducer;
