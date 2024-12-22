/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react/dist/iconify.js";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import del from "../../../../services/Admin/del";
import catchErrors from "../../../../utils/catchErrors";
import notify from "../../../../utils/notify";

const Row = ({ product, idx, refetch }) => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);

  const toggleShow = () => {
    setIsShow(!isShow);
  };

  const closeAction = () => {
    setIsShow(false);
  };

  const actions = (
    <div className="absolute z-10 right-0 sm:right-12 top-full sm:-top-6">
      <div className="flex flex-col bg-white w-24 sm:w-[4rem] p-1 rounded-md items-start shadow-lg">
        <div
          onClick={() => gotoEdit()}
          className="active:bg-gray-500 active:text-white w-full rounded-md p-1 cursor-pointer hover:bg-gray-100"
        >
          Edit
        </div>
        <div
          onClick={() => deleteProduct()}
          className="active:bg-gray-500 active:text-white w-full rounded-md p-1 cursor-pointer hover:bg-gray-100"
        >
          Delete
        </div>
      </div>
    </div>
  );

  const convertDate = (date) => {
    return `${new Date(date).toLocaleDateString()} ${new Date(
      date
    ).toLocaleTimeString()}`;
  };

  const viewProduct = () => {
    navigate(`/admin?action=view-product&id=${product.id}`);
  };

  const gotoEdit = () => {
    closeAction();
    navigate(`/admin?action=edit-product&id=${product.id}`);
  };

  const deleteProduct = async () => {
    closeAction();
    try {
      await del.deleteProduct(product.id);
      notify.success("Product deleted successfully");
      refetch();
    } catch (error) {
      const msg = catchErrors(error);
      notify.error(msg);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-6 md:grid-cols-12 gap-2 items-center bg-gray-100 p-2 text-sm sm:text-base">
      {/* Index */}
      <div className="font-semibold text-left sm:text-center sm:col-span-1">
        <span className="sm:hidden">No: </span>
        {idx}
      </div>

      {/* Image */}
      <div className="font-semibold text-right sm:text-center sm:col-span-1 flex justify-end sm:justify-center">
        <img src={product.images[0]} alt="product" className="h-8" />
      </div>

      {/* Product Name - Full width on mobile */}
      <div
        onClick={viewProduct}
        className="font-semibold col-span-2 sm:col-span-3 cursor-pointer text-left sm:text-center truncate"
      >
        <span className="sm:hidden">Name: </span>
        {product.name}
      </div>

      {/* Price */}
      <div className="font-semibold text-left sm:text-center sm:col-span-2">
        <span className="sm:hidden">Price: </span>
        {product.price}
      </div>

      {/* Popular */}
      <div className="font-semibold text-left sm:text-center sm:col-span-1">
        <span className="sm:hidden">Popular: </span>
        {product.isPopular ? "Yes" : "No"}
      </div>

      {/* Date */}
      <div className="font-semibold text-left sm:text-center col-span-2 sm:col-span-3">
        <span className="sm:hidden">Created: </span>
        {convertDate(product.createdAt)}
      </div>

      {/* Actions */}
      <div className="font-semibold relative sm:col-span-1 flex justify-end sm:justify-center">
        <div className="cursor-pointer">
          <Icon onClick={toggleShow} icon="pepicons-pencil:dots-y" width={24} />
        </div>
        {isShow && actions}
      </div>
    </div>
  );
};

Row.propTypes = {
  product: PropTypes.object,
  idx: PropTypes.number,
  refetch: PropTypes.func,
};

export default Row;
