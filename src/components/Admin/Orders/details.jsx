/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { MoreVertical, ChevronDown, X } from "lucide-react";
import { getOrderById } from "../../services/order";

// Sample data structure
const orders = [
  {
    address: {
      line_1: "",
      line_2: "",
    },
    items: [
      {
        product: {
          name: "Square Business Card (One Sided)",
          description:
            "2.5 by 2.5 inches 300 gsm matte card paper stock with 600 gsm options.\n\nFinishing:\nMatte Lamination and round corner options",
          price: 10000,
          images: [
            "https://res.cloudinary.com/dryjz5fvt/image/upload/v1735989049/ihsan/jossrai4ljseyxa7juyv.png",
          ],
          id: "677916b1546800b10bf5ac85",
        },
        quantity: 100,
        price: 10000,
        information:
          "2.5 by 2.5 inches 300 gsm matte card paper stock with 600 gsm options.\n\nFinishing:\nMatte Lamination and round corner options",
        design: [
          "https://res.cloudinary.com/dryjz5fvt/image/upload/v1736391138/ihsan/opjj9vqh0muglm315lfp.jpg",
        ],
        specifications: [
          {
            name: "Lamination",
            value: "Gloss",
            _id: "677f39e399ec62998dc2e737",
          },
          {
            name: "Paper Thickness",
            value: "300gsm",
            _id: "677f39e399ec62998dc2e738",
          },
          {
            name: "Corners",
            value: "Square Corner",
            _id: "677f39e399ec62998dc2e739",
          },
        ],
        id: "677f39e399ec62998dc2e736",
      },
    ],
    shipping: "self_pickup",
    orderStatus: "pending",
    paymentStatus: "completed",
    paymentMethod: "debit_card",
    city: "",
    state: "",
    user: "674430e03e1a5fdeb9300098",
    transaction_reference: "s35m6vw36r",
    total: 10000,
    createdAt: "2025-01-09T02:53:23.065Z",
    updatedAt: "2025-01-09T13:40:57.970Z",
    id: "677f3a2299ec62998dc2e7c5",
  },
  {
    address: {
      line_1: "",
      line_2: "",
    },
    items: [
      {
        product: {
          name: "A4 Courier Bags",
          description:
            "Material:\n8 X 11 inches plastic bag\n\nFinishing:\nNeatly sealed on all sides",
          price: 25000,
          images: [
            "https://res.cloudinary.com/dryjz5fvt/image/upload/v1736399465/ihsan/fnmhinwdv5rrg2fyl5u3.jpg",
            "https://res.cloudinary.com/dryjz5fvt/image/upload/v1736399465/ihsan/igljpwrn7huadpamg6ra.jpg",
          ],
          id: "677f5a7949db70ad9e7f9ce4",
        },
        quantity: 100,
        price: 25000,
        information:
          "Material:\n8 X 11 inches plastic bag\n\nFinishing:\nNeatly sealed on all sides",
        design: [
          "https://res.cloudinary.com/dryjz5fvt/image/upload/v1736424954/ihsan/fgt1gapiq9e24metnqx5.png",
        ],
        specifications: [],
        id: "677fbdfc6259b551cf1d9a65",
      },
    ],
    shipping: "self_pickup",
    orderStatus: "pending",
    paymentStatus: "completed",
    paymentMethod: "debit_card",
    city: "",
    state: "",
    user: "674430e03e1a5fdeb9300098",
    transaction_reference: "vjk1sboyjq",
    total: 25000,
    createdAt: "2025-01-09T12:17:31.941Z",
    updatedAt: "2025-01-09T12:17:31.941Z",
    id: "677fbe5b6259b551cf1d9ae6",
  },
];

function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case "pending":
      return "text-red-500 bg-red-50";
    case "processing":
      return "text-purple-500 bg-purple-50";
    case "shipping":
      return "text-orange-500 bg-orange-50";
    case "delivered":
      return "text-green-500 bg-green-50";
    default:
      return "text-gray-500 bg-gray-50";
  }
}

const Checkbox = ({ checked, onChange }) => (

  <div className="relative">
    <input
      type="checkbox"
      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      checked={checked}
      onChange={onChange}
    />
  </div>
);

const Badge = ({ className, children }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
  >
    {children}
  </span>
);

