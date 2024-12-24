import RequestComponent from "../../../components/Order/Design/Request";
import Breadcrumbs from "../../../shared/breadCrumbs";
import { useLocation } from "react-router-dom";

const DesignRequest = () => {
  const location = useLocation();
  const { product, orderSummary } = location.state;

  return (
    <div className="max-container bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <Breadcrumbs customPath={["cart", "request design"]} />
      <RequestComponent product={product} orderSummary={orderSummary}/>
    </div>
  );
};

export default DesignRequest;
