import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './superAPI';


const initialState = {
  products:[],
  status:""
};

export const getDataAsync = createAsyncThunk(
    'super/fetchProducts',
    async () => {
      const response = await fetchProducts();
      return response.data;
    }
  );

export const superSlice = createSlice({
  name: 'super',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    purchaseCart:(state,payload)=>{
        const cart = payload.payload.cart
        console.table(cart)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataAsync.fulfilled, (state, action) => {
        state.products =action.payload
        state.status ='Done'
      })
      .addCase(getDataAsync.rejected, (state, action) => {
        state.status ='Rejected'
      })
  },
  
});

export const { purchaseCart } = superSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.super.value)`
export const selectproducts = (state) => state.super.products;
export const selectstatus = (state) => state.super.status;

export default superSlice.reducer;
