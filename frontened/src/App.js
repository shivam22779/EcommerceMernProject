import { useState } from "react";
import "./App.css";
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/product/ProductDetails.js";
import Products from "./components/products/Products.js";
import Login from "./components/users/Login/Login.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/users/Register/Register";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/features/authSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import UserOptions from "./components/layout/Header/UserOptions.js";
import Profile from "./components/users/profile/Profile.js";
// import { useAlert } from "react-alert";
import ProtectedRoute from "./components/route/ProtectedRoute";
import AdminRoute from "./components/route/AdminRoute";
import ChangePassword from "./components/users/ChangePassword/ChangePassword.js";
import ForgetPassword from "./components/users/forgetPassword/ForgetPassword.js";
import ResetPassword from "./components/users/resetPassword/ResetPassword.js";
import Cart from "./components/cart/Cart.js";
import Shipping from "./components/cart/Shipping.js";
import ConfirmOrder from "./components/cart/ConfirmOrder.js";
import OrderSuccess from "./components/cart/OrderSuccess.js";
import Payment from "./components/cart/Payment.js";
import MyOrders from "./components/cart/MyOrders.js";
import OrderDetails from "./components/cart/OrderDetails.js";
import AdminDashboard from "./components/admin/AdminDashboard.js";
import ProductList from "./components/admin/ProductList.js";
import NewProduct from "./components/admin/NewProduct.js";
import UpdateProduct from "./components/admin/UpdateProduct.js";
import OrderList from "./components/admin/OrderList.js";
import ProcessOrder from "./components/admin/ProcessOrder.js";
import UsersList from "./components/admin/UsersList.js";
import UpdateUser from "./components/admin/UpdateUser.js";
import ProductReviews from "./components/admin/ProductReviews.js";
// import { API } from "./redux/api";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import Contact from "./components/contact/Contact";
import About from "./components/about/About";

function App() {
  // const [stripeApiKey, setStripeApiKey] = useState("");
  const [stripePromise] = useState(() => loadStripe(process.env.REACT_APP_STRIPE_API_KEY));
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => ({ ...state.auth }));

  // const getStripeApiKey = async () => {
  //   const { data } = await API.get("/api/v1/stripeapikey");

  //   setStripeApiKey(data.stripeApiKey);
  // };

  
  // const getCookie = () => {
  //   let cookieName;
  //   let allCookies = document.cookie;
  //   let allCookieArray = allCookies.split(";");

  //   for (let i = 0; i < allCookieArray.length; i++) {
  //   cookieName = allCookieArray[i].split("=")[0];
  //   }
  //   return cookieName;
  // };

  useEffect(() => {
    // let cookieName = getCookie();
    dispatch(loadUser());
    // getStripeApiKey();
    // eslint-disable-next-line
  }, []);

  // window.addEventListener("contextmenu", (e)=> e.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/search" element={<Products />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route exact path="/forgetPassword" element={<ForgetPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/cart" element={<Cart />} />
        <Route
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />

        
        {
          <Route
            exact
            path="/process/payment"
            element={
              <ProtectedRoute>
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
        }
        {/* {
          <Route
            exact
            path="/process/payment"
            element={ stripeApiKey &&
              <ProtectedRoute>
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
        } */}

        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <ProductList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <AdminRoute>
              <NewProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/product/:id"
          element={
            <AdminRoute>
              <UpdateProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <OrderList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/order/:id"
          element={
            <AdminRoute>
              <ProcessOrder />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <UsersList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <AdminRoute>
              <UpdateUser />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <AdminRoute>
              <ProductReviews />
            </AdminRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
