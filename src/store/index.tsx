import { configureStore } from '@reduxjs/toolkit';
import ingredientReducer from './ingredientsSlice'
import constructorReducer from './constructorSlice';

export default configureStore({
  reducer : {
    ingredients: ingredientReducer,
    constructors: constructorReducer,
  }
})
