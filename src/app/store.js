import { configureStore } from '@reduxjs/toolkit';

import cartReducer from '../features/supermarket/cartSlice';
import superReducer from '../features/supermarket/superSlice';
import loginReducer from '../features/login/loginSlice';
import darkModeReducer from '../features/settings/darkModeSlice';
import registerReducer from '../features/login/registerSlice';
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    super: superReducer,
    login: loginReducer,
    register: registerReducer,
    darkMode: darkModeReducer
  },
});
