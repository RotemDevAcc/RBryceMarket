import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './superAPI';
import { buyCart } from './superAPI';


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
      const pl = payload.payload
      const cart = pl.cart
      const token = pl.token
      const price = pl.price
      const data = {
        "cart":cart,
        "token":token,
        "price":price
      }
      buyCart(data)
    },


    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataAsync.fulfilled, (state, action) => {
        state.products =action.payload.products
        state.categories = action.payload.categories
        state.status ='done'
      })
      .addCase(getDataAsync.rejected, (state, action) => {
        state.status ='rejected'
      })
      .addCase(getDataAsync.pending, (state, action) => {
        state.status = "loading";
      })
  },
  
});

export const { purchaseCart } = superSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.super.value)`
export const selectproducts = (state) => state.super.products;
export const selectcategories = (state) => state.super.categories;
export const selectstatus = (state) => state.super.status;
export default superSlice.reducer;
