import { useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const CartPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  // Sample cart items with state

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 19.99,
      image: "https://via.placeholder.com/150",
      quantity: 2,
    },
    {
      id: 32,
      name: "Product 42",
      price: 29.99,
      image: "https://via.placeholder.com/150",
      quantity: 7,
    },
    {
      id: 21,
      name: "Product 8",
      price: 9.99,
      image: "https://via.placeholder.com/150",
      quantity: 2,
    },
    {
      id: 4,
      name: "Product 13",
      price: 19.99,
      image: "https://via.placeholder.com/150",
      quantity: 11,
    },
    {
      id: 9,
      name: "Product 32",
      price: 9.99,
      image: "https://via.placeholder.com/150",
      quantity: 20,
    },
    {
      id: 7,
      name: "Product 1",
      price: 29.99,
      image: "https://via.placeholder.com/150",
      quantity: 30,
    },
    {
      id: 42,
      name: "Product 33",
      price: 9.99,
      image: "https://via.placeholder.com/150",
      quantity: 9,
    },
    {
      id: 49,
      name: "Product 7833",
      price: 9.99,
      image: "https://via.placeholder.com/150",
      quantity: 9,
    },
  ]);

  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item };
    } else {
      acc[item.id].quantity += item.quantity;
    }
    return acc;
  }, {});

  const itemList = Object.values(groupedItems);

  const calculateTotalPrice = itemList.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const renderCartItem = (item) => (
    <li key={item.id} className="mb-4 flex items-center border-t pt-4 relative">
      <button
        onClick={() => removeItem(item.id)}
        className="text-red-500 text-xl font-bold absolute top-2 right-2"
      >
        &times;
      </button>
      <img
        src={item.image || "https://via.placeholder.com/150"}
        alt={`Image of ${item.name}`}
        className="w-16 h-16 object-cover rounded mr-4"
      />
      <div className="flex-1">
        <p className="font-bold text-black">{item.name}</p>
        <p className="text-black">
          {item.quantity} x N{item.price.toFixed(2)}
        </p>
        <p className="font-bold">
          Total: N{(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </li>
  );
  const handleViewCartClick = () => {
    navigate("/cart"); // Navigate to CartPage
    onClose(); // Close the popup after navigation
  };
  const handleCheckout = () => {
    navigate("/checkout"); // Navigate to CartPage
    onClose(); // Close the popup after navigation
  };

  return (
    <motion.div
      className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg p-4 flex flex-col"
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative mb-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-lg font-bold text-gray-700"
        >
          &times;
        </button>
        <span className="absolute top-4 right-8 text-gray-700">Close</span>
      </div>
      <h2 className="text-xl font-bold text-black mb-4">Cart</h2>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-hidden">
        <div
          className="h-full overflow-y-scroll pr-4"
          style={{
            marginRight: "-17px",
            paddingRight: "17px",
            boxSizing: "content-box",
          }}
        >
          {/* Cart items rendering */}
          {itemList.length === 0 ? (
            <p className="text-center text-black mt-4">Your cart is empty.</p>
          ) : (
            <ul>{itemList.map(renderCartItem)}</ul>
          )}
        </div>
      </div>

      {/* Total Price and Fixed buttons */}
      <div className="flex flex-col mt-4 border-t pt-4">
        <div className="flex justify-between mb-4">
          <span className="font-bold text-black">Total:</span>
          <span className="font-bold text-black">
            N{calculateTotalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleViewCartClick}
          >
            View Cart
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </motion.div>
  );
};

CartPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CartPopup;
