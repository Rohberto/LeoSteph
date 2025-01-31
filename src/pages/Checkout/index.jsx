import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Breadcrumbs from "../../shared/breadCrumbs";
import { initializePayment } from "../../services/payment";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useLocation, useNavigate } from "react-router-dom";
import Paystack from "@paystack/inline-js";
import { toast } from "react-toastify";
import { states } from "../../assets/states";
import { getUserData } from "../../services/user";
import { transformApiResponse } from "../../utils/dataSelectors";

const CheckoutPage = () => {
  const popup = new Paystack();
  const navigate = useNavigate();
  const location = useLocation();
  const [shippingMethod, setShippingMethod] = useState("home_delivery");
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const { orderSummary } = location.state;

  const form = useForm({
    defaultValues: async () => {
      const res = await getUserData();
      const userData = transformApiResponse(res);
      return {
        customer: {
          firstName: userData?.firstName || "",
          lastName: userData?.lastName || "",
          email: userData?.email || "",
          phoneNumber: userData?.phone || "",
        },
        delivery: {
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
        },
      };
    },
  });

  const {
    register,
    control,
    formState: { errors },
  } = form;

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
                orderSummary: { ...orderSummary, customerData, shippingMethod },
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
    if (shippingMethod === "home_delivery") {
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
          <p> 3 Sunday Street</p>
          <p>off Shipeolu Street, Shomolu,</p>
          <p>Lagos,Nigeria</p>
          <p className="mt-2">
            <span className="font-semibold ">
              <a href="tel:+2348089017544">Phone: 08089017544</a>
            </span>
          </p>
          <p>
            <span>Monday - Friday :</span>
            <span className="font-medium">8:30 AM - 8:00 PM</span> <br />
            <span>Saturday : </span>
            <span className="font-medium">8:30 AM - 8:30 PM</span>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const AddressFields = () => (
    <div className="space-y-4">
      <form noValidate>
        <div className="mb-3">
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
          <p className="text-red-500 text-xs">
            {errors?.delivery?.addressLine1?.message}
          </p>
        </div>
        <div className="mb-3">
          <label className="block mb-1">Address Line 2</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            {...register("delivery.addressLine2")}
          />
          <p className="text-red-500 text-xs">
            {errors?.delivery?.addressLine2?.message}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 mb-3">
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
            <p className="text-red-500 text-xs">
              {errors?.delivery?.city?.message}
            </p>
          </div>
          <div className="flex-1 mb-3">
            <label className="block mb-1">State</label>
            <select
              className="w-full border rounded p-2"
              {...register("delivery.state", {
                required: {
                  value: requiredChecker(),
                  message: "This field is required",
                },
                onChange: (e) => setSelectedState(e.target.value),
              })}
            >
              {states.map((state) => (
                <option key={state.name} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
            <p className="text-red-500 text-xs">
              {errors?.delivery?.state?.message}
            </p>
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
          <div className="flex-1 mb-3">
            <label className="block mb-1">First Name</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              {...register("customer.firstName", {
                required: "First name is required",
              })}
            />
            <p className="text-red-500 text-xs">
              {errors?.customer?.firstName?.message}
            </p>
          </div>
          <div className="flex-1 mb-3">
            <label className="block mb-1">Last Name</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              {...register("customer.lastName", {
                required: "Last name is required",
              })}
            />
            <p className="text-red-500 text-xs">
              {errors?.customer?.lastName?.message}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 mb-3">
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
            <p className="text-red-500 text-xs">
              {errors?.customer?.email?.message}
            </p>
          </div>
          <div className="flex-1 mb-3">
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
            <p className="text-red-500 text-xs">
              {errors?.customer?.phoneNumber?.message}
            </p>
          </div>
        </div>
      </form>

      <h2 className="text-xl font-semibold mt-8">Shipping Information</h2>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <button
          className={`flex items-center justify-center px-4 py-3 border rounded ${
            shippingMethod === "home_delivery"
              ? "bg-red-100 border-red-300"
              : "bg-white"
          }`}
          onClick={() => {
            setShippingMethod("home_delivery");
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
            shippingMethod === "self_pickup"
              ? "bg-blue-100 border-blue-300"
              : "bg-white"
          }`}
          onClick={() => {
            setShippingMethod("self_pickup");
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
      {shippingMethod === "home_delivery" ? (
        <AddressFields />
      ) : (
        <CompanyDetails />
      )}
    </div>
  );

  const OrderSummary = () => {
    const selectedStateObj = states.find(
      (state) => state.name === selectedState
    );
    const shippingAmount = selectedStateObj
      ? selectedStateObj.shippingAmount
      : 0;

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
            <span>₦{shippingAmount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>
              ₦{(orderSummary?.total + shippingAmount).toLocaleString()}
            </span>
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