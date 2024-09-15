import { createSlice  } from '@reduxjs/toolkit';

// this variable is used to search for products
const initialState = {
    search: ""
};

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    // This function is used to take the search string from the search field in the navbar and store it here
    searchForProduct:(state,action)=>{
        state.search = action.payload
        console.log(state.search)
    }
  },
});

export const { searchForProduct } = navbarSlice.actions;

export const selectSearch = (state) =>state.navbar.search;

export default navbarSlice.reducer;
