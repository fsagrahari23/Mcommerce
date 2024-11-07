import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
  approvalURL:null,
  isLoading: false,
  order: null,
  orderList:[],
  orderDetails:null
};

const createOrder = createAsyncThunk("/order/create", async (orderData) => {

  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/order/create`, orderData);
  return response.data;
});

const captureOrder = createAsyncThunk("/order/capture", async ({orderId,payerId,paymentId}) => {

  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/order/capture`, {orderId,payerId,paymentId});
  console.log(response.data);
  return response.data;
});

const getAllOrders = createAsyncThunk("/order/list", async ({userId}) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/order/list/${userId}`);
  return response.data;
});

const getOrderDetails = createAsyncThunk("/order/details", async ({orderId}) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/order/details/${orderId}`);
  return response.data;
});



const shopingOrderSlice= createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderDetails:(state,action)=>{
      state.orderDetails = null
    }
  },
  extraReducers:(builder)=>{

    builder.addCase(createOrder.pending, (state) => {
      state.isLoading = true;
    }).addCase(createOrder.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.order = action.payload.orderId;
      state.approvalURL = action.payload.data,
      sessionStorage.setItem("orderid", action.payload.orderId)
    }).addCase(createOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.order = null;
      state.approvalURL = null
    }).addCase(getAllOrders.pending, (state) => {
      state.isLoading = true;
    }).addCase(getAllOrders.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.orderList = action.payload.data;
    }).addCase(getAllOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.orderList = [];
    }).addCase(getOrderDetails.pending, (state) => {
      state.isLoading = true;
    }).addCase(getOrderDetails.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.orderDetails = action.payload.data;
    }).addCase(getOrderDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.orderDetails = null;
    }).addCase(captureOrder.pending, (state) => {
      state.isLoading = true;
    }).addCase(captureOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.order = null;
      state.approvalURL = null
    }).addCase(captureOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.order = null;
      state.approvalURL = null
    })  

  }
})
export const {resetOrderDetails} = shopingOrderSlice.actions
export default shopingOrderSlice.reducer
export { createOrder , captureOrder , getAllOrders , getOrderDetails}