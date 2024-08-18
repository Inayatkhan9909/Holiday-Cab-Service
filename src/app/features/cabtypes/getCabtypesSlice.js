import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchgetcabtypes = createAsyncThunk('getCabtypes/fetchgetcabtypes', async () => {

  const response = await fetch('/api/admin/cabtypes/GetCabtypes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await response.json();
  return data;
});

const getCabtypesSlice = createSlice({
  name: 'getCabtypes',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchgetcabtypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchgetcabtypes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; 
        state.error = null;
      })
      .addCase(fetchgetcabtypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export default getCabtypesSlice.reducer;
export const selectgetCabtypes = (state) => state.getCabtypes;

