import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null); // State to manage which question is open

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the selected FAQ
  };

  const faqs = [
    {
      question: "What types of printing services do you offer?",
      answer:
        "We specialize in all forms of printing, including business cards, brochures, flyers, banners, branded merchandise, packaging, and large-format printing.",
    },
    {
      question: "Where are you located?",
      answer:
        "We are based in Lagos, Nigeria. You can visit us at our office or contact us online for your printing needs.",
    },
    {
      question: "What is the turnaround time for orders?",
      answer:
        "The turnaround time depends on the type of print job. For small jobs like business cards or flyers, it typically takes 2-3 business days. Larger or more complex projects may take 5-7 business days.",
    },
    {
      question: "Do you offer delivery services?",
      answer:
        "Yes, we offer delivery services across Lagos and other parts of Nigeria. Charges may apply depending on your location.",
    },
    {
      question: "Can I get a custom design for my prints?",
      answer:
        "Absolutely! We have a team of experienced graphic designers who can create custom designs tailored to your needs.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept bank transfers, credit/debit cards, and cash payments. Online payment options are also available for convenience.",
    },
    {
      question: "Do you provide bulk discounts?",
      answer:
        "Yes, we offer discounts for bulk orders. Contact us to discuss your specific requirements and get a quote.",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-12 font-Roobert changeFontSpacing">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 focus:outline-none"
              >
                <span>{faq.question}</span>
                <span>
                  {openIndex === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </span>
              </button>
              {openIndex === index && (
                <div className="p-4 bg-gray-50 text-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
