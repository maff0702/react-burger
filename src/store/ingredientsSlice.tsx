import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../services/main-service";

export const requestIngredients = createAsyncThunk(
  'ingredients/requestIngredients',
  async function (_, { rejectWithValue }) {
    try {
      const response = await axiosAPI.getIngredients();  
      return response.data;
    }catch (error) {
      return rejectWithValue(false);
    }
  }
)

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    dataIngredients: [] as any,
    isError: false,
    isLoading: false,
    currentIngredient: {},
    isModalIngredientDetails: false,
  },
  reducers: {
    ingredientCurrentIncrement: (state, action) => {
      if(action.payload.item.type === 'bun') state.dataIngredients = state.dataIngredients.map((obj) => obj.type === 'bun' ? {...obj, __v: 0} : obj );
      state.dataIngredients = state.dataIngredients.map((obj) => obj._id === action.payload.item._id ? {...obj, __v: obj.__v + 1} : obj );
      state.dataIngredients = state.dataIngredients.map((obj) => (obj.type === 'bun' && obj._id === action.payload.item._id) ? {...obj, __v: 2} : obj);
    },
    ingredientCurrentDecrement: (state, action) => {
      state.dataIngredients = state.dataIngredients.map((obj)=> obj._id === action.payload.id ? {...obj, __v: obj.__v - 1} : obj );
    },
    deletedAllCurrentIngredient: (state) => {
      state.dataIngredients = state.dataIngredients.map((obj)=> ({...obj, __v: 0}) );
    },
    addCurrentIngredient: (state, action) => {state.currentIngredient = action.payload.ingredient},
    deleteCurrentIngredient: (state) => {state.currentIngredient = ''},
    openModalIngredientDetails: (state) => {state.isModalIngredientDetails = true},
    closeModalIngredientDetails: (state) => {state.isModalIngredientDetails = false},
  },
  extraReducers: {
    [requestIngredients.pending.toString()]: (state) => { state.isLoading = true},
    [requestIngredients.fulfilled.toString()]: (state, action) => {
      state.dataIngredients = action.payload.data;
      state.isLoading = false;
    },
    [requestIngredients.rejected.toString()]: (state) => {
      state.isError = true;
      state.isLoading = false
    },
  }
})

export const {
  ingredientCurrentIncrement,
  ingredientCurrentDecrement,
  addCurrentIngredient,
  deleteCurrentIngredient,
  openModalIngredientDetails,
  closeModalIngredientDetails,
  deletedAllCurrentIngredient
} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;

