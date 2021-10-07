import axiosAPI from "../utils/api";
import { AxiosResponse } from 'axios';

import {
  IOrderSend,
  IGetIngredients,
  IGetOrders,
} from "../types/services/main-types";

export default class MainService {
  static async sendOrder(idIngredients: string[]): Promise<AxiosResponse<IOrderSend>>{
    return axiosAPI.post<IOrderSend>('/orders', {ingredients: idIngredients})
  }
  static async getIngredients(): Promise<AxiosResponse<IGetIngredients>>{
    return axiosAPI.get<IGetIngredients>('/ingredients')
  }
  static async getOrders(query: string): Promise<AxiosResponse<IGetOrders>>{
    return axiosAPI.get<IGetOrders>(`/orders${query}`)
  }
}
