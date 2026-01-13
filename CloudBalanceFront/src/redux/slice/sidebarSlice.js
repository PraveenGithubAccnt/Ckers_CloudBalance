import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.open = !state.open;
    },
    openSidebar: (state) => {
      state.open = true;
    },
    closeSidebar: (state) => {
      state.open = false;
    },
  },
});

export const {
  toggleSidebar,
  openSidebar,
  closeSidebar,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
