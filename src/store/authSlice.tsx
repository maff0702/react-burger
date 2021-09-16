import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from '../utils/constants';

export const requestRegister = createAsyncThunk(
  'auth/register',
  async function (formData :any, { rejectWithValue }) {    
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData.state)
      });
      if (!response.ok) {
        throw new Error('Ошибка сети ...');
      }
      const successResponse = await response.json();
      console.log(successResponse);
      
      return successResponse;
    }catch (error) {
      return rejectWithValue(false);
    }
  }
)
export const requestLogin = createAsyncThunk(
  'auth/login',
  async function (formData :any, { rejectWithValue }) {    
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData.state)
      });
      if (!response.ok) {
        throw new Error('Ошибка сети ...');
      }
      const successResponse = await response.json();
      console.log(successResponse);
      
      return successResponse;
    }catch (error) {
      return rejectWithValue(false);
    }
  }
)
export const requestRefreshToken = createAsyncThunk(
  'auth/refreshToken',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(`${API_URL}/auth/token `, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token: localStorage.getItem('refreshToken')})
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Ошибка сети ...');
      }
      const successResponse = await response.json();
      
      localStorage.setItem('refreshToken', successResponse.refreshToken);
      
      return successResponse;
    }catch (error) {
      return rejectWithValue(false);
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {} as any,
    isError: false,
    isLoading: false,
    accessToken: '',
    refreshToken: '',
  },
  reducers: {
    ingredientCurrentIncrement: (state, action) => {

    },
  },
  extraReducers: {
    [requestRegister.pending.toString()]: (state) => { console.log(state);
     },
    [requestRegister.fulfilled.toString()]: (state, action) => {
      console.log(state);
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    [requestRegister.rejected.toString()]: (state) => {},
    [requestLogin.pending.toString()]: (state) => { console.log(state);
    },
    [requestLogin.fulfilled.toString()]: (state, action) => {
      console.log(state);
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    [requestLogin.rejected.toString()]: (state) => {},
    },
})

export const {
  
} = authSlice.actions;
export default authSlice.reducer;

