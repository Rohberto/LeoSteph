import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUser, FaHistory, FaCog, FaPalette } from "react-icons/fa";
import MyProfile from "./profile";
import OrderHistory from "./order";
import AccountSettings from "./settings";
import MySavedDesigns from "./favourites";
import Breadcrumbs from "../../shared/breadCrumbs";
import { getUserData } from "../../services/user";
import useDataFetching from "../../hooks/useDataFetching";
import { transformApiResponse } from "../../utils/dataSelectors";
import Loader from "../../shared/loader";

const MyAccount = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tab || "profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data, isLoading } = useDataFetching({
    fn: getUserData,
    key: ["userData"],
    select: transformApiResponse,
  });

  useEffect(() => {
    if (tab && ["profile", "orders", "settings", "designs"].includes(tab)) {
      setActiveTab(tab);
    } else {
      navigate("/MyAccount/profile", { replace: true });
    }
  }, [tab, navigate]);

  const tabs = [
    {
      id: "profile",
      label: "My Profile",
      icon: FaUser,
      component: MyProfile,
      props: data,
    },
    {
      id: "orders",
      label: "Order History",
      icon: FaHistory,
      component: OrderHistory,
      props: data?.orders,
    },
    {
      id: "settings",
      label: "Account Settings",
      icon: FaCog,
      component: AccountSettings,
      // props: { data. },
    },
    {
      id: "designs",
      label: "Saved Designs",
      icon: FaPalette,
      component: MySavedDesigns,
      props: data?.savedDesigns,
    },
  ];

  const ActiveComponent =
    tabs.find((t) => t.id === activeTab)?.component || MyProfile;

  const ActiveComponentProps = tabs.find((t) => t.id === activeTab)?.props;

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
      {isLoading ? (
        <Loader />
      ) : (
        <div className="max-container min-h-screen py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
          <Breadcrumbs />
          <div className="max-w-7xl mx-auto mt-4 lg:mt-8">
            <div className="lg:flex">
              {/* Mobile menu button */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={toggleMobileMenu}
                  className="w-full bg-[#90A955] text-white py-2 px-4 rounded-md flex items-center justify-between"
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
                            ? "bg-[#90A955] text-white"
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
              <div className="lg:w-3/4 rounded-lg p-2">
                <ActiveComponent data={ActiveComponentProps} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyAccount;