import { createSlice  } from '@reduxjs/toolkit';

const initialState = {
    search: ""
};

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    searchForProduct:(state,action)=>{
        state.search = action.payload
        console.log(state.search)
    }
  },
});

export const { searchForProduct } = navbarSlice.actions;

export const selectSearch = (state) =>state.navbar.search;

export default navbarSlice.reducer;
