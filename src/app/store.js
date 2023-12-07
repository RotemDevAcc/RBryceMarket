import { configureStore } from '@reduxjs/toolkit';

import cartReducer from '../features/supermarket/cartSlice';
import superReducer from '../features/supermarket/superSlice';
import loginReducer from '../features/supermarket/loginSlice';
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    super: superReducer,
    login: loginReducer
  },
});
