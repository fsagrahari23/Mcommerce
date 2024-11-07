import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
  addresses: [],
  isLoading: false,
};

const addAddress = createAsyncThunk("/address/add", async (formdata) => {

  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/address/add`, {formdata});

  return response.data;
  
});
const editAddress = createAsyncThunk("/address/edit", async ({formData , userId, addId}) => {
   
  const response = await axios.put(`h${import.meta.env.VITE_API_URL}/api/shop/address/edit/${userId}/${addId}`, formData);
  return response.data;
});

const deleteAddress = createAsyncThunk("/address/delete", async ({ userId, addId}) => {
  const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/shop/address/delete/${userId}/${addId}`);
  return response.data;
});
const fetchAddress = createAsyncThunk("/address/fecth", async ({userId}) => {
  // console.log(userId);
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`);
  return response.data;
});



const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(addAddress.pending,(state)=>{
      state.isLoading = true;
    }).addCase(addAddress.fulfilled,(state,action)=>{
      console.log(action.payload);
      state.isLoading = false;
     
    }).addCase(addAddress.rejected,(state)=>{
      state.isLoading = false;
      
    }).addCase(editAddress.pending,(state)=>{
      state.isLoading = true;
    }).addCase(editAddress.fulfilled,(state,action)=>{
      
      state.isLoading = false;
      state.addresses = action.payload;
    }).addCase(editAddress.rejected,(state)=>{
      state.isLoading = false;
      state.addresses = [];
    }).addCase(fetchAddress.pending,(state)=>{
      state.isLoading = true;
    }).addCase(fetchAddress.fulfilled,(state,action)=>{
      state.isLoading = false;
      state.addresses = action.payload.data;
    }).addCase(fetchAddress.rejected,(state)=>{
      state.isLoading = false;
      state.addresses = [];
    }).addCase(deleteAddress.pending,(state)=>{
      state.isLoading = true;
    }).addCase(deleteAddress.fulfilled,(state,action)=>{
      
      state.isLoading = false;
      state.addresses = action.payload;
    }).addCase(deleteAddress.rejected,(state)=>{
      state.isLoading = false;
      state.addresses = [];
    })
  },
})

export default addressSlice.reducer;

export { addAddress, editAddress, deleteAddress, fetchAddress };