import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
  isLoading: false,
  searchValue: [],
};

const searchProducts = createAsyncThunk("/search/products", async (searchValue) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/search/${searchValue}`);
  return response.data;
});


const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase( searchProducts.pending, (state) => {
      state.isLoading = true;
    }).addCase( searchProducts.fulfilled, (state, action) => {

      state.isLoading = false;
      state.searchValue = action.payload.data;
    }).addCase( searchProducts.rejected, (state) => {
      state.isLoading = false;
      state.searchValue = [];
    })
  },
});

export default searchSlice.reducer;
export { searchProducts };