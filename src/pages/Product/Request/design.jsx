import { useEffect, useState } from "react";
import DesignOptions from "../../../components/Order/Design";
import Breadcrumbs from "../../../shared/breadCrumbs";
import { useLocation } from "react-router-dom";
import { addToCart } from "../../../services/cart";



const DesignPage = () => {
  const [productDesign, setProductDesign] = useState(null);
  const location = useLocation();
  const { data, product, orderSummary } = location.state;

  useEffect(() => {
    if (productDesign) {
      data.design = productDesign[0];

      try {
        console.log(data, "138");
        const AddItemtoCart = async () => {
          const response = await addToCart(product?.id, {
            action: "add",
            data,
          });
          console.log(response);
          //   notify.success(response.message);
        };
        AddItemtoCart();
      } catch (error) {
        console.log(error);
      } finally {
        // setProductDesign(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDesign]);

  return (
    <div className="max-container bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <Breadcrumbs customPath={["cart", "design options"]} />

      <div className="mt-3 p-4 rounded-lg">
        <DesignOptions setProductDesign={setProductDesign} product={product} orderSummary={orderSummary}/>
      </div>
    </div>
  );
};

export default DesignPage;
