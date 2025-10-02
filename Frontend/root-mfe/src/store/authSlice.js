import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const handleTokenLogin = createAsyncThunk(
  "auth/handleTokenLogin",
  async (code, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        { code },
        { withCredentials: true } 
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { role: null, userId: null, loading: false },
  reducers: {
    logout: (state) => {
      state.role = null;
      state.userId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleTokenLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleTokenLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.role = action.payload.role;
        state.userId = action.payload.userId;
      })
      .addCase(handleTokenLogin.rejected, (state) => {
        state.loading = false;
        state.role = null;
        state.userId = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
