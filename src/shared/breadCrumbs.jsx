/* eslint-disable react/prop-types */
import React from "react";
import { FaArrowLeft, FaChevronRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = ({ customPath }) => {
  const location = useLocation();
  const pathnames = (
    customPath || location.pathname.split("/").filter((x) => x)
  ).map(decodeURIComponent);

  const breadcrumbNameMap = {
    shop: "Shop",
    cart: "Cart",
    checkout: "Checkout",
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4 font-Roobert changeFontSpacing">
      {/* Conditionally render the "Back" button if not on the home page */}
      {location.pathname !== "/" && (
        <>
          <button
            onClick={() => window.history.back()}
            className="flex items-center hover:text-gray-700"
          >
            <FaArrowLeft size={16} className="mr-1" />
            Back
          </button>
          <span className="mx-2">|</span>
        </>
      )}

      <Link to="/" className="hover:text-gray-700">
        Home
      </Link>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const displayName =
          breadcrumbNameMap[name] || capitalizeFirstLetter(name);

        return (
          <React.Fragment key={name}>
            <FaChevronRight size={16} />
            {isLast ? (
              <span className="text-gray-700 font-medium">{displayName}</span>
            ) : (
              <Link to={routeTo} className="hover:text-gray-700">
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
