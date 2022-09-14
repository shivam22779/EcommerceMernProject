import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue, navigate, alert }, thunkAPI) => {
    try {
      const response = await api.signIn(formValue);
      alert.success("Login successfull");
      navigate("/account");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/signup",
  async ({ updatedFormValue, navigate, alert }, thunkAPI) => {
    try {
      console.log(updatedFormValue);
      const response = await api.signUp(updatedFormValue);
      alert.success("SignUp successfull");
      navigate("/account");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      const response = await api.loadUser();

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await api.logout();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});
export const UpdateUserProfile = createAsyncThunk(
  "auth/update",
  async ({ updatedFormValue, navigate, alert }, thunkAPI) => {
    try {
      const response = await api.updateUserProfile(updatedFormValue);

      alert.success("Profile Updated successfully");
      navigate("/account");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ formValue, navigate, alert }, thunkAPI) => {
    try {
      const response = await api.changePassword(formValue);

      alert.success("Password Updated successfully");
      navigate("/login");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email, alert }, thunkAPI) => {
    try {
      const response = await api.forgotPassword(email);

      alert.success("Reset password link sent to your mail");

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ data, alert, navigate}, thunkAPI) => {
    try {
      const response = await api.resetPassword(data);

      alert.success("Password reset successfull");
      navigate("/account");

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
export const getAllUsersByAdmin = createAsyncThunk(
  "admin/allUsers",
  async (_, thunkAPI) => {
    try {
      const response = await api.getAllUsersByAdmin();
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
export const getUserDetailsByAdmin = createAsyncThunk(
  "admin/userDetails",
  async (id, thunkAPI) => {
    try {
      const response = await api.getUserDetailsByAdmin(id);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
export const updateUserByAdmin = createAsyncThunk(
  "admin/updateUser",
  async ({ id, inputData, alert, navigate }, thunkAPI) => {
    try {
      const response = await api.updateUserByAdmin(id, inputData);

      alert.success("User updated successfully");
      navigate("/admin/users");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const deleteUserByAdmin = createAsyncThunk(
  "admin/deleteUser",
  async ({ id, alert }, thunkAPI) => {
    try {
      const response = await api.deleteUserByAdmin(id);
      alert.success("User deleted successfully");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
    isAuthenticated: false,
    isUserUpdated: false,
    users: "",
    userDetails: {},
    success: false,
  },
  reducers: {
    setLogout: (state, action) => {
      state.user = null;
    },
    clearErrors: (state, action) => {
      state.error = null;
    },
    resetProfileStatus: (state, action) => {
      state.isUserUpdated = false;
    },
    resetSuccess: (state, action) => {
      state.success = false;
    },
    clearUserData: (state, action) => {
      state.userDetails = {};
    },
  },

  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    [loadUser.pending]: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    [loadUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    [loadUser.rejected]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
    },

    [logout.pending]: (state, action) => {
      state.loading = true;
      state.isAuthenticated = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    [logout.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [UpdateUserProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [UpdateUserProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.isUserUpdated = action.payload.success;
      state.user = action.payload.user;
    },
    [UpdateUserProfile.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [changePassword.pending]: (state, action) => {
      state.loading = true;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [changePassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [forgotPassword.pending]: (state, action) => {
      state.loading = true;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [forgotPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [resetPassword.pending]: (state, action) => {
      state.loading = true;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [resetPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getAllUsersByAdmin.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllUsersByAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
    },
    [getAllUsersByAdmin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getUserDetailsByAdmin.pending]: (state, action) => {
      state.loading = true;
    },
    [getUserDetailsByAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.userDetails = action.payload.user;
    },
    [getUserDetailsByAdmin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateUserByAdmin.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUserByAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
    },
    [updateUserByAdmin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteUserByAdmin.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteUserByAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
    },
    [deleteUserByAdmin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { clearErrors, resetSuccess, clearUserData } = authSlice.actions;
