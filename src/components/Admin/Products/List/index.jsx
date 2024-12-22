import { useQuery } from "@tanstack/react-query";
import Row from "./Row";
import notify from "../../../../utils/notify";
import Loading from "../../Misc/Loading";
import get from "../../../../services/Admin/get";

const List = () => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryFn: get.getAllProducts,
    queryKey: ["products"],
  });

  if (isError) {
    notify.error("Error, something happened...");
    return null;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.products || data?.products.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p>No products available.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen overflow-y-auto">
      <div className="min-w-[768px]">
        {" "}
        {/* Minimum width to prevent squishing */}
        <div className="grid grid-cols-12 gap-2 items-center bg-gray-200 p-2 text-sm sm:text-base">
          <div className="font-semibold text-center col-span-1">ID</div>
          <div className="font-semibold text-center col-span-1">Image</div>
          <div className="font-semibold text-center col-span-3">Name</div>
          <div className="font-semibold text-center col-span-2">Price</div>
          <div className="font-semibold text-center col-span-1 hidden sm:block">
            Popular
          </div>
          <div className="font-semibold text-center col-span-3 hidden md:block">
            Date Created
          </div>
          <div className="font-semibold text-center col-span-1">Actions</div>
        </div>
        <div className="mt-1 flex flex-col gap-1 bg-gray-200">
          {data?.products?.map((product, idx) => (
            <Row
              key={product.id}
              refetch={refetch}
              idx={idx + 1}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
