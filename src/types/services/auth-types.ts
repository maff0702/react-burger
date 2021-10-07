import { TUserInfo } from "../types";

export interface ICheckUser {
  success: boolean;
  user: TUserInfo;
}

export interface IUpdateUser extends ICheckUser {}

export interface ILogoutUser {
  success: boolean;
  message: string;
}

export interface IRefreshToken {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface ILoginUser {
  success: boolean;
  user: TUserInfo;
  accessToken: string;
  refreshToken: string;
}

export interface IRegisterUser extends ILoginUser {}

export interface IResetPassword {
  success: boolean;
  message: string;
}

export interface IForgotPassword {
  success: boolean;
  message: string;
}
