import { createSlice  } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// We will use these variables to return the products and the number of products inside the cart and the total price
const initialState = {
    cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [] ,
    nbrItems: Cookies.get('cartNbrItems') ? JSON.parse(Cookies.get('cartNbrItems')) : 0,
    total: Cookies.get('cartTotalPrice') ? JSON.parse(Cookies.get('cartTotalPrice')) : 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // This function is used to add an item to the cart
    addItem: (state,action)=>{
        // If the product is out of stock then don't add it to cart
        if (action.payload.countInStock <= 0){
          window.alert("Product is out of stock.")
          return;
        }
        const existItem = state.cartItems.find(item => item._id === action.payload._id)
        // Check if the product already exists in the cart, if not then we add it to the cart
        if (!existItem){
          state.cartItems.push(action.payload)
          state.nbrItems+=1
          state.total+=Number(action.payload.price)
          // Save products added in cart, the number of products in cart and their total price in cookies
          Cookies.set('cartItems',JSON.stringify(state.cartItems))
          Cookies.set('cartNbrItems',JSON.stringify(state.nbrItems))
          Cookies.set('cartTotalPrice',JSON.stringify(state.total))
        }
        
        
    },

    // This function is used to remove an item from the cart
    removeItem: (state,action)=>{
        // remove product from cart
        state.cartItems = state.cartItems.filter(item =>item._id !== action.payload._id);
        // decrease the number of products in cart
        state.nbrItems-=1
        // Update the total price of products in cart
        state.total-=Number(action.payload.price)
        // Update those changes in cookies
        Cookies.set('cartItems',JSON.stringify(state.cartItems))
        Cookies.set('cartNbrItems',JSON.stringify(state.nbrItems))
        Cookies.set('cartTotalPrice',JSON.stringify(state.total))
    },

    // Remove all products from cart
    clear:(state)=>{
      // reinitialize the number of items and total price to 0
      state.cartItems=[]
      state.nbrItems=0
      state.total=0
      // Remove the cookies
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
