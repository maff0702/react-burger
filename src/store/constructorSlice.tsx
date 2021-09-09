import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from '../utils/constants';



const constructorSlice = createSlice({
  name: 'constructor',
  initialState: {
    isModal: false,
  },
  reducers: {
  }
})

export const {
  
} = constructorSlice.actions;
export default constructorSlice.reducer;
