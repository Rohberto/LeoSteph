/*import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../../context/DataContext";
const OrdersPage = () => {
  const [orders, setOrders] = useState([]); // State to hold orders
  const [loading, setLoading] = useState(true); // State to track loading

const {token} = useContext(DataContext);

  useEffect(() => {
    // Simulate fetching orders from the backend
    const fetchOrders = async () => {
      try {
        const response =  await fetch("https://api.leosteph.com/api/orders/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,// Ensure token is correctly passed
            },
          });
        const orders = await response.json();
        console.log(data);
        setOrders(data.orders); // Assume data.orders contains an array of orders
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]); // Fallback to empty orders
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen font-Roobert changeFontSpacing">
        <p className="text-lg font-medium text-gray-600">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-Roobert changeFontSpacing">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Orders</h1>

        {orders.length === 0 ? (
          // Message when there are no orders
          <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-md">
            <p className="text-lg text-gray-600">You haven’t made any orders yet.</p>
          </div>
        ) : (
          // Orders list
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-4 bg-gray-50 rounded-lg shadow-sm"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Order ID: {order.id}
                </h2>
                <div className="text-gray-600 space-y-1">
                  <p><strong>Shipping Method:</strong> {order.shipping}</p>
                  <p><strong>Order Status:</strong> {order.orderStatus}</p>
                  <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                  <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                  <p><strong>City:</strong> {order.city}</p>
                  <p><strong>State:</strong> {order.state}</p>
                  <p><strong>Address Line 1:</strong> {order.address.line_1}</p>
                  <p><strong>Address Line 2:</strong> {order.address.line_2}</p>
                  <p><strong>User:</strong> {order.user}</p>
                  <p><strong>Transaction Reference:</strong> {order.transaction_reference}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default OrdersPage;
*/

import { useState, useContext, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaArrowsUpDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [orders, setOrders] = useState([]); // State to hold orders
  const [loading, setLoading] = useState(true); // State to track loading

  const handleViewOrder = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const {token} = useContext(DataContext);

  useEffect(() => {
    // Simulate fetching orders from the backend
    const fetchOrders = async () => {
      try {
        const response =  await fetch("https://api.leosteph.com/api/orders/me", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,// Ensure token is correctly passed
            },
          });
        const data = await response.json();
        console.log(data);
        setOrders(data.orders); // Assume data.orders contains an array of orders
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]); // Fallback to empty orders
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const sortedOrders =
    orders && Array.isArray(orders)
      ? [...orders].sort((a, b) => {
          if (sortConfig.key) {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            if (aValue < bValue) {
              return sortConfig.direction === "ascending" ? -1 : 1;
            }
            if (aValue > bValue) {
              return sortConfig.direction === "ascending" ? 1 : -1;
            }
          }
          return 0;
        })
      : [];

  const filteredOrders = sortedOrders.filter(
    (order) =>
      order.id.toString().includes(searchTerm) ||
      order.date.includes(searchTerm) ||
      order.total.toString().includes(searchTerm) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(filteredOrders);

  return (
    <div className="w-full p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Order History</h1>
      {filteredOrders?.length > 0 ? (
        <div className="w-full p-4 bg-gray-100 min-h-screen">
          <div className="mb-4 flex items-center">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full p-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4F772D]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch
                className="absolute right-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-200">
                    {["id", "date", "total", "status"].map((key) => (
                      <th
                        key={key}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-300"
                        onClick={() => handleSort(key)}
                      >
                        <div className="flex items-center">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                          <FaArrowsUpDown size={14} className="ml-1" />
                        </div>
                      </th>
                    ))}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.createdAt.slice(0, 10)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ₦{order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleViewOrder(order.id)}
                          className="bg-[#4F772D] hover:bg-[#31572C] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-gray-100 w-full h-full min-h-[40vh]">
          <div className="my-3 text-center">
            <div className="mb-2 text-gray-500 mx-3">
              <h3 className="text-xl font-bold">No previous orders found</h3>
              <p className="text-sm">
                Add Products to your cart and complete orders.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;


