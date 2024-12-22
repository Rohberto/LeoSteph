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

  return (
    <div className="w-full bg-gray-200 h-screen">
      <div className="grid grid-cols-12 gap-2 h-full">
        {/* Sidebar */}
        <aside className="col-span-2 max-h-screen overflow-y-auto bg-white shadow-md">
          <Menu />
        </aside>

        {/* Main Content */}
        <main className="col-span-10 pr-2 pt-1">
          <AdminHeader data={user} />

          <div className="w-full h-full overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-inner">
            {viewsMap[view] || viewsMap["overview"]}
            {actionsMap[action]}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminHome;
