import { useState } from "react";
import { FaCalculator, FaShoppingCart, FaUser, FaHome } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState("home");

  const navItems = [
    { id: "home", icon: FaHome, path: "/" },
    { id: "shop", icon: FaShop, path: "/shop" },
    { id: "cost", icon: FaCalculator, path: "/cost-calculator" },
    { id: "cart", icon: FaShoppingCart, path: "/cart" },
    { id: "profile", icon: FaUser, path: "/MyAccount" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map(({ id, icon: Icon, path }) => (
          <NavLink
            key={id}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-16 h-full ${
                isActive ? "text-primeColor" : "text-gray-600"
              }`
            }
            onClick={() => setActiveTab(id)}
          >
            <Icon
              className={`w-6 h-6 ${
                activeTab === id ? "text-forestGreen" : "text-gray-600"
              }`}
            />
            <span className="text-xs mt-1 capitalize">{id}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
