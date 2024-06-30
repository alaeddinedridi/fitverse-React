import { createSlice  } from '@reduxjs/toolkit';

const initialState = {
    toggle: false
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggle:(state,action)=>{
        state.toggle = action.payload
        console.log(state.toggle)
    }
  },
});

export const { toggle } = sidebarSlice.actions;

export const selectToggle = (state) =>state.sidebar.toggle;

export default sidebarSlice.reducer;
