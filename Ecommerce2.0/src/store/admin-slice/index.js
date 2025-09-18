import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const addNewProduct = createAsyncThunk('/admin/products/addnewproduct', async (formdata) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/add`,formdata,{
    headers:{
      'Content-Type': 'application/json',
    },
    withCredentials:true
  })
  const data = response.data;
  return data
})

const fetchAllProducts = createAsyncThunk('/admin/products/fetch', async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products/fetch `, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },  
    
  }
  )
  // const data = await response.json()
  return response.data;
})
const editProducts = createAsyncThunk('/admin/products/editData', async ({formdata,id}) => {
  const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`,formdata, {
    headers: {
      'Content-Type': 'application/json',
    },  
    
  }
  )
  // const data = await response.json()
  return response.data;
})
const deleteProducts = createAsyncThunk('/admin/products/deletePrduct', async ({id}) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`
  )
  // const data = await response.json()
  return response.data;
})

const initialState = {
  isLoading: false,
  products: [],
}
const AdminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.isLoading = true
    }).addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.isLoading = false
      state.products = action.payload.products
    }).addCase(fetchAllProducts.rejected, (state) => {
      state.isLoading = false
      state.products = [];
    })
  }
})

export default AdminProductSlice.reducer;

export { addNewProduct,fetchAllProducts,editProducts,deleteProducts }