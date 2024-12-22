// MyAccount.js
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUser, FaHistory, FaCog, FaPalette } from "react-icons/fa";
import MyProfile from "./profile";
import OrderHistory from "./order";
import AccountSettings from "./settings";
import MySavedDesigns from "./favourites";
import Breadcrumbs from "../../shared/breadCrumbs";

const MyAccount = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tab || "profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (tab && ["profile", "orders", "settings", "designs"].includes(tab)) {
      setActiveTab(tab);
    } else {
      navigate("/MyAccount/profile", { replace: true });
    }
  }, [tab, navigate]);

  const tabs = [
    { id: "profile", label: "My Profile", icon: FaUser, component: MyProfile },
    {
      id: "orders",
      label: "Order History",
      icon: FaHistory,
      component: OrderHistory,
    },
    {
      id: "settings",
      label: "Account Settings",
      icon: FaCog,
      component: AccountSettings,
    },
    {
      id: "designs",
      label: "Saved Designs",
      icon: FaPalette,
      component: MySavedDesigns,
    },
  ];

  const ActiveComponent =
    tabs.find((t) => t.id === activeTab)?.component || MyProfile;

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    navigate(`/MyAccount/${tabId}`);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="max-container min-h-screen py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <Breadcrumbs />
        <div className="max-w-7xl mx-auto mt-8 lg:mt-16">
          <div className="lg:flex">
            {/* Mobile menu button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={toggleMobileMenu}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md flex items-center justify-between"
              >
                <span>Menu</span>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    isMobileMenuOpen ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Left side menu */}
            <div
              className={`${
                isMobileMenuOpen ? "block" : "hidden"
              } lg:block lg:w-1/4 p-4 lg:mr-4 mb-4 lg:mb-0`}
            >
              <h2 className="text-xl font-bold p-4 bg-gray-50 border-b">
                My Account
              </h2>
              <ul className="h-60 ">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => handleTabChange(tab.id)}
                      className={`w-full text-left py-3 px-4 flex items-center transition-colors duration-200 ${
                        activeTab === tab.id
                          ? "bg-blue-500 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <tab.icon className="mr-3 text-lg" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side content */}
            <div className="lg:w-3/4  rounded-lg p-4">
              <ActiveComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
