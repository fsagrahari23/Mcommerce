import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails:null
};


const getAllOrders = createAsyncThunk("/order/list", async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/order/list`);
  return response.data;
});

const getOrderDetails = createAsyncThunk("/order/details", async ({orderId}) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/order/details/${orderId}`);
  return response.data;
});
const updateOrderDetails = createAsyncThunk("/order/details", async ({orderId, orderStatus}) => {
  const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/order/update/${orderId}`, {orderStatus});
  return response.data;
});




const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {
    resetOrderDetails:(state)=>{state.orderDetails = null}
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      }).addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
    }

  });

const {resetOrderDetails} = adminOrderSlice.actions
export {resetOrderDetails}

export default adminOrderSlice.reducer;

export { getAllOrders, getOrderDetails , updateOrderDetails};
