import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingCart, Menu } from "lucide-react";
import { DataContext } from "../../../context/DataContext";
import { logo } from "../../../constant/images/index";
import { navItems, accountItems, helpItems } from "../../../constant";
import DropdownMenu from "./NavDropdown";
import DropdownUserMenu from "./UserNavDropDown";
import { FaUserCircle } from "react-icons/fa";

import MobileMenu from "./MobileMenu";
import SearchModal from "./Search";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleSearch = (searchTerm) => {
    console.log("Search term:", searchTerm);
    // Implement search logic
  };

  const {user} = useContext(DataContext);
  return (
    <header className="w-full h-15 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200 transition-shadow duration-300 hover:shadow-md font-Roobert changefontspacing" >
      <div className="h-full px-4 max-w-container py-3 flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
            className="mr-4 p-1 md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Logo" className="h-8 md:h-10 w-auto" />
          </Link>
        </div>

        {/* Center Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `
          relative text-sm font-medium px-4 py-2 whitespace-nowrap transition-all duration-300 
          ${
            isActive
              ? "text-emerald-600"
              : "text-gray-700 hover:text-emerald-600"
          }
        `
              }
            >
              <span
                className="
          absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] w-0 bg-emerald-600
          transition-all duration-300 group-hover:w-3/4 group-hover:bg-gold-500
        "
              ></span>
              {item.title}
            </NavLink>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
         <div className="authnav">
          {user === null ? (
          <Link to="/sign-in">Sign In</Link>
          ): (
            <div className="nav-user-info">
                  <div className="nav-user-image">
                  <FaUserCircle />
                  </div>
                <div>
                 <DropdownUserMenu
              items={accountItems}
              isOpen={isHelpOpen}
              onClick={() => setIsHelpOpen(!isHelpOpen)}
              title={user?.firstName}
              transition="ease-in-out duration-300"
            />
            </div>
            </div>
          )}
         </div>
         
          <button
            onClick={() => setIsSearchModalOpen(true)}
            aria-label="Search"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors transform hover:scale-110"
          >
            <Search className="w-5 h-5" />
          </button>

          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu
              items={helpItems}
              isOpen={isHelpOpen}
              onClick={() => setIsHelpOpen(!isHelpOpen)}
              title="Help"
              transition="ease-in-out duration-300"
            />
          </div>
          <Link
            to="/cart"
            aria-label="Cart"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors transform hover:scale-110 relative"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
              {0}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          navItems={navItems}
          accountItems={accountItems}
          helpItems={helpItems}
        />
      )}
      {isSearchModalOpen && (
        <SearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          onSearch={handleSearch}
        />
      )}
    </header>
  );
};

export default Header;
