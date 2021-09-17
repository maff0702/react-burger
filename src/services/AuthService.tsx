import authAPI from "../utils/api";
import {AxiosResponse} from 'axios';

export default class AuthService {
  static async register({name, email, password}): Promise<AxiosResponse<any>>{
    return authAPI.post('/register', {name, email, password})
  }
  static async login({email, password}): Promise<AxiosResponse<any>>{
    return authAPI.post('/login', {email, password})
  }
  static async logout(): Promise<AxiosResponse<any>>{
    return authAPI.post('/logout', {token: localStorage.getItem('refreshToken')})
  }
  static async refreshToken(): Promise<AxiosResponse<any>>{
    return authAPI.post('/token', {token: localStorage.getItem('refreshToken')})
  }
  static async checkUser(): Promise<AxiosResponse<any>>{  
    return authAPI.get('/user')
  }
}
