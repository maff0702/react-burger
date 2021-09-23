import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../services/main-service";

export const sendOrder = createAsyncThunk(
  'ingredients/sendOrder',
  async (idIngredients :any) => { 
    //При отправке с заголовком Authorization запрос идет дольше
    const response = await axiosAPI.sendOrder(idIngredients);
    return response.data;
  }
)

const constructorSlice = createSlice({
  name: 'constructor',
  initialState: {
    ingredients: [] as any,
    bun: {} as any,
    order: {
      number: null,
      name: '',
      isError: false,
      isLoading: false,
    },
  },
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
  },
  extraReducers: {
    [sendOrder.pending.toString()]: (state) => { state.order.isLoading = true},
    [sendOrder.fulfilled.toString()]: (state, action) => {
      state.order.number = action.payload.order.number;
      state.ingredients = [];
      state.bun = {};
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
} = constructorSlice.actions;
export default constructorSlice.reducer;
