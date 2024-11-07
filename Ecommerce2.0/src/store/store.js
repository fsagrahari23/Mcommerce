import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductSlice from "./admin-slice";
import shopProductSlice from "./product-slice";
import cartSlice from "./cart-slice";
import addressSlice from "./address-slice"
import orderSlice from "./order-slice"
import adminOrderSlice from "./admin-order-slice"
import searchSlice from "./search-slice"
const store = configureStore({
  reducer:{
    auth:authReducer,
    adminProducts:AdminProductSlice,
    shopProducts:shopProductSlice,
    shopCart:cartSlice,
    userAddress:addressSlice,
    order:orderSlice,
    adminOrder:adminOrderSlice,
    shopSearch:searchSlice,
  }
});


export default store;