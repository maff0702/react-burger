import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/AuthService";

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

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {} as any,
    isAuth: false,
    isError: false,
  },
  reducers: {
    ingredientCurrentIncrement: (state, action) => {

    },
  },
  extraReducers: {
    [requestRegister.fulfilled.toString()]: (state, action) => {
      state.user = action.payload.user;
      state.isAuth = true;
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      localStorage.setItem('accessToken', action.payload.accessToken.split(' ')[1]);
    },
    [requestRegister.rejected.toString()]: (state) => {state.isError = true},

    [requestLogin.fulfilled.toString()]: (state, action) => { 
      state.user = action.payload.user;
      state.isAuth = true;
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
    [requestLogout.rejected.toString()]: (state) => {state.isError = true},

    [requestCheckAuth.fulfilled.toString()]: (state, action) => {
      state.user = action.payload.user;
      state.isAuth = true;
    },
    [requestCheckAuth.rejected.toString()]: (state) => {state.isError = true},
  }, 
})

export const {
  
} = authSlice.actions;
export default authSlice.reducer;

