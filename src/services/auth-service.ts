import { API_URL } from "../utils/constants";
import axios from "axios";
import authAPI from "../utils/api";
import {AxiosResponse} from 'axios';

export default class AuthService {
  static async register({name, email, password}): Promise<AxiosResponse<any>>{
    return authAPI.post('/auth/register', {name, email, password})
  }
  static async login({email, password}): Promise<AxiosResponse<any>>{
    return authAPI.post('/auth/login', {email, password})
  }
  static async logout(): Promise<AxiosResponse<any>>{
    return authAPI.post('/auth/logout', {token: localStorage.getItem('refreshToken')})
  }
  static async refreshToken(): Promise<AxiosResponse<any>>{
    return authAPI.post('/auth/token', {token: localStorage.getItem('refreshToken')})
  }
  static async checkUser(): Promise<AxiosResponse<any>>{
    return authAPI.get('/auth/user')
  }
  static async updateUser({name, email}): Promise<AxiosResponse<any>>{
    return authAPI.patch('/auth/user', {name, email})
  }
  static async forgotPassword(email): Promise<AxiosResponse<any>>{
    return axios.post( API_URL+'/password-reset', {email})
  }
  static async resetPassword({password,token}): Promise<AxiosResponse<any>>{
    return axios.post( API_URL+'/password-reset/reset', {password,token})
  }
}
