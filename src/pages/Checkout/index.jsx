import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Breadcrumbs from "../../shared/breadCrumbs";
import { initializePayment } from "../../services/payment";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useLocation, useNavigate } from "react-router-dom";
import Paystack from "@paystack/inline-js";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const popup = new Paystack();
  const navigate = useNavigate();
  const location = useLocation();
  const [shippingMethod, setShippingMethod] = useState("deliver");
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);
  const { orderSummary } = location.state;
  const form = useForm({
    defaultValues: {
      customer: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      },
      delivery: {
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
      },
    },
  });

  const { register, control, handleSubmit } = form;

  const handlePaymentInitialization = async (customerData) => {
    const amountInSmallestUnit = orderSummary?.total * 100;
    try {
      const paymentData = {
        email: customerData?.customer?.email,
        amount: amountInSmallestUnit,
      };

      const response = await initializePayment(paymentData);

      if (response) {
        popup.resumeTransaction(response.data.access_code, {
          onSuccess: (transaction) => {
            console.log(transaction);
            navigate(`/order-success?reference=${transaction.reference}`, {
              state: {
                orderSummary,
              },
            });
          },
          onClose: () => {
            toast.error("Transaction was closed by the user.");
          },
          onCancel: () => {
            toast.error("Transaction was closed by the user.");
          },
        });
      } else {
        console.error("Failed to obtain payment authorization URL.");
      }
    } catch (error) {
      console.error("Failed to initialize payment:", error);
    }
  };

  const handleButtonClick = (data) => {
    console.log(data);
    handlePaymentInitialization(data);
  };

  const requiredChecker = () => {
    if (shippingMethod === "deliver") {
      return true;
    } else {
      return false;
    }
  };

  const CompanyDetails = () => (
    <AnimatePresence>
      {showCompanyDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-blue-100 p-4 rounded border border-blue-300 mt-4 overflow-hidden"
        >
          <h3 className="font-semibold text-lg mb-2">
            Company Pickup Location
          </h3>
          <p>123 Company Street</p>
          <p>Business District, City 12345</p>
          <p>State, Country</p>
          <p className="mt-2">
            <span className="font-semibold">Phone:</span> (123) 456-7890
          </p>
          <p>
            <span className="font-semibold">Hours:</span> Mon-Fri 9AM-5PM
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const AddressFields = () => (
    <div className="space-y-4">
      <form noValidate>
        <div>
          <label className="block mb-1">Address Line 1</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            {...register("delivery.addressLine1", {
              required: {
                value: requiredChecker(),
                message: "This field is required",
              },
            })}
          />
        </div>
        <div>
          <label className="block mb-1">Address Line 2</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            {...register("delivery.addressLine2", {
              required: {
                value: requiredChecker(),
                message: "This field is required",
              },
            })}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block mb-1">City</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              {...register("delivery.city", {
                required: {
                  value: requiredChecker(),
                  message: "This field is required",
                },
              })}
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1">State</label>
            <select
              className="w-full border rounded p-2"
              {...register("delivery.state", {
                required: {
                  value: requiredChecker(),
                  message: "This field is required",
                },
              })}
            >
              <option>Abia</option>
              {/* Add more states here */}
            </select>
          </div>
        </div>
        <div>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Save address to my account
          </label>
        </div>
      </form>
    </div>
  );

  const CustomerForm = () => (
    <div className="space-y-6 w-full max-w-xl">
      <form noValidate>
        <DevTool control={control} />
        <h2 className="text-xl font-semibold">Customer Information</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block mb-1">First Name</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              {...register("customer.firstName", {
                required: "First name is required",
              })}
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1">Last Name</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              {...register("customer.lastName", {
                required: "Last name is required",
              })}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded p-2"
              {...register("customer.email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1">Phone Number</label>
            <input
              type="tel"
              className="w-full border rounded p-2"
              {...register("customer.phoneNumber", {
                required: "Phone number is required",
                // pattern: {
                //   value:
                //     /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[-.]?\d{3}[-.]?\d{4}$/,
                //   message: "Invalid phone number",
                // },
              })}
            />
          </div>
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </form>

      <h2 className="text-xl font-semibold mt-8">Shipping Information</h2>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <button
          className={`flex items-center justify-center px-4 py-3 border rounded ${
            shippingMethod === "deliver"
              ? "bg-red-100 border-red-300"
              : "bg-white"
          }`}
          onClick={() => {
            setShippingMethod("deliver");
            setShowCompanyDetails(false);
          }}
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
          Deliver to Me
        </button>
        <button
          className={`flex items-center justify-center px-4 py-3 border rounded ${
            shippingMethod === "pickup"
              ? "bg-blue-100 border-blue-300"
              : "bg-white"
          }`}
          onClick={() => {
            setShippingMethod("pickup");
            setShowCompanyDetails(true);
          }}
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          Self Pickup
        </button>
      </div>
      {shippingMethod === "deliver" ? <AddressFields /> : <CompanyDetails />}
    </div>
  );

  const OrderSummary = () => {
    return (
      <div className="bg-gray-100 p-4 rounded w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Items</span>
            <span>{orderSummary?.items?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Sub Total</span>
            <span>₦{orderSummary?.subtotal?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₦{orderSummary?.shipping?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>₦{orderSummary?.tax?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₦{orderSummary?.total?.toLocaleString()}</span>
          </div>
        </div>
        <button
          className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600 transition-colors"
          onClick={form.handleSubmit(handleButtonClick)}
        >
          Proceed to Payment
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="max-container bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <Breadcrumbs customPath={["cart", "checkout"]} />
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16">
          <div className="lg:w-3/5 xl:w-1/2">
            <CustomerForm />
          </div>

          <div className="lg:w-2/5 xl:w-1/3 space-y-8">
            <OrderSummary />
            <PromoCodeInput />
          </div>
        </div>
      </div>
    </>
  );
};

const PromoCodeInput = () => (
  <div>
    <p className="mb-2">Got a promo code?</p>
    <div className="flex">
      <input
        type="text"
        className="flex-grow border rounded-l p-2"
        placeholder="Enter code"
      />
      <button className="bg-red-400 text-white px-4 rounded-r hover:bg-red-500 transition-colors">
        Apply
      </button>
    </div>
  </div>
);

export default CheckoutPage;
