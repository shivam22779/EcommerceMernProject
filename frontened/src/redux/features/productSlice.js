import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getProducts = createAsyncThunk(
  "/product/getProducts",
  async ({keyword="",currentPage=1, price=[0, 25000], category, rating=0}, thunkAPI) => {
    try {
      const response = await api.getProducts(keyword, currentPage, price, category, rating);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
export const getProductDetails = createAsyncThunk(
  "/product/getProductDetails",
  async (id, thunkAPI) => {
    try {
      const response = await api.getProductDetails(id);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const addNewReview = createAsyncThunk(
  "/product/addNewReview",
  async ({data, alert}, thunkAPI) => {
    try {
      const response = await api.addNewReview(data);
      alert.success("Product reviewed successfully");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const getProductsByAdmin = createAsyncThunk(
  "/admin/products",
  async (_ , thunkAPI) => {
    try {
      const response = await api.getAllProductsByAdmin();
      
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
export const addNewProductByAdmin = createAsyncThunk(
  "/admin/addProduct",
  async ({data, alert, navigate} , thunkAPI) => {
    try {
      const response = await api.addNewProductByAdmin(data);
      alert.success("Product created successfully");
      navigate("/admin/dashboard");
      
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
export const deleteProductByAdmin = createAsyncThunk(
  "/admin/deleteProduct",
  async ({id, alert, navigate} , thunkAPI) => {
    try {
      const response = await api.deleteProductByAdmin(id);
      alert.success("Product deleted successfully");
      navigate("/admin/dashboard");
      
      
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const updateProductByAdmin = createAsyncThunk(
  "/admin/updateProduct",
  async ({id, data, alert, navigate} , thunkAPI) => {
    try {
      const response = await api.updateProductByAdmin(id, data);
      alert.success("Product updated successfully");
      navigate("/admin/dashboard");
      
      
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const getProductReviews = createAsyncThunk(
  "admin/getReviews",
  async ({productId}, thunkAPI) => {
    try {
      const response = await api.getProductReviews(productId);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
export const deleteProductReview = createAsyncThunk(
  "admin/deleteReview",
  async ({productId, reviewId, alert}, thunkAPI) => {
    try {
      const response = await api.deleteProductReview(productId, reviewId);
      alert.success("Review deleted successfully")
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
export const getRelatedProducts = createAsyncThunk(
  "related/products",
  async (data, thunkAPI) => {
    try {
      const response = await api.getRelatedTours(data);
      
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
    
      

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productDetails: {},
    newProduct: {},
    loading: false,
    error: null,
    productsCount: 0,
    resultPerPage: null,
    success: "",
    noOfPages: null,
    productReviews: [],
    relatedProducts: ""
  },
    
    
    
    
  reducers: {
    clearErrors: (state, action) => {
      state.error = null;
    },
    resetSuccess: (state, action) => {
      state.success = "";
    },
  },
   

  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.filteredProductCount;
      state.noOfPages = action.payload.totalPage
      state.resultPerPage = action.payload.resultPerPage
      
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getProductDetails.pending]: (state, action) => {
      state.loading = true;
    },
    [getProductDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.productDetails = action.payload.product;
      
    },
    [getProductDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addNewReview.pending]: (state, action) => {
      state.loading = true;
    },
    [addNewReview.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload.message
    },
    [addNewReview.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getProductsByAdmin.pending]: (state, action) => {
      state.loading = true;
    },
    [getProductsByAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
    },
    [getProductsByAdmin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addNewProductByAdmin.pending]: (state, action) => {
      state.loading = true;
    },
    [addNewProductByAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.newProduct = action.payload.product;
    },
    [addNewProductByAdmin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteProductByAdmin.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteProductByAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      
    },
    [deleteProductByAdmin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateProductByAdmin.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProductByAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      
    },
    [updateProductByAdmin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getProductReviews.pending]: (state, action) => {
      state.loading = true;
    },
    [getProductReviews.fulfilled]: (state, action) => {
      state.loading = false;
      state.productReviews = action.payload.reviews;
      
    },
    [getProductReviews.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteProductReview.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteProductReview.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
    },
    [deleteProductReview.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getRelatedProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [getRelatedProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.relatedProducts = action.payload.relatedProducts;
    },
    [getRelatedProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
      
      

export default productSlice.reducer;
export const {clearErrors, resetSuccess } = productSlice.actions;
