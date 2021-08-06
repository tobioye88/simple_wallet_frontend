import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export default class HttpClient {
  static axios(): AxiosInstance {
    const config = {
      baseURL: process.env.REACT_APP_URL,
    } as AxiosRequestConfig;
    if (HttpClient.hasToken()) {
      config.headers = { Authorization: `Bearer ` + HttpClient.getToken() };
    }
    return axios.create(config);
  }

  static hasToken(): boolean {
    return !!localStorage.getItem("token");
  }

  static getToken(): string | null {
    return localStorage.getItem("token");
  }

  static async get<T>(url: string): Promise<T> {
    return await HttpClient.axios().get(url);
  }

  static async post<T>(url: string, data: any): Promise<T> {
    return await HttpClient.axios().post(url, data);
  }

  static async put<T>(url: string, data: any): Promise<T> {
    return await HttpClient.axios().put(url, data);
  }

  static async patch<T>(url: string, data: any): Promise<T> {
    return await HttpClient.axios().patch(url, data);
  }

  static async delete<T>(url: string, data: any): Promise<T> {
    return await HttpClient.axios().delete(url, data);
  }
}
