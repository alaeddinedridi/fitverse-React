import { createSlice  } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    shippingAddress: Cookies.get('shippingAddress') ? JSON.parse(Cookies.get('shippingAddress')) : null ,
    paymentMethod: Cookies.get('paymentMethod') ? JSON.parse(Cookies.get('paymentMethod')) : null,
    order:{}
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setShippingAddress: (state,action)=>{
        
        state.shippingAddress=action.payload
        Cookies.set('shippingAddress',JSON.stringify(state.shippingAddress))
    },
    savePaymentMethod: (state,action)=>{
      state.paymentMethod= action.payload
      Cookies.set('paymentMethod',JSON.stringify(state.paymentMethod))
    },
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
