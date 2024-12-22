import axios from "axios";
import { API_BASE_URL } from "../config";
// import { apiPost } from "./_http";
import { AuthService } from "./auth";

const apiEndpoint = API_BASE_URL + "payments";

// export const initializePayment = async (options = {}) => {
//   return await apiPost(`${apiEndpoint}/initialize`, { ...options });
// };

export const initializePayment = async (data) => {
  const token = AuthService.getToken();
  const response = await axios.post(`${apiEndpoint}/initialize`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(response);
  return response.data;
};

//rigo-be.onrender.com/api/payments/verify/{reference}

export const verifyPayment = async (data) => {
  const token = AuthService.getToken();
  const { reference } = data;
  const response = await axios.get(`${apiEndpoint}/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
