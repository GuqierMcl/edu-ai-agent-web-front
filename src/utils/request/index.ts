import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { resReject, resResolve, reqReject, reqResolve } from "./interceptors";

type Result<T> = {
  code: number;
  message: string;
  data: T;
};

// 导出Request类，可以用来自定义传递配置来创建实例
export class Request {
  // axios 实例
  instance: AxiosInstance;
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 30000000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例
    this.instance = axios.create(Object.assign(this.baseConfig, config));

    this.instance.interceptors.request.use(reqResolve, reqReject);
    this.instance.interceptors.response.use(resResolve, resReject);
    this.instance.defaults.withCredentials = true;
  }

  // 自定义请求方法
  public async request<T = any>(config: AxiosRequestConfig) {
    const { data } = await this.instance.request<Result<T>>(config);
    return data;
  }

  public get<T = any>(url: string, params?: any) {
    let config: AxiosRequestConfig = {
      url: url,
      method: "get",
      params: params,
    };
    return this.request<T>(config);
  }

  public post<T = any>(url: string, data?: any) {
    let config: AxiosRequestConfig = {
      url: url,
      method: "post",
      data: data,
    };
    return this.request<T>(config);
  }

  public put<T = any>(url: string, data?: any) {
    let config: AxiosRequestConfig = {
      url: url,
      method: "put",
      data: data,
    };
    return this.request<T>(config);
  }

  public delete<T = any>(url: string, params?: any) {
    let config: AxiosRequestConfig = {
      url: url,
      method: "delete",
      params: params,
    };
    return this.request<T>(config);
  }
}

export const request = new Request({});
