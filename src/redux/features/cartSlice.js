import { createSlice  } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [] ,
    nbrItems: Cookies.get('cartNbrItems') ? JSON.parse(Cookies.get('cartNbrItems')) : 0,
    total: Cookies.get('cartTotalPrice') ? JSON.parse(Cookies.get('cartTotalPrice')) : 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state,action)=>{
        if (action.payload.countInStock <= 0){
          window.alert("Product is out of stock.")
          return;
        }
        const existItem = state.cartItems.find(item => item._id === action.payload._id)
        if (!existItem){
          state.cartItems.push(action.payload)
          state.nbrItems+=1
          state.total+=Number(action.payload.price)
          Cookies.set('cartItems',JSON.stringify(state.cartItems))
          Cookies.set('cartNbrItems',JSON.stringify(state.nbrItems))
          Cookies.set('cartTotalPrice',JSON.stringify(state.total))
        }
        
        
    },
    removeItem: (state,action)=>{
        state.cartItems = state.cartItems.filter(item =>item._id !== action.payload._id);
        state.nbrItems-=1
        state.total-=Number(action.payload.price)
        Cookies.set('cartItems',JSON.stringify(state.cartItems))
        Cookies.set('cartNbrItems',JSON.stringify(state.nbrItems))
        Cookies.set('cartTotalPrice',JSON.stringify(state.total))
    },
    clear:(state)=>{
      state.cartItems=[]
      state.nbrItems=0
      state.total=0
      Cookies.remove('cartItems')
      Cookies.remove('cartNbrItems')
      Cookies.remove('cartTotalPrice')
    }
  },
});

export const { addItem,removeItem,clear} = cartSlice.actions;

export const selectCart = (state) =>state.cart.cartItems;
export const selectNbrItems = (state) => state.cart.nbrItems;
export const selectTotal = (state) => state.cart.total;
export default cartSlice.reducer;
