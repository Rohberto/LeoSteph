import { API_BASE_URL } from "../config";
import { apiGet, apiPatch } from "./_http";

const apiEndpoint = API_BASE_URL + "users";

export const getUserData = async (options = {}) => {
  return await apiGet(`${apiEndpoint}/me`, { ...options });
};

export const updateUserData = async (options = {}) => {
  return await apiPatch(`${apiEndpoint}/me`, { ...options });
};

export const getFavoritesProducts = async (options = {}) => {
  return await apiGet(`${apiEndpoint}/me/favorites`, { ...options });
};
export const updatePassword = async (options = {}) => {
  return await apiPatch(`${apiEndpoint}/me/update_password`, { ...options });
};
