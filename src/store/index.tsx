import { configureStore } from '@reduxjs/toolkit';
import ingredientReducer from './ingredientsSlice'
import constructorReducer from './constructorSlice';
import thunk from 'redux-thunk';


export default configureStore({
  reducer: {
    ingredients: ingredientReducer,
    constructor: constructorReducer,
  },
  middleware: [thunk]
})
