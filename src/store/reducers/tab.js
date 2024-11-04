import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
  name: "tab",
  initialState: {
    isCollpase: false,
    tabList: [
      {
        path: "/",
        name: "home",
        label: "首页",
      },
    ],
    currentMenu: {},
  },
  reducers: {
    collapseMenu: (state) => {
      state.isCollpase = !state.isCollpase;
    },
    selectMenuList: (state, { payload: val }) => {
      if (val.name !== "home") {
        state.currentMenu = val;
        const result = state.tabList.findIndex(
          (item) => item.name === val.name
        );
        if (result === -1) {
          state.tabList.push(val);
        }
      } else {
        state.currentMenu = {};
      }
    },
  },
});

export const { collapseMenu, selectMenuList } = tabSlice.actions;
export default tabSlice.reducer;
