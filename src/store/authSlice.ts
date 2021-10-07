import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AuthService from "../services/auth-service";
import { TUserInfo } from "../types/types";
import {
  IRegisterUser,
  ILoginUser,
  IUpdateUser,
  ICheckUser
} from '../types/services/auth-types';

export const requestRegister = createAsyncThunk(
  'auth/register',
  async (formData:{state: TUserInfo &{password: string}}) => {
    const response = await AuthService.register(formData.state);
    return response.data;
  }
)
export const requestLogin = createAsyncThunk(
  'auth/login',
  async (formData:{state: {email:string; password: string}}) => {
    const response = await AuthService.login(formData.state);
    return response.data;
  }
)
export const requestLogout = createAsyncThunk(
  'auth/logout',
  async () => {
    const response = await AuthService.logout();
    return response.data;
  }
)
export const requestCheckAuth = createAsyncThunk(
  'auth/checkAuth',
  async () => {
    const response = await AuthService.checkUser();
    return response.data;
  }
)
export const requestUpdateUser = createAsyncThunk(
  'auth/updateUser',
  async (formData:{state: TUserInfo}) => {
    const response = await AuthService.updateUser(formData.state);
    return response.data;
  }
)
export const requestForgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({email}:{email: string}) => {
    const response = await AuthService.forgotPassword(email);
    return response.data;
  }
)
export const requestResetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (formData:{token: string; password: string}) => {
    const response = await AuthService.resetPassword(formData);
    return response.data;
  }
)

type user = {
  email: string;
  name: string;
}

export type TAuthState = {
  user: user | null;
  isAuth: boolean;
  isError: boolean;
  isLoading: boolean;
  forgotStatus: boolean;
  resetStatus: boolean;
};
const initialState: TAuthState = {
  user: null,
  isAuth: false,
  isError: false,
  isLoading: false,
  forgotStatus: false,
  resetStatus: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [requestRegister.fulfilled.toString()]: (state, action:PayloadAction<IRegisterUser>) => {
      state.user = action.payload.user;
      state.isAuth = true;
      state.isError = false;
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      localStorage.setItem('accessToken', action.payload.accessToken.split(' ')[1]);
    },
    [requestRegister.rejected.toString()]: (state) => {state.isError = true},

    [requestLogin.fulfilled.toString()]: (state, action:PayloadAction<ILoginUser>) => { 
      state.user = action.payload.user;
      state.isAuth = true;
      state.isError = false;
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      localStorage.setItem('accessToken', action.payload.accessToken.split(' ')[1]);
    },
    [requestLogin.rejected.toString()]: (state) => {state.isError = true},

    [requestLogout.fulfilled.toString()]: (state) => {
      state.user = null;
      state.isAuth = false;
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
    },

    [requestCheckAuth.pending.toString()]: (state) => {
      state.isLoading = true;
    },
    [requestCheckAuth.fulfilled.toString()]: (state, action:PayloadAction<ICheckUser>) => {
      state.user = action.payload.user;
      state.isAuth = true;
      state.isLoading = false;
    },
    [requestCheckAuth.rejected.toString()]: (state) => {
      state.isError = true;
      state.isLoading = false;
    },

    [requestUpdateUser.fulfilled.toString()]: (state, action:PayloadAction<IUpdateUser>) => {
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

// export const {} = authSlice.actions;
export default authSlice.reducer;
