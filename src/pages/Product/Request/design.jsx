import { useEffect, useState, useContext } from "react";
import DesignOptions from "../../../components/Order/Design";
import Breadcrumbs from "../../../shared/breadCrumbs";
import { useLocation, useNavigate } from "react-router-dom";
import { addToCart, addToCartUnAuth } from "../../../services/cart";
import { AuthService } from "../../../services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { DataContext } from "../../../context/DataContext";

const DesignPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [productDesign, setProductDesign] = useState(null);
  const cartId = localStorage.getItem("cartId");
  const cartApi = AuthService.isLoggedIn() ? addToCart : addToCartUnAuth;
  const location = useLocation();
  const { data, product, orderSummary } = location.state;
console.log(data);
  const { mutate: addItemToCart } = useMutation({
    mutationFn: ({ id, data, cartId }) => {
      console.log(data);
      return cartApi(id, { action: "add", data, cartId });
    },
    onSuccess: (data) => {
      console.log(data);
      data?.cart && localStorage.setItem("cartId", data.cart);
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      toast.success("Item added succesfully");
    },
    onError: () => {
      toast.error("SOmething went wrong");
    },
  });

  useEffect(() => {
    if (productDesign) {
      data.design = productDesign[0];
      addItemToCart({ id: product?.id, data, cartId });
    }
    
  }, [productDesign]);
  const {user} = useContext(DataContext);

//rrrediect if user is not signed in
useEffect(() => {
  if (!user) {
    navigate('/sign-in', { replace: true });
  }
}, [user, navigate]);

  return (
    <div className="max-container bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <Breadcrumbs customPath={["cart", "design options"]} />

      <div className="mt-3 p-4 rounded-lg">
        <DesignOptions setProductDesign={setProductDesign} product={product} data={data} orderSummary={orderSummary}/>
      </div>
    </div>
  );
};

export default DesignPage;