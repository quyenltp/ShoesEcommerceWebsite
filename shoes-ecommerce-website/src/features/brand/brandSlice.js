import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { brandService } from "./brandService"; // Correct import
import { toast } from "react-toastify";

export const getAllBrands = createAsyncThunk("brand/get", async (thunkAPI) => {
  try {
    return await brandService.getBrands();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getABrand = createAsyncThunk(
  "product/getABrand",
  async (id, thunkAPI) => {
    try {
      return await brandService.getABrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const brandState = {
  brand: [], // Should this be an array? If you are fetching multiple brands, consider using an array.
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const brandSlice = createSlice({
  name: "brand",
  initialState: brandState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brand = action.payload;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getABrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getabrand = action.payload;
      })
      .addCase(getABrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default brandSlice.reducer;
