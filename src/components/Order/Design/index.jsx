/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion";
import UploadModal from "./Upload";
import { useNavigate } from "react-router-dom";
import clock from "./images/clock.png";
import quality from "./images/quality.png";
import wallet from "./images/wallet.png";
import paint from "./images/paint.png";
import upload from "./images/upload.png";


const DesignOptions = ({ product, setProductDesign, orderSummary, data }) => {
  const navigate = useNavigate();
  const [showUploadModal, setShowUploadModal] = useState(false);
console.log(data);
  const OptionCard = ({
    icon: Icon,
    title,
    description,
    buttonText,
    onClick,
  }) => (
    <motion.div
      className="bg-white rounded-lg shadow-md border-2 border-gray-200 p-8 flex flex-col items-center justify-between h-full"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="border-2 border-dashed border-green-700 p-6 sm:p-12 rounded-lg text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 rounded-full p-4 sm:p-6">
            <img src={Icon} alt={title} className="w-10 h-10 sm:w-14 sm:h-14" />
          </div>
        </div>
        <h2 className="text-lg sm:text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 text-sm sm:text-base mb-4">{description}</p>
        <button
          className="bg-green-700 text-white py-2 px-4 rounded w-full sm:w-auto"
          onClick={onClick}
        >
          {buttonText}
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 mt-6 max-w-4xl">
      {/* Unified Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-2"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Let's finalize your design for the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-oliveGreen to-forestGreen">
            {product?.name || "Product"}
          </span>
        </h2>
        <p className="text-gray-600 text-sm sm:text-base m-14">
          Choose to upload your design or let us create one for you.
        </p>
      </motion.div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-12">
        <OptionCard
          icon={upload}
          title="Upload Your Design"
          description="Upload your own design file in various formats."
          buttonText="Upload Design"
          onClick={() => setShowUploadModal(true)}
        />
        <OptionCard
          icon={paint}
          title="Custom Design"
          description="Let our designers create a unique design for you."
          buttonText="Request Design"
          onClick={() => navigate("/design-request", { state: { product, orderSummary, data } })}
        />
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          setProductDesign={setProductDesign}
          orderSummary={orderSummary}
        />
      )}

      {/* Features Section */}

      <div className="mt-36">
        <h2 className="text-4xl sm:text-5xl font-serif sm:text-2xl font-semibold mb-6 sm:mb-8 text-gray-800">
          You can count on us for:
        </h2>
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: clock,
              bgColor: "bg-gradient-to-r from-green-400 to-green-600",
              iconColor: "text-white",
              title: "Fast Turnaround",
              description:
                "Your order gets to you in 3-5 working days or even earlier.",
            },
            {
              icon: quality,
              bgColor: "bg-gradient-to-r from-blue-400 to-blue-600",
              iconColor: "text-white",
              title: "100% Top Quality",
              description:
                "Only the finest materials and machines are used in fulfilling your order.",
            },
            {
              icon: wallet,
              bgColor: "bg-gradient-to-r from-yellow-400 to-yellow-600",
              iconColor: "text-white",
              title: "Affordable Prices",
              description:
                "All products are priced to ensure value for your money.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className={`flex flex-col items-center rounded-lg p-6 shadow-md ${feature.bgColor} text-center space-y-4`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className={`p-4 rounded-full bg-white`}>
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className={`w-12 h-12 ${feature.iconColor}`}
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-800 text-sm sm:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignOptions;
