import { API_URL } from "../utils/constants";
import axios from "axios";
import authAPI from "../utils/api";
import {AxiosResponse} from 'axios';

import {
  IRegisterUser,
  IForgotPassword,
  ILoginUser,
  IRefreshToken,
  IResetPassword,
  ILogoutUser,
  IUpdateUser,
  ICheckUser
} from '../types/services/auth-types';
import { TUserInfo } from "../types/types";

export default class AuthService {
  static async register({name, email, password}:TUserInfo &{password: string}): Promise<AxiosResponse<IRegisterUser>>{
    return authAPI.post<IRegisterUser>('/auth/register', {name, email, password})
  }
  static async login({email, password}:{email: string; password: string}): Promise<AxiosResponse<ILoginUser>>{
    return authAPI.post<ILoginUser>('/auth/login', {email, password})
  }
  static async logout(): Promise<AxiosResponse<ILogoutUser>>{
    return authAPI.post<ILogoutUser>('/auth/logout', {token: localStorage.getItem('refreshToken')})
  }
  static async refreshToken(): Promise<AxiosResponse<IRefreshToken>>{
    return authAPI.post<IRefreshToken>('/auth/token', {token: localStorage.getItem('refreshToken')})
  }
  static async checkUser(): Promise<AxiosResponse<ICheckUser>>{
    return authAPI.get<ICheckUser>('/auth/user')
  }
  static async updateUser({name, email}:TUserInfo): Promise<AxiosResponse<IUpdateUser>>{
    return authAPI.patch<IUpdateUser>('/auth/user', {name, email})
  }
  static async forgotPassword(email: string): Promise<AxiosResponse<IForgotPassword>>{
    return axios.post<IForgotPassword>( API_URL+'/password-reset', {email})
  }
  static async resetPassword({password,token}:{token: string; password: string}): Promise<AxiosResponse<IResetPassword>>{
    return axios.post<IResetPassword>( API_URL+'/password-reset/reset', {password,token})
  }
}
