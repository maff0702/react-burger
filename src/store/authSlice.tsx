import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/auth-service";

export const requestRegister = createAsyncThunk(
  'auth/register',
  async function (formData :any, { rejectWithValue }) {  
    try {
      const response = await AuthService.register(formData.state);
      return response.data;
    }catch (error) {
      return rejectWithValue(false);
    }
  }
)
export const requestLogin = createAsyncThunk(
  'auth/login',
  async function (formData :any, { rejectWithValue }) {    
    try {
      const response = await AuthService.login(formData.state);
      return response.data;
    }catch (error) {
      return rejectWithValue(false);
    }
  }
)
export const requestLogout = createAsyncThunk(
  'auth/logout',
  async function (_, { rejectWithValue }) {
    try {
      const response = await AuthService.logout();
      return response.data;
    }catch (error) {
      return rejectWithValue(false);
    }
  }
)
export const requestCheckAuth = createAsyncThunk(
  'auth/checkAuth',
  async function (_, { rejectWithValue }) {
    try {
      const response = await AuthService.checkUser();  
      return response.data;
    }catch (error) {
      return rejectWithValue(false);
    }
  }
)
export const requestUpdateUser = createAsyncThunk(
  'auth/updateUser',
  async function (formData :any, { rejectWithValue }) {    
    try {
      const response = await AuthService.updateUser(formData.state);
      return response.data;
    }catch (error) {
      return rejectWithValue(false);
    }
  }
)
export const requestForgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async function ({email} :any, { rejectWithValue }) {    
    try {
      const response = await AuthService.forgotPassword(email);
      return response.data;
    }catch (error) {
      return rejectWithValue(false);
    }
  }
)
export const requestResetPassword = createAsyncThunk(
  'auth/resetPassword',
  async function (formData :any, { rejectWithValue }) {    
    try {
      const response = await AuthService.resetPassword(formData);
      return response.data;
    }catch (error) {
      return rejectWithValue(false);
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {} as any,
    isAuth: false,
    isError: false,
    isLoading: false,
    forgotStatus: false,
    resetStatus: false
  },
  reducers: {},
  extraReducers: {
    [requestRegister.fulfilled.toString()]: (state, action) => {
      state.user = action.payload.user;
      state.isAuth = true;
      state.isError = false;
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      localStorage.setItem('accessToken', action.payload.accessToken.split(' ')[1]);
    },
    [requestRegister.rejected.toString()]: (state) => {state.isError = true},

    [requestLogin.fulfilled.toString()]: (state, action) => { 
      state.user = action.payload.user;
      state.isAuth = true;
      state.isError = false;
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      localStorage.setItem('accessToken', action.payload.accessToken.split(' ')[1]);
    },
    [requestLogin.rejected.toString()]: (state) => {state.isError = true},

    [requestLogout.fulfilled.toString()]: (state) => {
      state.user = {};
      state.isAuth = false;
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
    },

    [requestCheckAuth.pending.toString()]: (state) => {
      state.isLoading = true;
    },
    [requestCheckAuth.fulfilled.toString()]: (state, action) => {
      state.user = action.payload.user;
      state.isAuth = true;
      state.isLoading = false;
    },
    [requestCheckAuth.rejected.toString()]: (state) => {
      state.isError = true;
      state.isLoading = false;
    },

    [requestUpdateUser.fulfilled.toString()]: (state, action) => {
      state.user = action.payload.user;
    },
    [requestUpdateUser.rejected.toString()]: (state) => {state.isError = true},

    [requestForgotPassword.fulfilled.toString()]: (state) => {
      state.forgotStatus = true;
    },
    [requestForgotPassword.rejected.toString()]: (state) => {state.isError = true},

    [requestResetPassword.fulfilled.toString()]: (state) => {
      state.resetStatus = true;
      state.forgotStatus = false;
    },
    [requestResetPassword.rejected.toString()]: (state) => {state.isError = true},
  }, 
})

export const {
  
} = authSlice.actions;
export default authSlice.reducer;

