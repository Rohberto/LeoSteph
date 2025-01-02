import AddProduct from "../../../../pages/Product/AddProduct";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import notify from "../../../../utils/notify";
import Loading from "../../Misc/Loading";
import GoBack from "../../Misc/GoBack";
import patch from "../../../../services/Admin/patch";
import catchErrors from "../../../../utils/catchErrors";
import get from "../../../../services/Admin/get";
import { useQuery } from "@tanstack/react-query";

const EditProduct = () => {
  const [params, setParams] = useSearchParams();
  const id = params.get("id");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["product", id],
    queryFn: () => get.getAProductById(id),
  });

  useEffect(() => {
    if (isLoading) return;

    if (error) {
      notify.error("No product found with this id");
      return;
    }
  }, [isLoading, error]);

  if (isLoading) return <Loading />;

  if (!data) {
    setParams({ view: "products" });
  }

  const getEditedData = async (data) => {
    const tags = data?.tags?.split(",");
    data.tags = tags;

    try {
      const res = await patch.updateProduct(id, data);
      notify.success(res.message);
      refetch();

      setTimeout(() => {
        setParams({ view: "products" });
      }, 2000);
    } catch (error) {
      const msg = catchErrors(error);
      notify.error(msg);
    }
  };

  return (
<>
        <div className="font-Roobert changeFontSpacing flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <GoBack
            title="Go Back"
            style="bg-transdashboard active:bg-gray-200 px-4 py-2 rounded-md"
          />
          <div className="text-2xl font-medium text-center md:text-left">
            Edit Product
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <AddProduct data={data?.product} getEditedData={getEditedData} />
        </div>
  </>
  );
};

export default EditProduct;
