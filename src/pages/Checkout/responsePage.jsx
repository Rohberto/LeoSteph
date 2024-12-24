
function OrderSuccess() {
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
