// useCart.js
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchCart, addToCart } from "../services/cart";

export const useCart = () => {
  return useQuery("cart", fetchCart);
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, action }) => addToCart(productId, { action }),
    onSuccess: () => {
      queryClient.invalidateQueries("cart"); // Refresh cart data
    },
  });
};
