/* eslint-disable react/no-unescaped-entities */
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataContext";
import Breadcrumbs from "../../../shared/breadCrumbs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createNewQuote } from "../../../services/quotes";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
const CustomPrintQuote = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [hasDesign, setHasDesign] = useState(true);
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    printDetails: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const {user} = useContext(DataContext);

  //rrrediect if user is not signed in
  useEffect(() => {
    if (!user) {
      navigate('/sign-in', { replace: true });
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullname.trim()) newErrors.fullname = "Fullname is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.printDetails.trim())
      newErrors.printDetails = "Print details are required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => createNewQuote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      toast.success("Quote sent successfully");
      setFormData({
        fullname: "",
        phone: "",
        email: "",
        printDetails: "",
        address: "",
      });
    },
    onError: (e) => {
      toast.error(e.message || "Something went wrong");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const data = {
        details: formData.printDetails,
        deliveryAddress: formData.address,
        design: hasDesign ? "yes" : "no",
      };
      mutate({ data });
    }
  };

  const inputClass =
    "w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors";
  const labelClass = "block text-xl font-medium text-gray-700 mb-1";
  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <>
      <div className="max-container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 font-Roobert changeFontSpacing">
        <Breadcrumbs />
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">
          Get Custom Print Quote Quickly
        </h1>
        <p className="text-gray-600 mb-6">
          Fill the details of your order below.
        </p>

        <div>
          <form onSubmit={handleSubmit} className={`space-y-6  relative`}>
            {isPending && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
                <Loader2
                  className="h-8 w-8 animate-spin text-[#4F772D] 
                  "
                />
              </div>
            )}
            {[
              {
                name: "fullname",
                label: "Full Name",
                type: "text",
                placeholder: "Your first and last names",
              },
              {
                name: "phone",
                label: "Phone number",
                type: "tel",
                placeholder: "Your phone number",
              },
              {
                name: "email",
                label: "Email Address",
                type: "email",
                placeholder: "Your email address",
              },
            ].map((field) => (
              <div
                key={field.name}
                className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start"
              >
                <label htmlFor={field.name} className={labelClass}>
                  {field.label}
                  <p className="text-xs text-gray-500">{field.placeholder}</p>
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className={`${inputClass} ${
                      errors[field.name] ? "border-red-500" : ""
                    }`}
                  />
                  {errors[field.name] && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              </div>
            ))}

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
              <label htmlFor="printDetails" className={labelClass}>
                What would you like to Print?
                <p className="text-xs text-gray-500">
                  Tell us the name and the quantity
                </p>
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="printDetails"
                  name="printDetails"
                  rows="3"
                  placeholder="e.g. 200 Notepads and 500 t-shirts"
                  value={formData.printDetails}
                  onChange={handleInputChange}
                  className={`${inputClass} ${
                    errors.printDetails ? "border-red-500" : ""
                  }`}
                />
                {errors.printDetails && (
                  <p className={errorClass}>{errors.printDetails}</p>
                )}
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center">
              <span className={labelClass}>
                How about the design (Artwork)?
                <p className="text-xs text-gray-500">
                  Let us know if you have the artwork for the print job.
                </p>
              </span>
              <div className="mt-2 sm:mt-0 space-y-2 sm:space-y-0 sm:space-x-4 sm:col-span-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="design"
                    value="yes"
                    checked={hasDesign}
                    onChange={() => setHasDesign(true)}
                  />
                  <span className="ml-2">Yes, I have a design</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="design"
                    value="no"
                    checked={!hasDesign}
                    onChange={() => setHasDesign(false)}
                  />
                  <span className="ml-2">No, I don't have a design</span>
                </label>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
              <label htmlFor="address" className={labelClass}>
                Your Delivery Address
                <p className="text-xs text-gray-500">
                  Kindly give us the full delivery address
                </p>
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  placeholder="Your preferred delivery address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`${inputClass} ${
                    errors.address ? "border-red-500" : ""
                  }`}
                />
                {errors.address && (
                  <p className={errorClass}>{errors.address}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className=" inline-flex justify-end items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#4F772D] hover:[#31572C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
              >
                Submit Request
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {Object.keys(errors).length > 0 && (
          <div
            className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">
              {" "}
              Please correct the errors in the form before submitting.
            </span>
          </div>
        )}
      </div>
    </>
  );
};
export default CustomPrintQuote;
