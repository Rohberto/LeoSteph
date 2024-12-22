import { API_BASE_URL } from "../config";
import { apiGet, apiPatch } from "./_http";

const apiEndpoint = API_BASE_URL + "carts";

export const addToCart = async (productId, options = {}) => {
  const { action } = options;
  return await apiPatch(`${apiEndpoint}/me/${productId}?action=${action}`, {
    ...options,
  });
};

export const fetchCart = async (options = {}) => {
  return await apiGet(`${apiEndpoint}/me`, { ...options });
};

export const addToCartUnAuth = async (productId, options = {}) => {
  const { action } = options;
  return await apiPatch(`${apiEndpoint}/me/${productId}?action=${action}`, {
    ...options,
  });
};
