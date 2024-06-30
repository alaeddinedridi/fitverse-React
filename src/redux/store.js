import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './features/sidebarSlice';
import cartReducer from './features/cartSlice';
import authReducer from './features/authSlice';
import checkoutReducer from './features/checkoutSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    cart:cartReducer,
    auth:authReducer,
    checkout:checkoutReducer
  },
});