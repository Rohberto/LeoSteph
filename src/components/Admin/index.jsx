/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdminHeader from "./Layout/Header";
import Menu from "./Layout/Menu";
import Dashboard from "./Dashboard";
import Products from "./Products";
import Quote from "./Quote";
import Orders from "./Orders";
import Customers from "./Customers";
import Users from "./Users";
import OneProduct from "./Products/OneProduct";
import EditProduct from "./Products/EditProduct";
import AdminFooter from "./Layout/Footer";

const AdminHome = ({ user: initialUser }) => {
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState(initialUser || {});

  const view = searchParams.get("view");
  const action = searchParams.get("action");

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
  }, [initialUser]);

  const viewsMap = {
    overview: <Dashboard />,
    products: <Products />,
    quote: <Quote />,
    orders: <Orders />,
    customers: <Customers />,
    users: <Users />,
  };

  const actionsMap = {
    "view-product": <OneProduct />,
    "edit-product": <EditProduct />,
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };

  return (
      <div className="flex main-dashboard-container">

        {/* Sidebar */}
        <aside className={`w-30 dashboard_aside_menu ${isSidebarOpen ? 'open' : 'closed'}`}>
          <Menu toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
          <button className="toggle-btn" onClick={toggleSidebar}>
                    {isSidebarOpen ? '❌' : '☰'}
                </button>
        </aside>

        {/* Main Content */}
        <main className="main_dashboard_content">
          <AdminHeader data={user} />

          <div className="w-full bg-transparent p-4 rounded-lg shadow-inner">
            {viewsMap[view]}
            {actionsMap[action]}
          </div>

          <AdminFooter/>
        </main>
      </div>
  );
};

export default AdminHome;
