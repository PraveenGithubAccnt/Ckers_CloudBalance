import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./slice/sidebarSlice";
import authReducer from "./slice/authSlice"

export const store = configureStore({
  reducer: {
    sidebar: sidebarSlice,
    auth:authReducer,
  },
});
