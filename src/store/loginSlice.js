import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const initialState = {
  user: [],
  loginStatus: STATUS.IDLE,
  categoryProducts: [],
  categoryProductsStatus: STATUS.IDLE,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncLogin.pending, (state, action) => {
        state.loginStatus = STATUS.LOADING;
      })

      .addCase(fetchAsyncLogin.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loginStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncLogin.rejected, (state, action) => {
        state.loginStatus = STATUS.FAILED;
      });
  },
});

export const fetchAsyncLogin = createAsyncThunk("login/fetch", async (dataInput) => {
  const response = await fetch(`${BASE_URL}login`, dataInput);
  const data = await response.json();

  return data;
});

export const getAllCategories = (state) => state.login.user;
export const getCategoryLoginStatus = (state) => state.category.loginStatus;
export default loginSlice.reducer;
