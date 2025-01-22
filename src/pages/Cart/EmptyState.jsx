/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();

  const handleGoShopping = () => {
    navigate("/shop");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      {/* Animated Cart Icon */}
      <motion.div
        className="mb-6 text-green-600"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <FaShoppingCart size={80} />
      </motion.div>

      {/* Message */}
      <motion.h2
        className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        You haven't added any items to your cart.
      </motion.h2>

      {/* Button */}
      <motion.button
        onClick={handleGoShopping}
        className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <FaShoppingCart size={20} />
        Let's Go Shopping
      </motion.button>
    </div>
  );
};

export default EmptyCart;