import { API_BASE_URL } from "../config";
import { apiGet, apiPatch, apiPost } from "./_http";

const apiEndpoint = API_BASE_URL + "orders";

export const createNewOrder = async (options = {}) => {
  return await apiPost(`${apiEndpoint}`, { ...options });
};

export const getMyOrders = async (options = {}) => {
  return await apiGet(`${apiEndpoint}`, { ...options });
};

export const getOrderById = async (orderId, options = {}) => {
  return await apiGet(`${apiEndpoint}/${orderId}`, {
    ...options,
  });
};
