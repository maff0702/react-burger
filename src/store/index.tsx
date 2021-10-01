import { configureStore } from '@reduxjs/toolkit';
import ingredientReducer from './ingredientsSlice'
import constructorReducer from './constructorSlice';
import authReducer from './authSlice';
import wsOrdersReducer from './wsOrdersSlice';
import { socketMiddleware } from './middleware/wsOrdersMiddleware';

export default configureStore({
  reducer : {
    ingredients: ingredientReducer,
    constructors: constructorReducer,
    auth: authReducer,
    wsOrders: wsOrdersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware()),
})
