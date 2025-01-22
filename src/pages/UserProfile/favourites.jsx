import { getFavoritesProducts } from "../../services/user";
import useDataFetching from "../../hooks/useDataFetching";
import { transformApiResponse } from "../../utils/dataSelectors";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loader from "../../shared/loader";

const MySavedDesigns = () => {
  const { data, isLoading } = useDataFetching({
    fn: getFavoritesProducts,
    key: ["favorites"],
    select: transformApiResponse,
  });

  return (
    <div className="w-full p-2 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">My Saved Designs</h1>

      {isLoading ? (
        <Loader />
      ) : data?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((design) => (
            <div
              key={design.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <LazyLoadImage
                src={design.images[0]}
                alt={design.name}
                width="100%"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {design.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-gray-100 w-full h-full min-h-[40vh]">
          <div className="my-3 text-center">
            <div className="mb-2 text-gray-500 mx-3">
              <h3 className="text-xl font-bold">No saved designs found</h3>
              <p className="text-sm">Add Products to your favorites to view.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MySavedDesigns;