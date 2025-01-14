import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { verifyPayment } from "../../services/payment";
import { createNewOrder } from "../../services/order";
import { getUserData } from "../../services/user";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

function OrderSuccess() {
  const location = useLocation();
  const { orderSummary } = location.state;
  const [verificationStatus, setVerificationStatus] = useState(null);

  useEffect(() => {
    const fetchUserAndVerifyPayment = async () => {
      try {
        const response = await getUserData();
        const currentUserId = response?.user?.id;

        const queryParams = new URLSearchParams(location.search);
        const reference = queryParams.get("reference");

        if (!reference || !orderSummary || !currentUserId) {
          console.error("Missing required data for verification");
          setVerificationStatus("failure");
          return;
        }

        const paymentResponse = await verifyPayment({ reference });

        if (!paymentResponse) {
          setVerificationStatus("failure");
          return;
        }

        const { data } = paymentResponse;
        if (
          data.status === "success" &&
          data.amount / 100 === orderSummary.total
        ) {
          setVerificationStatus("success");
          const orderData = {
            cart: orderSummary.cart_id,
            transaction_reference: reference,
            paymentMethod: data.channel === "card" ? "debit_card" : undefined,
            paymentStatus: data.status === "success" ? "completed" : undefined,
            orderStatus: "pending",
            shipping: orderSummary.shippingMethod,
            address: {
              line_1: orderSummary.customerData.delivery.addressLine1,
              line_2: orderSummary.customerData.delivery.addressLine2,
            },
            city: orderSummary.customerData.delivery.city,
            state: orderSummary.customerData.delivery.state,
            user: currentUserId,
          };
        const response =  await createNewOrder({ data: orderData });
        console.log(response);
      } else {
          setVerificationStatus("failure");
        }
      } catch (error) {
        console.error("Error in payment verification:", error);
        setVerificationStatus("failure");
      }
    };

    fetchUserAndVerifyPayment();
  }, [location.search, orderSummary]);

  if (verificationStatus === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <ImSpinner2 className="animate-spin text-gray-600 text-4xl" />
        <p className="ml-4 text-gray-600">Verifying payment...</p>
      </div>
    );
  }

  if (verificationStatus === "failure") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <FaTimesCircle className="text-red-500 text-4xl" />
        <p className="ml-4 text-red-500">
          Payment verification failed. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto flex items-center justify-center rounded-full bg-green-100">
          <FaCheckCircle className="text-green-500 text-4xl" />
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-gray-800">
          Payment Successful
        </h1>
        <p className="mt-2 text-gray-600">
          Thank you for your order! Your payment has been successfully
          processed.
        </p>
      </div>
    </div>
  );
}

export default OrderSuccess;