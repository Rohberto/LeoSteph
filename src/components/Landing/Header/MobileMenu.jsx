/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import DropdownMenu from "./NavDropdown";

const MobileMenu = ({ isOpen, onClose, navItems, accountItems, helpItems }) => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={{ type: "tween" }}
        className="bg-white w-full max-w-xs md:max-w-sm p-4"
      >
        <button
          onClick={onClose}
          className="p-2 absolute top-4 right-4"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="divide-y">
          <nav className="py-2 mds:py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `block px-4 py-2.5 mds:py-3 text-gray-600 hover:text-gray-900 
                    hover:bg-gray-50 transition-colors text-sm mds:text-base ${
                      isActive ? "text-gray-900 font-medium bg-gray-50" : ""
                    }`
                }
              >
                {item.title}
              </NavLink>
            ))}
          </nav>
          <div className="py-2 mds:py-4">
            <DropdownMenu
              items={helpItems}
              isOpen={isHelpOpen}
              onClick={() => setIsHelpOpen(!isHelpOpen)}
              title="Help"
              isMobile
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileMenu;
