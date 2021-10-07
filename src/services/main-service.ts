import axiosAPI from "../utils/api";
import {AxiosResponse} from 'axios';

export default class MainService {
  static async sendOrder(idIngredients): Promise<AxiosResponse<any>>{
    return axiosAPI.post('/orders', {ingredients: idIngredients})
  }
  static async getIngredients(): Promise<AxiosResponse<any>>{
    return axiosAPI.get('/ingredients')
  }
  static async getOrders(query): Promise<AxiosResponse<any>>{
    return axiosAPI.get(`/orders${query}`)
  }
}
