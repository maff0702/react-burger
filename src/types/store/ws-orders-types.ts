import { IOrderCard } from "../order";

export interface IGetMessage {
  orders: IOrderCard[];
  success: boolean;
  total: number;
  totalToday: number;
  message: string;
}
