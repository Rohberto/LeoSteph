import View from "../../Misc/View";
import ViewTab from "../../Misc/ViewTab";
import { useSearchParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Info from "./Info";
import Others from "./Others";
import AdminFooter from "../../Layout/Footer";
import Actions from "./Actions";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Misc/Loading";
import notify from "../../../../utils/notify";
import get from "../../../../services/Admin/get";

const OneProduct = () => {
  const [params, setParams] = useSearchParams();
  const productId = params.get("id");

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => get.getAProductById(productId),
  });

  const product = data?.product;

  const goBack = () => {
    setParams({ view: "products" });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    notify.error("Something occurred...");
    location.href = "/admin?view=products";
    return null;
  }

  return (
    <View>
      <ViewTab styles="mt-1">
        <div
          onClick={goBack}
          className="w-full md:w-44 cursor-pointer flex bg-gray-100 text-black p-2 rounded-md items-center gap-2 hover:bg-gray-200 transition-colors"
        >
          <Icon icon="ion:return-up-back-outline" width={24} />
          <span className="text-sm font-medium">View All Products</span>
        </div>
        <div className="mt-4 space-y-6">
          <div className="flex flex-wrap items-start gap-6">
            <div className="flex-1 min-w-[300px]">
              {product && <Info {...product} />}
            </div>
            <div className="flex-shrink-0">
              <Actions id={productId} />
            </div>
          </div>
          <div className="mt-6">{product && <Others {...product} />}</div>
        </div>
        <AdminFooter className="mt-8" />
      </ViewTab>
    </View>
  );
};

export default OneProduct;
