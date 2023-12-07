import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products:[]
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addProduct: (state,payload) => {
        const pl = payload.payload
        const productname = pl.name
        const price = pl.price
        const prodid = state.products.length+1
        let cartitem = state.products.find(product => product.name === productname);

        if (cartitem) {
            cartitem.count += 1;
        } else {
            state.products.push({ id: prodid, name: productname, price: price, count: 1 });
        }
        
    },
    removeProduct: (state,payload)=>{
        const pl = payload.payload
        const prodid = pl.prodid
        let cartitem = state.products.find(product => product.id === prodid);
        if(cartitem){
            if(cartitem.count > 1){
                cartitem.count-=1
            }else{
                state.products = state.products.filter(product => product.id !== prodid);
            }
        }
        
    },
    clearCart:(state)=>{
        state.products = []
    }
  },
});

export const { addProduct,removeProduct,clearCart } = cartSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.cart.value)`
export const selectCart = (state) => state.cart.products;

export default cartSlice.reducer;
