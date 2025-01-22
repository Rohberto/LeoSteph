/* eslint-disable react/prop-types */
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrderById } from "../../services/order";
import { ImSpinner2 } from "react-icons/im";

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
      <p className="font-semibold mb-2 text-lg">
        {specifications && "Product Specifications"}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {specifications &&
          Object.entries(specifications).map(([key, value]) => (
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

const OrderRequestItem = ({
  image,
  title,
  quantity,
  amount,
  orderDate,
  specifications,
  deliveryAddress,
  instructions
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
        <div>
          <h2 className="font-semibold text-xl mb-2">Instuctions</h2>
          <p className="text-sm text-gray-600">{instructions}</p>
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
      <p className="font-semibold mb-2 text-lg">
        {specifications && "Product Specifications"}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {specifications &&
          Object.entries(specifications).map(([key, value]) => (
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
        image={item?.design[0]}
        title={item?.product?.name}
        quantity={item?.quantity}
        amount={(item?.price / item?.quantity) * item?.quantity}
        orderDate={item?.orderDate || ""}
        specifications={item?.specs}
        deliveryAddress={shippingAddress}
      />
    ))}
  </div>
);

const RequestOrderSummary = ({ items, shippingAddress }) => (
  <div className="space-y-8">
    {items.map((item, index) => (
      <OrderRequestItem
        key={index}
        image={item?.request.upload[0]}
        title={item?.product?.name}
        quantity={item?.quantity}
        amount={(item?.price / item?.quantity) * item?.quantity}
        orderDate={item?.orderDate || ""}
        specifications={item?.specs}
        instructions={item.request.instructions}
        deliveryAddress={shippingAddress}
      />
    ))}
  </div>
);

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
console.log(order);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrderById(orderId);
        setOrder(response?.order);
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <ImSpinner2 className="animate-spin text-oliveGreen text-4xl" />
        <p className="ml-4 text-gray-600">Fetching order details...</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-container min-h-screen py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto p-4 flex flex-col space-y-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 bg-oliveGreen hover:bg-sageGreen text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out self-start"
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
                  <p className="text-lg">{order.createdAt.slice(0, 10)}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Total</span>
                  <p className="text-lg font-semibold">
                    ₦{order.total.toFixed(2)}
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
                      order.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">
                    Shipping Address
                  </span>
                  <p className="text-lg">
                    {order.shipping !== "self_pickup"
                      ? order.address.line_1
                      : order.shipping}
                  </p>
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
          {!order.items[0].request && (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-8 pb-4 border-b">
              Order Summary
            </h2>
            <OrderSummary
              items={order.items}
              shippingAddress={order.address.line_1}
            />
          </div>
          )
}
          {/* Order Summary Section */}
          {order.items[0].request && (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-8 pb-4 border-b">
              Order Request Summary
            </h2>
            <RequestOrderSummary
              items={order.items}
              shippingAddress={order.address.line_1}
            />
          </div>
          )
}

        </div>
      </div>
    </>
  );
};

export default OrderDetails;