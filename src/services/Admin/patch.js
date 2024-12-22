import axios from "axios";
import { AuthService } from "../auth";
import { apiUrl } from "../../const";

const updateCategory = async (id, data) => {
  const token = AuthService.getToken();
  const res = await axios.patch(`${apiUrl}/categories/${id}`, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return res.data;
};

const updateProduct = async (id, data) => {
  const token = AuthService.getToken();
  const res = await axios.patch(`${apiUrl}/products/${id}`, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return res.data;
};

export default {
  updateCategory,
  updateProduct,
};
