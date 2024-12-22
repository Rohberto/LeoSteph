import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { verifyPayment } from "../../services/payment";

function OrderSuccess() {
  const location = useLocation();
  const { orderSummary } = location.state;
  const [verificationStatus, setVerificationStatus] = useState(null); // null, 'success', or 'failure'

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const reference = queryParams.get("reference");

    if (reference && orderSummary) {
      console.log(orderSummary);
      verifyPayment({ reference })
        .then((response) => {
          console.log("Payment verification successful:", response);
          if (response) {
            if (
              response.data.status === "success" &&
              response.data.amount / 100 === orderSummary.total
            )
              setVerificationStatus("success");
            else setVerificationStatus("failure");
          }
        })
        .catch((error) => {
          console.error("Payment verification failed:", error);
          setVerificationStatus("failure");
        });
    } else {
      console.error("No transaction reference provided for verification.");
      setVerificationStatus("failure");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (verificationStatus === null) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <p className="text-gray-600">Verifying payment...</p>
      </div>
    );
  }

  if (verificationStatus === "failure") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-500">
          Payment verification failed. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto flex items-center justify-center rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.707-5.293a1 1 0 011.414 0L13 10.414l1.293 1.293a1 1 0 101.414-1.414l-2-2a1 1 0 00-1.414 0L9 11.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2z"
              clipRule="evenodd"
            />
          </svg>
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

/*
    1. The response in the useEffect contains all the detaials about the transaction.
    2. The order Summary contains the information about the amounts break down.
*/
