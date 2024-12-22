import axios from "axios";
import { apiUrl } from "../../const";
import { AuthService } from "../auth";

const getMe = async () => {
  const token = AuthService.getToken();
  const response = await axios.get(`${apiUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const getAllCategories = async () => {
  const response = await axios.get(`${apiUrl}/categories`);

  return response.data;
};

const getAllProducts = async () => {
  const response = await axios.get(`${apiUrl}/products`);

  return response.data;
};

const getAProductById = async (id) => {
  const response = await axios.get(`${apiUrl}/products/${id}`);

  return response.data;
};

export default { getMe, getAllCategories, getAllProducts, getAProductById };
