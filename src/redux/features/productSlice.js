import { createSlice  } from '@reduxjs/toolkit';
import axios from 'axios'


const initialState = {
    allProductsData: []
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    readAllProducts:  (state)=>{
        console.log("this is before fetch  products")
        state.allProductsData =  axios.get('http://localhost:3001/products/read')
        
    }
  },
  
});

export const { readAllProducts } = productSlice.actions;

export const selectAllProductsData = (state) =>state.product.allProductsData;

export default productSlice.reducer;
