import axios from "axios";


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: {
    items: [],
  },
  isLoading:false
};
export const addToCart = createAsyncThunk('/cart/add', async ({userId,productId,quantity}) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/cart/add`,{userId,productId,quantity},{
    withCredentials:true
  })
  return response.data;
})
export const deleteCart = createAsyncThunk('/cart/delete', async ({userId,productId}) => {
 
  const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/shop/cart/delete/${userId}/${productId}`,{
    withCredentials:true
  })
  return response.data;
})

export const updateCartItem = createAsyncThunk('/cart/update-cart', async ({id,productId,quantity}) => {
  const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/shop/cart/update-cart/${id}`,{productId,quantity},{
    withCredentials:true
  })
  return response.data;
})

export const fetchCart = createAsyncThunk('/cart/fetch', async ({userId}) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/cart/fetch/${userId}`,{
    withCredentials:true
  })
  return response.data;
})



const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{

    builder.addCase(addToCart.pending,(state)=>{
      state.isLoading = true
    }).addCase(addToCart.fulfilled,(state,action)=>{
 
      state.isLoading = false
      state.cartItems = action.payload.data

    }).addCase(addToCart.rejected,(state)=>{
      state.isLoading = false
      state.cartItems = []
    }).addCase(fetchCart.pending,(state)=>{
      state.isLoading = true
    }).addCase(fetchCart.fulfilled,(state,action)=>{
     
      state.isLoading = false
      state.cartItems = action.payload.data

    }).addCase(fetchCart.rejected,(state)=>{
      state.isLoading = false
      state.cartItems = []
    }).addCase(deleteCart.pending,(state)=>{
      state.isLoading = true
    }).addCase(deleteCart.fulfilled,(state,action)=>{
   
      state.isLoading = false
      state.cartItems = action.payload.data

    }).addCase(deleteCart.rejected,(state)=>{
      state.isLoading = false
      state.cartItems = []
    }).addCase(updateCartItem.pending,(state)=>{
      state.isLoading = true
    }).addCase(updateCartItem.fulfilled,(state,action)=>{
   
      state.isLoading = false
      state.cartItems = action.payload.data

    }).addCase(updateCartItem.rejected,(state)=>{
      state.isLoading = false
      state.cartItems = []
    })
  }
})

export default cartSlice.reducer;

    