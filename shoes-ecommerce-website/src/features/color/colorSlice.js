import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { colorService } from "./colorService";
import { toast } from "react-toastify";

export const getAllColors = createAsyncThunk("color/get", async (thunkAPI) => {
  try {
    return await colorService.getColors();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const getAColor = createAsyncThunk(
  "product/getAColor",
  async (id, thunkAPI) => {
    try {
      return await colorService.getAColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const colorState = {
  color: [], // Should this be an array? If you are fetching multiple brands, consider using an array.
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const colorSlice = createSlice({
  name: "color",
  initialState: colorState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.color = action.payload;
      })
      .addCase(getAllColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getacolor = action.payload;
      })
      .addCase(getAColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default colorSlice.reducer;
