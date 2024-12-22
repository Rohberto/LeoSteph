import axios from "axios";
import { API_BASE_URL } from "../config";
import { AuthService } from "./auth";

const { getToken, doLogout } = AuthService;
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const apiRequest = async (method, url, options = {}) => {
  try {
    const { data, query } = options;
    const requestUrl = query ? `${url}?${new URLSearchParams(query)}` : url;
    const response = await api[method](requestUrl, data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      doLogout();
      throw new Error("Unauthorized. Please log in again.");
    }
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    throw new Error(errorMessage);
  }
};

export const apiDelete = (url, options) => apiRequest("delete", url, options);
export const apiGet = (url, options) => apiRequest("get", url, options);
export const apiPatch = (url, options) => apiRequest("patch", url, options);
export const apiPost = (url, options) => apiRequest("post", url, options);
export const apiPut = (url, options) => apiRequest("put", url, options);
