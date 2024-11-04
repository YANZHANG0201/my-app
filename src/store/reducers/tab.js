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
      } else if (val.name !== "home" && state.tabList.length === 1) {
        state.currentMenu = {};
      }
    },
    closeTab: (state, { payload: val }) => {
      let res = state.tabList.findIndex((item) => item.name === val.name);
      state.tabList.splice(res, 1);
    },
    setCurrentMneu: (state, { payload: val }) => {
      if (val.name === "home") {
        state.currentMenu = {};
      } else {
        state.currentMenu = val;
      }
    },
  },
});

export const { collapseMenu, selectMenuList, closeTab, setCurrentMneu } =
  tabSlice.actions;
export default tabSlice.reducer;
