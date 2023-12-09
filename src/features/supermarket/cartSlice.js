import { createSlice } from '@reduxjs/toolkit';
import { Message } from '../../Message';
const initialState = {
  products:[],
  totalPrice:0.0
};

function CalculatePrice(state){
    let calcprice = 0.0
    state.products.forEach(product => {
        calcprice += product.price * product.count
    });
    state.totalPrice = calcprice.toFixed(2)
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addProduct: (state,payload) => {
        const pl = payload.payload
        const productname = pl.name
        const price = pl.price
        const prodid = pl.id
        let cartitem = state.products.find(product => product.name === productname);

        if (cartitem) {
            cartitem.count += 1;
        } else {
            state.products.push({ id: prodid, name: productname, price: price, count: 1 });
        }
        
        CalculatePrice(state)
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

        CalculatePrice(state)
        
    },
    clearCart:(state)=>{
        state.products = []
        state.totalPrice = 0.0
        Message("Cart Cleared","success")
    }
  },
});

export const { addProduct,removeProduct,clearCart } = cartSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.cart.value)`
export const selectCart = (state) => state.cart.products;
export const selectPrice = (state) => state.cart.totalPrice;

export default cartSlice.reducer;
