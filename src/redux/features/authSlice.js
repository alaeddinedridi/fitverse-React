import { createSlice  } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// These variables are used to return user informations
const initialState = {
    userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null ,
    userRole: "user",
    isTokenExpired:Cookies.get('isTokenExpired') ? Cookies.get('isTokenExpired') : true
    
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Check if token has expired
    checkIfTokenExpired: (state,action)=>{
      const data = axios.get('http://localhost:3001/auth/isauthorized',{
        headers: {
          authorization: `Bearer ${action.payload}`,
        },
      }).then((res)=> {
        console.log(res.data.expired)
        state.isTokenExpired=res.data.expired
        console.log("this is the new value of isTokenExpired ="+state.isTokenExpired)
        return res.data.expired;
      },
      (err)=>{
        console.log(err)
        return err;
      });
      
      
    
      
    },

    // When the user signin, Save his informations
    login: (state,action)=>{
        console.log('in redux login')
        state.userInfo=action.payload
        // Store user informations in cookies
        Cookies.set('userInfo',JSON.stringify(state.userInfo))
        //state.userRole=state.userInfo.user.role
        state.isTokenExpired=false
        console.log("this is the value of isTokenExpired after login: "+state.isTokenExpired)
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

export const { login,logout,checkIfTokenExpired} = authSlice.actions;

export const selectisTokenExpired = (state) => state.auth.isTokenExpired;
export const selectUser = (state) =>state.auth.userInfo;

export const selectUserRole = (state) =>state.auth.userRole;

export default authSlice.reducer;
