import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:3000/api',
      timeout: 10000,
    });

    // Interceptor para adicionar o token ao header
    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem('token'); // ou outro mecanismo de storage

      if (token) {
        config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      }
      return config;
    });
  }

  get<T = any>(url: string, config = {}) {
    return this.axiosInstance.get<T>(url, config);
  }

  post<T = any>(url: string, data: any, config = {}) {
    return this.axiosInstance.post<T>(url, data, config);
  }

  put<T = any>(url: string, data: any, config = {}) {
    return this.axiosInstance.put<T>(url, data, config);
  }

  delete<T = any>(url: string, config = {}) {
    return this.axiosInstance.delete<T>(url, config);
  }
}
