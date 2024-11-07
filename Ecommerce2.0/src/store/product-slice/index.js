import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productsList: [],
  productDetail:null,
}

const fetchAllFilteredProducts = createAsyncThunk('/shop/products/get', async ({filterParams,sortParams}) => {
  const query = new URLSearchParams({...filterParams,sortBy:sortParams});
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/get?${query} `, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },  
    
  }
  )
  return response.data;
})

const fetchDetailedProducts = createAsyncThunk(`/shop/products/get/:id`, async (productId) => {
  
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/get/${productId} `
  )
  // const data = await response.json()
 
  return response.data;
})



const shopProductSlice = createSlice({
  name:'shoppingProducts',
  initialState,
  reducers:{
    setProductDetails:(state,action)=>{
      state.productDetail = null;
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchAllFilteredProducts.pending,(state)=>{
      state.isLoading = true
    })
    .addCase(fetchAllFilteredProducts.fulfilled,(state,action)=>{
      
      state.isLoading = false
      state.productsList = action.payload.data
    }).addCase(fetchAllFilteredProducts.rejected,(state)=>{
      state.isLoading = false
      state.productsList = [];
    }).addCase(fetchDetailedProducts.pending,(state)=>{
      state.isLoading = true
    })
    .addCase(fetchDetailedProducts.fulfilled,(state,action)=>{
      
      state.isLoading = false
      state.productDetail= action.payload.data
    }).addCase(fetchDetailedProducts.rejected,(state)=>{
      state.isLoading = false
      state.productDetail = null;
    })
  }

})
export const {setProductDetails} = shopProductSlice.actions
export default shopProductSlice.reducer
export {fetchAllFilteredProducts,fetchDetailedProducts}