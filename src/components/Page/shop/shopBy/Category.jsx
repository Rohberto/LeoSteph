/* eslint-disable react/prop-types */
import { useState } from "react";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";
import { useQuery } from "@tanstack/react-query";
import get from "../../../../services/Admin/get";
import capitalizeFirstLetter from "../../../../utils/capital";

const Category = ({ onCategorySelect, selectedCategory }) => {
  const { data = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => get.getAllCategories(),
    select: (data) => data?.data || [],
  });

  const [showSubCatOne, setShowSubCatOne] = useState(false);

  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          <li
            onClick={() => onCategorySelect("All")}
            className={`border-b-[1px] border-b-[#F0F0F0] pb-2 cursor-pointer hover:text-primeColor duration-300 ${
              selectedCategory === "All" ? "text-primeColor font-semibold" : ""
            }`}
          >
            All Categories
          </li>
          {data.map(({ id, name }) => (
            <li
              key={id}
              className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between cursor-pointer hover:text-primeColor duration-300 ${
                selectedCategory === name
                  ? "text-primeColor font-semibold capitalize"
                  : ""
              }`}
            >
              <span onClick={() => onCategorySelect(name)}>
                {capitalizeFirstLetter(name)}
              </span>
              {
                <span
                  onClick={() => setShowSubCatOne(!showSubCatOne)}
                  className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                >
                  <ImPlus />
                </span>
              }
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
