import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaArrowsUpDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const navigate = useNavigate();
  const orders = [
    { id: 1, date: "2023-05-01", total: 150.99, status: "Delivered" },
    { id: 2, date: "2023-04-15", total: 89.99, status: "Shipped" },
    { id: 3, date: "2023-03-30", total: 199.99, status: "Processing" },
    { id: 4, date: "2023-05-10", total: 75.5, status: "Delivered" },
    { id: 5, date: "2023-04-22", total: 120.75, status: "Shipped" },
    { id: 11, date: "2023-05-01", total: 150.99, status: "Delivered" },
    { id: 22, date: "2023-04-15", total: 89.99, status: "Shipped" },
    { id: 23, date: "2023-03-30", total: 199.99, status: "Processing" },
    { id: 43, date: "2023-05-10", total: 75.5, status: "Delivered" },
    { id: 53, date: "2023-04-22", total: 120.75, status: "Shipped" },
    { id: 121, date: "2023-05-01", total: 150.99, status: "Delivered" },
    { id: 278, date: "2023-04-15", total: 89.99, status: "Shipped" },
    { id: 39, date: "2023-03-30", total: 199.99, status: "Processing" },
    { id: 498, date: "2023-05-10", total: 75.5, status: "Delivered" },
    { id: 565, date: "2023-04-22", total: 120.75, status: "Shipped" },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

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

  const sortedOrders = [...orders].sort((a, b) => {
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
  });

  const filteredOrders = sortedOrders.filter(
    (order) =>
      order.id.toString().includes(searchTerm) ||
      order.date.includes(searchTerm) ||
      order.total.toString().includes(searchTerm) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Order History</h1>
      <div className="mb-4 flex items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full p-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch
            className="absolute right-3 top-2.5 text-gray-400"
            size={20}
          />
        </div>
      </div>
      <div className="bg-white  rounded-lg overflow-hidden">
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
                  <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${order.total.toFixed(2)}
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
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewOrder(order.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
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
  );
};

export default OrderHistory;
