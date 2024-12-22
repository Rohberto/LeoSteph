/* eslint-disable react/prop-types */

import { useParams, useNavigate } from "react-router-dom";

const OrderItem = ({
  image,
  title,
  quantity,
  amount,
  orderDate,
  specifications,
  deliveryAddress,
}) => (
  <div className="bg-cream-100 p-6 rounded-lg mb-8 shadow-md">
    <div className="flex flex-col md:flex-row justify-between items-start mb-4">
      <div className="flex items-start mb-4 md:mb-0">
        <img
          src={image}
          alt={title}
          className="w-24 h-24 object-cover rounded-md mr-4"
        />
        <div>
          <h2 className="font-semibold text-xl mb-2">{title}</h2>
          <p className="text-sm text-gray-600">Qty Ordered: {quantity}</p>
        </div>
      </div>
      <div className="text-left md:text-right">
        <p className="font-semibold text-lg">Amount Spent</p>
        <p className="text-blue-600 text-xl">₦{amount.toLocaleString()}</p>
      </div>
    </div>
    <div className="mb-4">
      <p className="text-sm text-gray-600">
        Ordered On: <span className="text-black font-medium">{orderDate}</span>
      </p>
    </div>
    <div className="mb-4">
      <p className="font-semibold mb-2 text-lg">Product Specifications</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {Object.entries(specifications).map(([key, value]) => (
          <p key={key} className="text-sm">
            <span className="text-gray-600 font-medium">{key}:</span> {value}
          </p>
        ))}
      </div>
    </div>
    <div className="mb-6">
      <p className="font-semibold mb-2 text-lg">Delivered to:</p>
      <p className="text-sm">{deliveryAddress}</p>
    </div>
    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 text-sm font-medium">
      Order Again
    </button>
  </div>
);

const OrderSummary = ({ items, shippingAddress }) => (
  <div className="space-y-8">
    {items.map((item, index) => (
      <OrderItem
        key={index}
        image={item.image}
        title={item.name}
        quantity={item.quantity}
        amount={item.price * item.quantity}
        orderDate={item.orderDate || "September 19, 2024"}
        specifications={item.specs}
        deliveryAddress={shippingAddress}
      />
    ))}
  </div>
);

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const order = {
    id: orderId,
    date: "2023-05-01",
    total: 150.99,
    status: "Delivered",
    items: [
      {
        id: 1,
        name: "Smartphone X",
        quantity: 1,
        price: 99.99,
        image: "https://example.com/smartphone-x.jpg",
        specs: {
          "Screen Size": "6.5 inches",
          Storage: "128GB",
          RAM: "6GB",
          Camera: "48MP main + 12MP ultra-wide",
          Battery: "4500mAh",
        },
      },
      {
        id: 2,
        name: "Wireless Earbuds",
        quantity: 1,
        price: 51.0,
        image: "https://example.com/wireless-earbuds.jpg",
        specs: {
          "Battery Life": "Up to 6 hours",
          "Charging Case": "Additional 18 hours",
          Connectivity: "Bluetooth 5.0",
          "Water Resistance": "IPX4",
          "Noise Cancellation": "Active",
        },
      },
    ],
    shippingAddress: "123 Main St, City, Country, 12345",
    paymentMethod: "Credit Card",
  };

  return (
    <>
      <div className="max-container min-h-screen py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto p-4 flex flex-col space-y-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out self-start"
          >
            Back to Orders
          </button>

          {/* Order Details Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-12">
            <h1 className="text-3xl font-bold mb-8 pb-4 border-b">
              Order Details
            </h1>

            {/* Order Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <span className="font-medium text-gray-600">Order ID</span>
                  <p className="text-lg">{order.id}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Date</span>
                  <p className="text-lg">{order.date}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Total</span>
                  <p className="text-lg font-semibold">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <span className="font-medium text-gray-600 block mb-2">
                    Status
                  </span>
                  <span
                    className={`px-4 py-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">
                    Shipping Address
                  </span>
                  <p className="text-lg">{order.shippingAddress}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">
                    Payment Method
                  </span>
                  <p className="text-lg">{order.paymentMethod}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-8 pb-4 border-b">
              Order Summary
            </h2>
            <OrderSummary
              items={order.items}
              shippingAddress={order.shippingAddress}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
