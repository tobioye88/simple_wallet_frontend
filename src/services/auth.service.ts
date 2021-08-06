import { UnauthorizedException } from "../exceptions/UnauthorizedException";
import { Registration } from "../interfaces/registration";
import HttpClient from "./http-client";
import { AxiosResponse } from "axios";
import { ResponseWrapper } from "../interfaces/response-wrapper";
import { TokenResponse } from "../interfaces/TokenResponse";
import { User } from '../interfaces/user';
export class AuthService {
  static async login(email: string, password: string) {
    console.log("handle login");
    try {
      const response = await HttpClient.post<AxiosResponse<ResponseWrapper<TokenResponse>>>("/login", { email, password });
      console.log(response);

      localStorage.setItem("token", response.data.data.token);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  static logout(): boolean {
    try {
      localStorage.removeItem("token");
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
    return true;
  }

  static async register(registration: Registration) {
    try {
       await HttpClient.post<AxiosResponse<ResponseWrapper<User>>>(
         "/register",
         registration
       );
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
