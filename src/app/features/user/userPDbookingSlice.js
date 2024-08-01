import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserPDbookings = createAsyncThunk('userPDbookings/fetchUserPDbookings', async(userId)=>{

    const response = await fetch(`/api/cab/GetcabbookingbyID?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      return data;
});

const userPDbookingSlice = createSlice({
    name:'userPDbookings',
    initialState:{
        items:[],
        loading : false,
        error: null

    },
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(fetchUserPDbookings.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchUserPDbookings.fulfilled, (state, action) => {
            state.loading = false;
            state.userPDbookings = action.payload;
            state.error = null;
          })
          .addCase(fetchUserPDbookings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
      },
})

export default userPDbookingSlice.reducer;

export const {} = userPDbookingSlice.actions;

export const selectUserPDbooking = (state) => state.userPDbookings.userPDbookings;
export const selectLoading = (state) => state.userPDbookings.loading;
export const selectError = (state) => state.userPDbookings.error;