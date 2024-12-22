import axios from "axios";
import { apiUrl } from "../../const";
import { AuthService } from "../auth";

const deleteProduct = async (id) => {
  const token = AuthService.getToken();
  const res = await axios.delete(`${apiUrl}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
const deleteCategory = async (id) => {
  const token = AuthService.getToken();
  const res = await axios.delete(`${apiUrl}/categories/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return res.data;
};
export default { deleteProduct, deleteCategory };
