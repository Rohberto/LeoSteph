import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import DropDown from "./DropDown";
import { useNavigate } from "react-router-dom";

const Extras = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <div className="flex gap-4 items-center flex-wrap">
      {/* Add Product Button */}
      <div
        onClick={() => navigate(`/admin?view=products&tab=add`)}
        className="flex items-center gap-2 px-2 mds:px-4 py-2 border border-transdashboard cursor-pointer text-gray-900 hover:text-white hover:bg-gray-900 transition-colors duration-300 rounded-full"
      >
        <span className="text-xs mds:text-lg font-semibold">+</span>
        <button className="text-xs sm:text-sm font-medium">Add Product</button>
      </div>

      {/* Dropdown Icon and Menu */}
      <div className="relative text-gray-500">
        <Icon
          onClick={handleClick}
          icon={
            isClicked ? "ant-design:up-outlined" : "ant-design:down-outlined"
          }
          width={20}
          className="cursor-pointer hover:text-gray-900 transition-colors duration-300"
        />

        {isClicked && (
          <div className="absolute -right-2 top-10 w-40 bg-white shadow-md rounded-md border border-gray-200 z-10">
            <DropDown />
          </div>
        )}
      </div>
    </div>
  );
};

export default Extras;
