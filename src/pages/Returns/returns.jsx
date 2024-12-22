import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-8 font-Roobert changeFontSpacing">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Return Policy
        </h1>
        <div className="space-y-6">
          <p className="text-gray-600">
            At <span className="font-semibold">LeoSteph Printing Services</span>, 
            we take great pride in delivering top-notch printing services to our customers in Lagos, Nigeria. 
            However, we understand that certain issues may arise, and we are committed to ensuring a fair 
            and transparent return policy. Please review the following terms and conditions regarding returns 
            and refunds.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              1. Eligibility for Returns
            </h2>
            <p className="text-gray-600">
              Returns or reprints are only eligible under the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-1">
              <li>Products received are damaged or defective.</li>
              <li>Incorrect product or print specifications delivered (e.g., wrong size, color, or design).</li>
              <li>Errors in printing that deviate from the approved design provided by the customer.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              2. Conditions for Returns
            </h2>
            <p className="text-gray-600">
              To process a return, the following conditions must be met:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-1">
              <li>Products must be returned within 7 days of delivery.</li>
              <li>Original packaging and proof of purchase must be provided.</li>
              <li>Products must not show signs of misuse or intentional damage.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              3. Non-Refundable Services
            </h2>
            <p className="text-gray-600">
              Certain services and products are non-refundable, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-1">
              <li>Design fees and customization services.</li>
              <li>Errors due to incorrect information or designs submitted by the customer.</li>
              <li>Products that were approved for printing but have minor color variations due to printing limitations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              4. Refunds and Reprints
            </h2>
            <p className="text-gray-600">
              If your return request is approved, we offer the following options:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-1">
              <li>A reprint of the original order at no extra cost.</li>
              <li>A full or partial refund, depending on the nature of the issue.</li>
              <li>Store credit for future orders.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              5. How to Initiate a Return
            </h2>
            <p className="text-gray-600">
              To initiate a return or reprint, please contact our customer service team via:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-1">
              <li>Email: <span className="font-medium">leosteph@gmail.com</span></li>
              <li>Phone: <span className="font-medium">+234 800 123 4567</span></li>
              <li>Visit our office at <span className="font-medium">123 Printing Avenue, Lagos, Nigeria.</span></li>
            </ul>
          </div>

          <p className="text-gray-600">
            Thank you for trusting us with your printing needs. We value your satisfaction and will do our best 
            to address your concerns promptly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
