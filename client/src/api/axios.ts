import axios, { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse, 
  AxiosError,
  InternalAxiosRequestConfig
} from 'axios';

import { SERVER_BASE_URL } from '@/config';


export interface ApiResponse {
  message: string
}

export interface ErrorResponse {
  message: string;
  originalError: Error | AxiosError;
  statusCode: number | null;
  data: any;
}

const BASE_URL: string = SERVER_BASE_URL;
const TIMEOUT: number = 30000; 

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error('Request error:', error);

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>): any => {
    return response.data;
  },
  async (error: AxiosError): Promise<ErrorResponse> => {
    let errorMessage = 'An unexpected error occurred';
    
    if (error.response) {
      const { status, data, statusText } = error.response as AxiosResponse<ApiResponse>;

      if (data.message) {
        errorMessage = data.message
      } else {
        switch (status) {
          case 400:
            errorMessage = error.message || 'Bad request';
            break;
          case 403:
            errorMessage = 'You do not have permission to access this resource';
            break;
          case 404:
            errorMessage = 'Resource not found';
            break;
          case 500:
            errorMessage = 'Internal server error';
            break;
          default:
            errorMessage = error.message || statusText || 'An unexpected error occurred';
        }
      }
    } else if (error.request) {
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please try again.';
      } else {
        errorMessage = 'Network error. Please check your connection.';
      }
    }
    
    const enhancedError: ErrorResponse = {
      message: errorMessage,
      originalError: error,
      statusCode: error.response?.status || null,
      data: error.response?.data || null,
    };
    
    console.error('API Error:', enhancedError);
    
    return Promise.reject(enhancedError);
  }
);

export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => 
    axiosInstance.get<T, T>(url, config),
  
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => 
    axiosInstance.post<T, T>(url, data, config),
  
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => 
    axiosInstance.put<T, T>(url, data, config),
  
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => 
    axiosInstance.patch<T, T>(url, data, config),
  
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => 
    axiosInstance.delete<T, T>(url, config),
};

export default axiosInstance;