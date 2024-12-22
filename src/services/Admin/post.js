import axios from "axios";
import { apiUrl } from "../../const";
import { AuthService } from "./../auth";

const loginAdmin = async (data) => {
  const res = await axios.post(`${apiUrl}/admin/auth/login`, data);
  return res.data;
};

const createCategory = async (data) => {
  const token = AuthService.getToken();
  const res = await axios.post(`${apiUrl}/categories`, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return res.data;
};

const createProduct = async (data) => {
  const token = AuthService.getToken();
  const response = await axios.post(`${apiUrl}/products`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default { loginAdmin, createCategory, createProduct };
