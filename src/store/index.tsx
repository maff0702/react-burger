import { configureStore } from '@reduxjs/toolkit';
import ingredientReducer from './ingredientsSlice'
import constructorReducer from './constructorSlice';
import authReducer from './authSlice';

export default configureStore({
  reducer : {
    ingredients: ingredientReducer,
    constructors: constructorReducer,
    auth: authReducer,
  }
})
