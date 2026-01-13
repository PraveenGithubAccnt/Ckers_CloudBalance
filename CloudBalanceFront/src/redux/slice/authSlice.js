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
  userId: null,
  arnAccounts: [],
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
      state.userId = null;
      state.arnAccounts = [];
      state.isAuthenticated = false;
      state.authLoading = false;
    },
    //setArnAccounts goes inside reducers, not extraReducers
    setArnAccounts: (state, action) => {
      state.arnAccounts = action.payload;
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
        state.role = action.payload.role.toLowerCase();
        state.userId = action.payload.userId; //Store userId
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

export const { logout, setArnAccounts } = authSlice.actions; // ✅ Fixed: Added comma between logout and setArnAccounts
export default authSlice.reducer;