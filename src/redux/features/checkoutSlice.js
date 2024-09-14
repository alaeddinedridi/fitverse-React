import { createSlice  } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// We will use these variables to return the shipping address and the payment method choosed
const initialState = {
    shippingAddress: Cookies.get('shippingAddress') ? JSON.parse(Cookies.get('shippingAddress')) : null ,
    paymentMethod: Cookies.get('paymentMethod') ? JSON.parse(Cookies.get('paymentMethod')) : null,
    order:{}
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    // This function is used to save the shipping address informations
    setShippingAddress: (state,action)=>{
        
        state.shippingAddress=action.payload
        Cookies.set('shippingAddress',JSON.stringify(state.shippingAddress))
    },
    // This function is used to save the payment method
    savePaymentMethod: (state,action)=>{
      state.paymentMethod= action.payload
      Cookies.set('paymentMethod',JSON.stringify(state.paymentMethod))
    },

    // We did not use this yet
    setOrder:(state,action)=>{
      state.order=action.payload
      // console.log('from redux order :'+state.order.orderItems[0].price)
    }

  },
});

export const { setShippingAddress,savePaymentMethod,setOrder} = checkoutSlice.actions;


export const selectShippingAddress = (state) =>state.checkout.shippingAddress;
export const selectPaymentMethod = (state) =>state.checkout.paymentMethod;
export const selectOrder = (state) =>state.checkout.order;

export default checkoutSlice.reducer;
