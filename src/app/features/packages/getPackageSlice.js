import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchgetPackage = createAsyncThunk('getPackage/fetchgetPackage', async () => {

  const response = await fetch('/api/admin/packages/Getpackages', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await response.json();
  return data;
});

const getPackageSlice = createSlice({
  name: 'getPackage',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchgetPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchgetPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; 
        state.error = null;
      })
      .addCase(fetchgetPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export default getPackageSlice.reducer;
export const selectGetPackage = (state) => state.getPackage;

