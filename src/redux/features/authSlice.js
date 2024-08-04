import { createSlice  } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null ,
    userRole: "user"
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state,action)=>{
        console.log('in redux login')
        state.userInfo=action.payload
        Cookies.set('userInfo',JSON.stringify(state.userInfo))
        //state.userRole=state.userInfo.user.role
    },

    logout: (state)=>{
      state.userInfo=null
      Cookies.remove('userInfo')
      //what is left to do is to remove all the items from the cart !!
    }
  },
});

export const { login,logout} = authSlice.actions;

export const selectUser = (state) =>state.auth.userInfo;

export const selectUserRole = (state) =>state.auth.userRole;

export default authSlice.reducer;
