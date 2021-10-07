import { Location } from 'history';

import { IOrderCard } from './order';
import { TOrdersState } from '../store/wsOrdersSlice';
import { TIngredient } from './ingredient';
import { TAuthState } from '../store/authSlice';
import { TConstructorState } from '../store/constructorSlice';

export type TAllState = TOrdersState
  | TIngredient
  | TAuthState
  | TConstructorState;

export type TLocationHook = { pathname?: string } & Location;