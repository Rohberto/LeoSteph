import { useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "John Doe",
      status: "Pending",
      total: "$120",
      items: [
        { name: "T-shirt", quantity: 2, price: "$40" },
        { name: "Mug", quantity: 1, price: "$40" },
      ],
    },
    {
      id: 2,
      customer: "Jane Smith",
      status: "Shipped",
      total: "$200",
      items: [
        { name: "Hoodie", quantity: 1, price: "$60" },
        { name: "Cap", quantity: 2, price: "$70" },
      ],
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const updateOrderStatus = (id, status) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {/* Orders List */}
      <div className="bg-white shadow rounded mb-6">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.customer}</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2">{order.total}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View Details
                  </button>
                  <select
                    className="border rounded px-2 py-1"
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p className="mb-2">
              <strong>Order ID:</strong> {selectedOrder.id}
            </p>
            <p className="mb-2">
              <strong>Customer:</strong> {selectedOrder.customer}
            </p>
            <p className="mb-2">
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p className="mb-4">
              <strong>Total:</strong> {selectedOrder.total}
            </p>

            <h3 className="text-lg font-semibold mb-2">Items</h3>
            <ul className="list-disc pl-6 mb-4">
              {selectedOrder.items.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.quantity} x {item.price}
                </li>
              ))}
            </ul>

            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => setSelectedOrder(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
