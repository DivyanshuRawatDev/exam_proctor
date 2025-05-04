import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../configs/axios";

export const fetchUserSignup = createAsyncThunk(
  "user/signup",
  async (userData) => {
    try {
      const response = await API.post("auth/signup", userData);
      return response.data;
    } catch (error) {
      console.log("Error while signup : " + error.message);
    }
  }
);

export const fetchUserLogin = createAsyncThunk(
  "auth/login",
  async (userData) => {
    try {
      const response = await API.post("auth/login", userData);
      return response.data;
    } catch (error) {
      console.log("Error while login : " + error.message);
    }
  }
);

export const fetchUploadImage = createAsyncThunk("upload/img", async (formData) => {
  try {
    const response = await API.post('upload-id',formData);
    return response.data
  } catch (error) {
    console.log("Error while upload-image : " + error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    isError: false,
    user: {},
  },
  extraReducers: (builder) => {
    // Signup
    builder.addCase(fetchUserSignup.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchUserSignup.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchUserSignup.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // Login

    builder.addCase(fetchUserLogin.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchUserLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.user = action.payload?.data;
    });
    builder.addCase(fetchUserLogin.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // Upload Image


    builder.addCase(fetchUploadImage.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchUploadImage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.user = action.payload?.data;
    });
    builder.addCase(fetchUploadImage.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default userSlice.reducer;
