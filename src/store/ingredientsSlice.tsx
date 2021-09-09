import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from '../utils/constants'

export const requestIngredients = createAsyncThunk(
  'ingredients/requestIngredients',
  async function () {
    try {
      const response = await fetch(`${API_URL}ingredients`);
      if (!response.ok) {
        throw new Error('Ошибка сети ...');
      }
      const successResponse = await response.json();
      return successResponse;
    }catch (error) {
      console.log(error);
    }
  }
)

export const sendOrder = createAsyncThunk(
  'ingredients/sendOrder',
  async function (idIngredients :any) { 
    try {
      const response = await fetch(`${API_URL}orders`, {
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
      console.log(error);
    }
  }
)

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    dataIngredients: [] as any,
    isError: false,
    isLoading: false,
    constructors: {
      ingredients: [] as any,
      bun: {} as any,
    },
    order: {
      number: null,
      name: '',
      isError: false,
      isLoading: false,
    },
    currentIngredient: {},
  },
  reducers: {
    addElementConstructor: (state, action) => {
      const item = action.payload.item;
      const newId =  state.constructors.ingredients.length;
      state.constructors.ingredients.push({...item, newId:newId});
      state.dataIngredients = state.dataIngredients.map((obj)=> obj._id === action.payload.item._id ? {...obj, __v: obj.__v + 1} : obj );
      
    },
    addBunConstructor: (state, action) => {
      state.constructors.bun = action.payload.item;
      state.dataIngredients = state.dataIngredients.map((obj)=> obj.type === 'bun' ? {...obj, __v: 0} : obj )
      state.dataIngredients = state.dataIngredients.map((obj)=> obj._id === action.payload.item._id ? {...obj, __v: obj.__v + 2} : obj )
    },
    deleteElementConstructor: (state, action) => {
      state.constructors.ingredients = state.constructors.ingredients.filter((_, index)=> index !== action.payload.index)
      state.dataIngredients = state.dataIngredients.map((obj)=> obj._id === action.payload.id ? {...obj, __v: obj.__v - 1} : obj );
    },
    addCurrentIngredient: (state, action) => {state.currentIngredient = action.payload.ingredient},
    deleteCurrentIngredient: (state) => {state.currentIngredient = ''},
    moveIngredientConstructor: (state, action) => {
      const newArr = [...state.constructors.ingredients]
      const dragIngredient = state.constructors.ingredients[action.payload.dragIndex]
      newArr.splice(action.payload.dragIndex, 1);
      newArr.splice(action.payload.hoverIndex, 0, dragIngredient);      
      state.constructors.ingredients = [...newArr];
    }
  },
  extraReducers: {
    [requestIngredients.pending.toString()]: (state) => { state.isLoading = true},
    [sendOrder.pending.toString()]: (state) => { state.order.isLoading = true},
    [requestIngredients.fulfilled.toString()]: (state, action) => {
      state.dataIngredients = action.payload.data;
      state.isLoading = false;
    },
    [sendOrder.fulfilled.toString()]: (state, action) => {
      state.order.number = action.payload.order.number;
      state.order.name = action.payload.name;
      state.order.isLoading = false;
    },
    [requestIngredients.rejected.toString()]: (state) => {state.isError = true},
    [sendOrder.rejected.toString()]: (state) => {state.order.isError = true},
  }
})

export const {
  addElementConstructor,
  addBunConstructor,
  deleteElementConstructor,
  addCurrentIngredient,
  deleteCurrentIngredient,
  moveIngredientConstructor
} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
