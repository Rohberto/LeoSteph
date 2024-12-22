import { API_BASE_URL } from "../config";
import { apiGet, apiPost } from "./_http";

const apiEndpoint = API_BASE_URL + "products";

export const getAllProducts = async (options = {}) => {
  return await apiGet(apiEndpoint, { ...options });
};

export const createProduct = async (options = {}) => {
  return await apiPost(apiEndpoint, { ...options });
};

export const searchProducts = async (query) => {
  const searchEndpoint = `${apiEndpoint}/search`;
  const params = new URLSearchParams({
    query: query,
  }).toString();

  return await apiGet(`${searchEndpoint}?${params}`);
};
