import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk('user/fetchUser', async()=>{

    const response = await fetch('/api/user/Getuser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      return data.user;
});

const userSlice = createSlice({
    name:'user',
    initialState:{
        items:[],
        loading : false,
        error: null

    },
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(fetchUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
          })
          .addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
      },
})

export default userSlice.reducer;

export const {} = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;