const OrderDetailsModal = ({ order, onClose }) => {
    const [orderDetail, setOrderDetail] = useState(null);
    useEffect(() => {
        const fetchOrder = async () => {
          try {
            const response = await getOrderById(order.id);
            setOrderDetail(response?.order);
          } catch (error) {
            console.error("Failed to fetch order details:", error);
          }
        };
    
        fetchOrder();
      }, [order.id])
      console.log(orderDetail);
      retutn (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg w-full md:w-3/4 lg:w-2/3 xl:w-1/2 max-h-[90vh] overflow-y-auto shadow-lg">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Order Information and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-700 mb-3">
                Order Information
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>
                  <span className="font-medium">Order ID:</span> {order.id}
                </p>
                <p>
                  <span className="font-medium">Total Amount:</span> ₦
                  {order.total.toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">Transaction Ref:</span>{" "}
                  {order.transaction_reference}
                </p>
                <p>
                  <span className="font-medium">Created At:</span>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">Updated At:</span>{" "}
                  {new Date(order.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-700 mb-3">
                Status
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>
                  <span className="font-medium">Order Status:</span>{" "}
                  <Badge className={getStatusColor(order.orderStatus)}>
                    {order.orderStatus}
                  </Badge>
                </p>
                <p>
                  <span className="font-medium">Payment Status:</span>{" "}
                  {order.paymentStatus}
                </p>
                <p>
                  <span className="font-medium">Payment Method:</span>{" "}
                  {order.paymentMethod.replace("_", " ")}
                </p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg text-gray-700 mb-3">Items</h3>
            {order.items.map((item, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Product Image */}
                  <div className="w-full md:w-1/3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="w-full md:w-2/3">
                    <h4 className="font-semibold text-gray-700">
                      {item.product.name}
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      {item.product.description}
                    </p>

                    {/* Quantity and Price */}
                    <div className="mt-3">
                      <p>
                        <span className="font-medium">Quantity:</span>{" "}
                        {item.quantity}
                      </p>
                      <p>
                        <span className="font-medium">Price:</span> ₦
                        {item.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Specifications */}
                    <div className="mt-3">
                      <h5 className="font-medium text-gray-700">
                        Specifications:
                      </h5>
                      <ul className="list-disc list-inside text-gray-600">
                        {item.specifications.map((spec, specIndex) => (
                          <li key={specIndex}>
                            <span className="font-medium">{spec.name}:</span>{" "}
                            {spec.value}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Design */}
                    <div className="mt-3">
                      <h5 className="font-medium text-gray-700">Design:</h5>
                      <img
                        src={item.design[0]}
                        alt="Design"
                        className="w-full h-auto rounded-lg mt-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg text-gray-700 mb-3">
              Shipping Information
            </h3>
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-medium">Method:</span>{" "}
                {order.shipping.replace("_", " ")}
              </p>
              {order.address.line_1 && (
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {order.address.line_1}
                </p>
              )}
              {order.address.line_2 && <p>{order.address.line_2}</p>}
              {(order.city || order.state) && (
                <p>
                  {order.city}, {order.state}
                </p>
              )}
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg text-gray-700 mb-3">
              Customer Information
            </h3>
            <p className="text-gray-600">
              <span className="font-medium">Customer ID:</span> {order.user}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
};

const DropdownMenu = ({ onViewDetails }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
      >
        <MoreVertical className="h-4 w-4" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => {
                onViewDetails();
                setIsOpen(false);
              }}
            >
              View Details
            </button>
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
              Update Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Orders = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const toggleOrder = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-600 text-white">
              <th className="w-12 p-4">
                <Checkbox
                  checked={selectedOrders.length === orders.length}
                  onChange={() => {
                    if (selectedOrders.length === orders.length) {
                      setSelectedOrders([]);
                    } else {
                      setSelectedOrders(orders.map((order) => order.id));
                    }
                  }}
                />
              </th>
              <th className="p-4 text-left font-medium">
                <div className="flex items-center gap-1">
                  Order ID
                  <ChevronDown className="h-4 w-4" />
                </div>
              </th>
              <th className="p-4 text-left font-medium">Items</th>
              <th className="p-4 text-left font-medium">Customer</th>
              <th className="p-4 text-left font-medium">Total</th>
              <th className="p-4 text-left font-medium">Order Status</th>
              <th className="p-4 text-left font-medium">Payment Status</th>
              <th className="w-12 p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => toggleOrder(order.id)}
                  />
                </td>
                <td className="p-4 font-medium">{order.id}</td>
                <td className="p-4">{order.items.length} item(s)</td>
                <td className="p-4">{order.user}</td>
                <td className="p-4">₦{order.total.toLocaleString()}</td>
                <td className="p-4">
                  <Badge className={getStatusColor(order.orderStatus)}>
                    {order.orderStatus}
                  </Badge>
                </td>
                <td className="p-4">
                  <Badge className={getStatusColor(order.paymentStatus)}>
                    {order.paymentStatus}
                  </Badge>
                </td>
                <td className="p-4">
                  <DropdownMenu onViewDetails={() => setSelectedOrder(order)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default Orders;