// /electronic-patient-record-platform/src/lib/api.ts

import axios, { AxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = async <T>(url: string, config?: AxiosRequestConfig) => {
  const response = await api.get<T>(url, config);
  return response.data;
};

export const post = async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
  const response = await api.post<T>(url, data, config);
  return response.data;
};

export const put = async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
  const response = await api.put<T>(url, data, config);
  return response.data;
};

export const del = async <T>(url: string, config?: AxiosRequestConfig) => {
  const response = await api.delete<T>(url, config);
  return response.data;
};
