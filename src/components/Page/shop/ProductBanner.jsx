/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BsGridFill } from "react-icons/bs";
import { ImList } from "react-icons/im";
import { GoTriangleDown } from "react-icons/go";

const ProductBanner = ({
  itemsPerPageFromBanner,
  onSortChange,
  currentSort,
}) => {
  const [gridViewActive, setGridViewActive] = useState(true);
  const [listViewActive, setListViewActive] = useState(false);

  useEffect(() => {
    const gridView = document.querySelector(".gridView");
    const listView = document.querySelector(".listView");

    gridView.addEventListener("click", () => {
      setListViewActive(false);
      setGridViewActive(true);
    });
    listView.addEventListener("click", () => {
      setGridViewActive(false);
      setListViewActive(true);
    });
  }, [gridViewActive, listViewActive]);

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between">
      {/* Left Part - View Toggle */}
      <div className="flex items-center gap-4">
        <span
          className={`${
            gridViewActive
              ? "bg-primeColor text-white"
              : "border-[1px] border-gray-300 text-[#737373]"
          } w-8 h-8 text-lg flex items-center justify-center cursor-pointer gridView`}
        >
          <BsGridFill />
        </span>
        <span
          className={`${
            listViewActive
              ? "bg-primeColor text-white"
              : "border-[1px] border-gray-300 text-[#737373]"
          } w-8 h-8 text-base flex items-center justify-center cursor-pointer listView`}
        >
          <ImList />
        </span>
      </div>

      {/* Right Part - Sorting and Items Per Page */}
      <div className="flex items-center gap-2 md:gap-6 mt-4 md:mt-0">
        <div className="flex items-center gap-2 text-base text-[#767676] relative">
          <label className="block">Sort by:</label>
          <select
            value={currentSort}
            onChange={handleSortChange}
            className="w-32 md:w-52 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
          >
            <option value="featured">Featured</option>
            <option value="popular">Popular Items</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <span className="absolute text-sm right-2 md:right-4 top-2.5">
            <GoTriangleDown />
          </span>
        </div>

        <div className="flex items-center gap-2 text-[#767676] relative">
          <label className="block">Show:</label>
          <select
            onChange={(e) => itemsPerPageFromBanner(+e.target.value)}
            className="w-16 md:w-20 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
          >
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="36">36</option>
            <option value="48">48</option>
          </select>
          <span className="absolute text-sm right-3 top-2.5">
            <GoTriangleDown />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
