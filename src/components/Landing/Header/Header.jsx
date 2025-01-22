import { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu } from "lucide-react";
import { DataContext } from "../../../context/DataContext";
import { logo } from "../../../constant/images/index";
import { navItems, accountItems, helpItems } from "../../../constant";
import DropdownMenu from "./NavDropdown";
import DropdownUserMenu from "./UserNavDropDown";
import { FaUserCircle, FaUser, FaCaretDown, FaHistory, FaPalette, FaCog, FaSignOutAlt} from "react-icons/fa";
import { motion } from "framer-motion";
import MobileMenu from "./MobileMenu";
import SearchModal from "./Search";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const handleSearch = (searchTerm) => {
    console.log("Search term:", searchTerm);
    // Implement search logic
  };

  const {user} = useContext(DataContext);
  const isAuthenticated = user !== null;
  const handleSignOut = () => {
    AuthService.doLogout();
  };
  const navigateToAccount = (tab) => {
    navigate(`/MyAccount/${tab}`);
    setShowUser(false);
  };
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
        <div onClick={() => setShowUser(!showUser)} className="flex">
                <FaUser />
                <FaCaretDown />
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

      {showUser && (
        <div className="absolute lg:right-24 right-20 sm:right-16 xs:right-8 lg:top-16 sm:top-6 xs:top-10 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
          {isAuthenticated ? (
            <motion.ul
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-primeColor w-auto text-[#767676] h-auto p-4"
            >
              <li
                onClick={() => navigateToAccount(0)}
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
              >
                <FaUserCircle className="text-gray-500" />
                <span>Profile</span>
              </li>
              <li
                onClick={() => navigateToAccount(1)}
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
              >
                <FaHistory className="text-gray-500" />
                <span>Order History</span>
              </li>
              <li
                onClick={() => navigateToAccount(2)}
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
              >
                <FaPalette className="text-gray-500" />
                <span>Theme</span>
              </li>
              <li
                onClick={() => navigateToAccount(3)}
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
              >
                <FaCog className="text-gray-500" />
                <span>Settings</span>
              </li>
              <li
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
              >
                <FaSignOutAlt className="text-gray-500" />
                <span>Logout</span>
              </li>
            </motion.ul>
          ) : (
            <Link to="/sign-in">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-primeColor w-auto text-[#767676] h-auto p-4"
              >
                <p className="text-center text-gray-500">Login</p>
              </motion.div>
            </Link>
          )}
        </div>
      )}

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
