import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from '../utils/constants';

export const sendOrder = createAsyncThunk(
  'ingredients/sendOrder',
  async function (idIngredients :any,{ rejectWithValue }) { 
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ingredients: idIngredients})
      });
      if (!response.ok) {
       throw new Error('Ошибка сети ...');
     }
      const successResponse = await response.json();
      return successResponse;
    }catch (error) {
      return rejectWithValue(false);
    }
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
    isModalOrderDetails: false,
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
    openModalOrderDetails: (state) => {state.isModalOrderDetails = true},
    closeModalOrderDetails: (state) => {state.isModalOrderDetails = false},
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
  openModalOrderDetails,
  closeModalOrderDetails
} = constructorSlice.actions;
export default constructorSlice.reducer;
