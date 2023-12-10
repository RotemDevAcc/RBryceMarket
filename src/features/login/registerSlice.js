import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { regtoServer } from './registerAPI';

const initialState = {
  status:""
};


export const registerAsync = createAsyncThunk(
    'register/regtoServer',
    async (details) => {
      const response = await regtoServer(details);
      return response.data;
    }
  );


export const registerSlice = createSlice({
  name: 'register',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status ='done'
        if(!action.payload.access) return
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status ='rejected'
      })
      .addCase(registerAsync.pending, (state, action) => {
        state.status = "loading...";
      })
  },
});



// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.register.value)`
export const register_status = (state) => state.register.status;

export default registerSlice.reducer;
