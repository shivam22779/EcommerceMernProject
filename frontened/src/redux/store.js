import {configureStore} from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import authSlice from "./features/authSlice";
import orderSlice from "./features/orderSlice";

const store = configureStore({
    reducer:{
        product: productSlice,
        auth: authSlice,
        ordersInfo: orderSlice,
    }
});

export default store;