import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './features/sidebarSlice';
import cartReducer from './features/cartSlice';
import authReducer from './features/authSlice';
import checkoutReducer from './features/checkoutSlice';
import navbarReducer from './features/navbarSlice';
import productReducer from './features/productSlice';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";



export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    cart:cartReducer,
    auth:authReducer,
    checkout:checkoutReducer,
    navbar:navbarReducer,
    product:productReducer,
   
  },
  middleware:() => []

});