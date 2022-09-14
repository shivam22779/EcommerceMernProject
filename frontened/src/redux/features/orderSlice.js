import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createOrder = createAsyncThunk(
  "order/create",
  async ({ order, navigate, alert }, thunkAPI) => {
    try {
      const response = await api.createOrder(order);
      alert.success("Ordered successfully");
      // navigate("/account");
      return response.data.order;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const myOrders = createAsyncThunk("order/me", async (_, thunkAPI) => {
  try {
    const response = await api.myOrders();

    return response.data.orders;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const getOrderDetails = createAsyncThunk(
  "order/details",
  async (id, thunkAPI) => {
    try {
      const response = await api.getOrderDetails(id);

      return response.data.order;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
export const getAllOrdersByAdmin = createAsyncThunk(
  "order/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.getAllOrdersByAdmin();

      return response.data.orders;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
export const updateOrdersByAdmin = createAsyncThunk(
  "order/update",
  async ({ id, data, alert }, thunkAPI) => {
    try {
      const response = await api.updateOrdersByAdmin(id, data);
      alert.success("Order updated successfully");
      
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
export const deleteOrdersByAdmin = createAsyncThunk(
  "order/delete",
  async ({ id, alert, navigate }, thunkAPI) => {
    try {
      const response = await api.deleteOrdersByAdmin(id);
      alert.success("Order deleted successfully");
      navigate("/admin/dashboard");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const orderSlice = createSlice({
  name: "ordersInfo",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
    order: {},
    orders: [],
    allOrders: [],
    orderDetails: {},
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    addToCart: (state, { payload }) => {
      const data = payload;

      const isItemExist = state.cartItems.find(
        (item) => item.product === data.product
      );

      if (isItemExist) {
        state.cartItems = state.cartItems.map((item) =>
          item.product === isItemExist.product ? data : item
        );
      } else {
        state.cartItems = [...state.cartItems, data];
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, { payload }) => {
      const product = payload;

      state.cartItems = state.cartItems.filter(
        (item) => item.product !== product
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    saveShippingInfo: (state, { payload }) => {
      state.shippingInfo = payload;

      localStorage.setItem("shippingInfo", JSON.stringify(payload));
    },

    clearErrors: (state, action) => {
      state.error = null;
    },
    successReset: (state, action) => {
      state.success = false;
    },

    clearCart: (state, action)=>{
      state.cartItems = [];
    },

  },

  extraReducers: {
    [createOrder.pending]: (state, action) => {
      state.loading = true;
    },
    [createOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    [createOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [myOrders.pending]: (state, action) => {
      state.loading = true;
    },
    [myOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    [myOrders.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getOrderDetails.pending]: (state, action) => {
      state.loading = true;
    },
    [getOrderDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.orderDetails = action.payload;
    },
    [getOrderDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getAllOrdersByAdmin.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllOrdersByAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.allOrders = action.payload;
    },
    [getAllOrdersByAdmin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateOrdersByAdmin.pending]: (state, action) => {
      state.loading = true;
    },
    [updateOrdersByAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
    },
    [updateOrdersByAdmin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteOrdersByAdmin.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteOrdersByAdmin.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [deleteOrdersByAdmin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default orderSlice.reducer;
export const { addToCart, removeFromCart, saveShippingInfo, clearErrors, successReset, clearCart } =
  orderSlice.actions;
