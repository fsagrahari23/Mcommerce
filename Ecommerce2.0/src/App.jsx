import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/Layout";
import AuthLogin from "./Pages/Auth/Login";
import Authregister from "./Pages/Auth/Register";
import AdminLayout from "./components/adminView/Layout";
import AdminDashboard from "./Pages/AdminView/Dashboard";
import { AdminFeatures } from "./Pages/AdminView/Features";
import AdminProducts from "./Pages/AdminView/Products";
import AdminOrders from "./Pages/AdminView/Orders";
import ShopingLayout from "./components/shopingView/Layout";
import NotFound from "./Pages/NotFoud";
import { ShoppingHome } from "./Pages/ShopingView/Home";
import Checkout from "./Pages/ShopingView/Checkout";
import { ShoppingListing } from "./Pages/ShopingView/Listing";
import { Account } from "./Pages/ShopingView/Account";
import { CheckAuth } from "./components/common/Check-auth";
import UnauthPage from "./Pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./components/shopingView/paypal-return";
import PaymentSuccessPage from "./components/shopingView/payment-sucess";
import SearchProducts from "./Pages/ShopingView/SearchPage";
import LandingPage from "./Pages/LandingPage";

function App() {
  let { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  }

  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white"></div>
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<Authregister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShopingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="listedItem" element={<ShoppingListing />} />
          <Route path="account" element={<Account />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="/shop/search" element={<SearchProducts />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />
      </Routes>
    </>
  );
}
export default App;
