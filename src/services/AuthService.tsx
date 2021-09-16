import axiosAPI from "../utils/api";
import {AxiosResponse} from 'axios';

export default class AuthService {
  static async login(email, password): Promise<AxiosResponse<any>>{
    return axiosAPI.post('/login', {email, password})
  }
  static async register(name, email, password): Promise<AxiosResponse<any>>{
    return axiosAPI.post('/register', {name, email, password})
  }
  static async logout(): Promise<AxiosResponse<any>>{
    return axiosAPI.post('/logout')
  }
}
