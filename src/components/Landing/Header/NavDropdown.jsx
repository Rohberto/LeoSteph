/* eslint-disable react/prop-types */
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const DropdownMenu = ({ items, title, isMobile = false }) => {
  // Set default for isMobile
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Add event listener when component mounts
    if (!isMobile) {
      //Only for desktop
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);

      //Cleanup function to remove listener on unmount or when isMobile changes
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isMobile]);

  const handleMouseEnter = () => {
      setIsOpen(true);
  };

  const handleMouseLeave = (e) => {
    if (dropdownRef.current) {
      if (!dropdownRef.current.contains(e.relatedTarget)) {
        setIsOpen(false);
      }
    }
  };

  const handleClick = () => {

      setIsOpen(!isOpen);

  };

  return (
    <div
      className={`relative ${isMobile ? "w-full border-t border-b" : ""}`}
      ref={dropdownRef}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className={`flex items-center justify-between w-full ${
          isMobile ? "py-2 px-4" : "py-1 px-2"
        }`}
      >
        <span className="text-gray-700 mx-2">{title}</span>
        <ChevronDown
          className={`transition-transform transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onMouseLeave={handleMouseLeave}
            className={`absolute ${isMobile ? "mt-2" : "mt-1"} ${
              isMobile ? "w-full" : "min-w-max"
            } left-0 bg-white shadow-md rounded-md overflow-hidden z-10 ${
              isMobile ? "border" : ""
            }`}
          >
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                      isMobile ? "border-b" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMenu;
