import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../services/main-service";
import { TIngredient } from "../types/ingredient";

export const sendOrder = createAsyncThunk(
  'ingredients/sendOrder',
  async (idIngredients :any) => { 
    //При отправке с заголовком Authorization запрос идет дольше
    const response = await axiosAPI.sendOrder(idIngredients);
    return response.data;
  }
)

type TOrder = {
  number: number | null;
    name: string;
    isError: boolean;
    isLoading: boolean;
};
export type TConstructorState = {
  ingredients: TIngredient[] | any;
  bun: TIngredient | null;
  order: TOrder;
  isModalOrderDetails: boolean;
};
const initialState = {
  ingredients: [] as any,
  bun: null,
  order: {
    number: null,
    name: '',
    isError: false,
    isLoading: false,
  },
  isModalOrderDetails: false,
}

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addElementConstructor: (state, action) => {
      const item = action.payload.item;
      const newId =  state.ingredients.length;
      state.ingredients.push({...item, newId:newId});
    },
    addBunConstructor: (state, action) => {
      state.bun = action.payload.item;
    },
    deleteElementConstructor: (state, action) => {
      state.ingredients = state.ingredients.filter((_, index)=> index !== action.payload.index)
    },
    moveIngredientConstructor: (state, action) => {
      const newArr = [...state.ingredients]
      const dragIngredient = state.ingredients[action.payload.dragIndex]
      newArr.splice(action.payload.dragIndex, 1);
      newArr.splice(action.payload.hoverIndex, 0, dragIngredient);      
      state.ingredients = [...newArr];
    },
    openModalOrderDetails: (state) => {state.isModalOrderDetails = true},
    closeModalOrderDetails: (state) => {state.isModalOrderDetails = false},
  },
  extraReducers: {
    [sendOrder.pending.toString()]: (state) => { state.order.isLoading = true},
    [sendOrder.fulfilled.toString()]: (state, action) => {
      state.order.number = action.payload.order.number;
      state.ingredients = [];
      state.bun = null;
      state.order.name = action.payload.name;
      state.order.isLoading = false;
    },
    [sendOrder.rejected.toString()]: (state) => {
      state.order.isError = true;
      state.order.isLoading = false;
      state.order.number = null;
      state.order.name = '';
    },
  }
})

export const {
  addElementConstructor,
  addBunConstructor,
  deleteElementConstructor,
  moveIngredientConstructor,
  openModalOrderDetails,
  closeModalOrderDetails,
} = constructorSlice.actions;
export default constructorSlice.reducer;
