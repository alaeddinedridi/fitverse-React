import { createSlice  } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// These variables are used to return user informations
const initialState = {
    userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null ,
    userRole: "user"
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // When the user signin, Save his informations
    login: (state,action)=>{
        console.log('in redux login')
        state.userInfo=action.payload
        // Store user informations in cookies
        Cookies.set('userInfo',JSON.stringify(state.userInfo))
        //state.userRole=state.userInfo.user.role
    },

    // This is used to logout the user/admin
    logout: (state)=>{
      state.userInfo=null
      // Remove the user/admin from cookies
      Cookies.remove('userInfo')
      //what is left to do is to remove all the items from the cart !!
    }
  },
});

export const { login,logout} = authSlice.actions;

export const selectUser = (state) =>state.auth.userInfo;

export const selectUserRole = (state) =>state.auth.userRole;

export default authSlice.reducer;
