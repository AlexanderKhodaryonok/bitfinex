import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../index';

interface AboutState {
  isLoading: boolean;
  data: string;
}

const initialState: AboutState = {
  isLoading: false,
  data: "Default data",
};

export const setData = createAsyncThunk<string, string>("about/setData", async (data) => {
  const response = await new Promise((resolve) => {
    setTimeout(() => resolve(data), 1000);
  });
  return response as string;
});

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setData.pending, (state: AboutState) => {
        state.isLoading = true;
      })
      .addCase(setData.fulfilled, (state: AboutState, action: PayloadAction<string>) => {
        state.data = action.payload as string;
        state.isLoading = false;
      });
  },
});

// selectors
export const getAboutData = (state: RootState): string => state.about.data;

export default aboutSlice.reducer;
