import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";



export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/auth/profile");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Unauthorized");
    }
  }
);

const initialState = {
  firstName: null,
  lastName: null,
  role: null,
  isAuthenticated: false,
  authLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.firstName = null;
      state.lastName = null;
      state.role = null;
      state.isAuthenticated = false;
      state.authLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //PROFILE FETCH
      .addCase(fetchUserProfile.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.role = action.payload.role.toLowerCase(); // normalize
        state.isAuthenticated = true;
        state.authLoading = false;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.authLoading = false;
        state.isAuthenticated = false;
        state.role = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
