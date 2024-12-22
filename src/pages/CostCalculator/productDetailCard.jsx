import PropTypes from "prop-types";

const ProductDetailCard = ({
  selectedProduct,
  quantity,
  addOnsTotal,
  totalPrice,
}) => {
  if (!selectedProduct) {
    return null;
  }

  return (
    <div className="w-full lg:w-1/2 bg-white m-2 p-6 border border-gray-300 flex flex-col gap-6">
      <div className="flex justify-center items-center mb-4 p-4">
        <img
          src={selectedProduct?.images[0]}
          alt={selectedProduct?.name}
          className="h-44 object-cover border"
        />
      </div>
      <hr className="border-gray-300 mb-4" />
      <h2 className="text-lg font-semibold mb-4 text-center">
        {selectedProduct?.name}
      </h2>
      <div className="text-gray-700 flex flex-col items-center">
        <div className="mb-6 flex justify-between w-full">
          <strong>{quantity} units</strong>
          <span>₦{totalPrice.toFixed(2)}</span>
        </div>
        <div className="mb-6 flex justify-between w-full">
          <strong>Add-Ons</strong>
          <span>₦{addOnsTotal?.toFixed(2)}</span>
        </div>
        <div className="flex justify-end items-center w-full mb-6">
          <div className="flex flex-col items-end w-full">
            <hr className="border-gray-300 w-full mb-2" />
            <span className="text-lg font-semibold">
              ₦{totalPrice?.toFixed(2)}
            </span>
            <hr className="border-gray-300 w-full mt-2" />
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-[#4F772D] text-white shadow hover:bg-[#31572C] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCard;

ProductDetailCard.propTypes = {
  selectedProduct: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string.isRequired),
    price: PropTypes.number,
  }),
  quantity: PropTypes.string,
  addOnsTotal: PropTypes.number,
  totalPrice: PropTypes.number,
};
