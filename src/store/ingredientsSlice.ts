import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosAPI from "../services/main-service";
import { TIngredient } from "../types/ingredient";

export const requestIngredients = createAsyncThunk(
  'ingredients/requestIngredients',
  async () => {
    const response = await axiosAPI.getIngredients();
    return response.data;
  }
)
export type TIngredientsState = {
  dataIngredients: TIngredient[];
  isError: boolean;
  isLoading: boolean;
  currentIngredient: TIngredient | null;
  isModalIngredientDetails: boolean;
};
const initialState:TIngredientsState = {
  dataIngredients: [],
  isError: false,
  isLoading: false,
  currentIngredient: null,
  isModalIngredientDetails: false,
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    ingredientCurrentIncrement: (state, action: PayloadAction<{item: TIngredient}>) => {
      if(action.payload.item.type === 'bun') state.dataIngredients = state.dataIngredients.map((obj) => obj.type === 'bun' ? {...obj, __v: 0} : obj );
      state.dataIngredients = state.dataIngredients.map((obj) => obj._id === action.payload.item._id ? {...obj, __v: obj.__v + 1} : obj );
      state.dataIngredients = state.dataIngredients.map((obj) => (obj.type === 'bun' && obj._id === action.payload.item._id) ? {...obj, __v: 2} : obj);
    },
    ingredientCurrentDecrement: (state, action: PayloadAction<{id: string}>) => {
      state.dataIngredients = state.dataIngredients.map((obj)=> obj._id === action.payload.id ? {...obj, __v: obj.__v - 1} : obj );
    },
    deletedAllCurrentIngredient: (state) => {
      state.dataIngredients = state.dataIngredients.map((obj)=> ({...obj, __v: 0}) );
    },
    openModalIngredientDetails: (state, action: PayloadAction<{ingredient: TIngredient}>) => {
      state.currentIngredient = action.payload.ingredient;
      state.isModalIngredientDetails = true;
    },
    closeModalIngredientDetails: (state) => {
      state.currentIngredient = null;
      state.isModalIngredientDetails = false;
    },
  },
  extraReducers: {
    [requestIngredients.pending.toString()]: (state) => { state.isLoading = true},
    [requestIngredients.fulfilled.toString()]: (state, action:PayloadAction<{data:TIngredient[]}>) => {
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
  openModalIngredientDetails,
  closeModalIngredientDetails,
  deletedAllCurrentIngredient
} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
