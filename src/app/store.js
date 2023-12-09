import { configureStore } from '@reduxjs/toolkit';

import cartReducer from '../features/supermarket/cartSlice';
import superReducer from '../features/supermarket/superSlice';
import loginReducer from '../features/login/loginSlice';
import darkModeReducer from '../features/settings/darkModeSlice';
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    super: superReducer,
    login: loginReducer,
    darkMode: darkModeReducer
  },
});
