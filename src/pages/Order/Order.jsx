import React, { useEffect, useState, useContext } from "react";
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
        const data = await response.json();
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
