import { API_BASE_URL } from "../config";
import { apiDelete, apiGet, apiPatch, apiPost } from "./_http";

const apiEndpoint = API_BASE_URL + "quotes";

export const createNewQuote = async (options = {}) => {
  return await apiPost(`${apiEndpoint}`, { ...options });
};

export const getQuoteById = async (id, options = {}) => {
  return await apiGet(`${apiEndpoint}/${id}`, { ...options });
};

export const updateQuoteById = async (id, options = {}) => {
  return await apiPatch(`${apiEndpoint}/${id}`, { ...options });
};

export const deleteQuoteById = async (id, options = {}) => {
  return await apiDelete(`${apiEndpoint}/${id}`, { ...options });
};

export const getMyQuotes = async (options = {}) => {
  return await apiGet(`${apiEndpoint}/me`, { ...options });
};
export const getMyQuotesById = async (id, options = {}) => {
  return await apiGet(`${apiEndpoint}/me/${id}`, { ...options });
};
