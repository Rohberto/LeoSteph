import { API_BASE_URL } from "../config";
import { apiGet } from "./_http";

const apiEndpoint = API_BASE_URL + "categories";

export const getAllCategories = async (options = {}) => {
  return await apiGet(`${apiEndpoint}`, { ...options });
};
export const getProductsByCategories = async (options = {}) => {
  const { category_id } = options;
  return await apiGet(`${apiEndpoint}/${category_id}/products`, { ...options });
};
