import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosAPI from "../services/main-service";
import { TIngredient } from "../types/ingredient";
import { IOrderSend } from "../types/services/main-types";

export const sendOrder = createAsyncThunk(
  'ingredients/sendOrder',
  async (idIngredients: string[]) => { 
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
type TIngredientsNew = {
  newId: number;
} & TIngredient;
export type TConstructorState = {
  ingredients: TIngredientsNew[];
  bun: TIngredient | null;
  order: TOrder;
  isModalOrderDetails: boolean;
};
const initialState: TConstructorState = {
  ingredients: [],
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
    addElementConstructor: (state, action: PayloadAction<{item:TIngredient}>) => {
      const item = action.payload.item;
      const newId =  state.ingredients.length;
      state.ingredients.push({...item, newId:newId});
    },
    addBunConstructor: (state, action: PayloadAction<{item:TIngredient}>) => {
      state.bun = action.payload.item;
    },
    deleteElementConstructor: (state, action: PayloadAction<{index:number;id:string}>) => {
      state.ingredients = state.ingredients.filter((_, index: number) => index !== action.payload.index);
    },
    moveIngredientConstructor: (state, action: PayloadAction<{dragIndex:number;hoverIndex:number}>) => {
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
    [sendOrder.pending.toString()]: (state) => {state.order.isLoading = true},
    [sendOrder.fulfilled.toString()]: (state, action: PayloadAction<IOrderSend>) => {
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
