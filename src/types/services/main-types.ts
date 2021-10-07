import { TIngredient } from '../ingredient';
import { IOrderCard } from '../order';

interface IOrderOwner {
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
}
interface IOrderDetails {
  createdAt: string;
  ingredients: TIngredient[];
  name: string;
  number: number | null;
  owner: IOrderOwner;
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export interface IOrderSend {
  name: string;
  order: IOrderDetails;
  success: boolean;
}

export interface IGetIngredients {
  data: TIngredient[];
  success: boolean;
}

export interface IGetOrders {
  orders: IOrderCard[];
  success: boolean;
  total: number;
  totalToday: number;
}
