import { configureStore } from '@reduxjs/toolkit';
import ingredientReducer from './ingredientsSlice'
import constructorReducer from './constructorSlice';
import authReducer from './authSlice';
import wsOrdersReducer from './wsOrdersSlice';
import { socketMiddleware } from './middleware/wsOrdersMiddleware';

const store = configureStore({
  reducer : {
    ingredients: ingredientReducer,
    constructors: constructorReducer,
    auth: authReducer,
    wsOrders: wsOrdersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware()),
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
