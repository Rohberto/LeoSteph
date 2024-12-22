/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { Mail, ArrowRight, Instagram, Facebook, MapPin } from "lucide-react";
import { logo, construct } from "../../constant/images";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Email submitted:", email);
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error("Error submitting email:", error);
    }
  };

  return (
    <div className="relative bg-[#345635] flex items-center justify-center min-h-screen text-center px-2 xs:px-4 py-4 xs:py-8">
      <div className="absolute top-2 xs:top-0 sm:top-5 left-2 xs:left-32 sm:left-5 z-10">
        <img
          src={logo}
          alt="Logo"
          className="w-24 xs:w-28 sm:w-32 md:w-40 h-auto"
          loading="lazy"
        />
      </div>

      <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 w-full max-w-xs">
        <img
          src={construct}
          alt="Coming Soon"
          className="w-full h-64 xs:h-72 sm:h-80 md:h-96 object-contain"
        />
      </div>

      <div className="container mx-auto max-w-3xl">
        <div className="mt-72 xs:mt-80 sm:mt-88 md:mt-96 flex flex-col items-center space-y-4 sm:space-y-6">
          <h1 className="text-base xs:text-lg md:text-xl text-[#E8E4E0] mb-2 sm:mb-3 px-2 xs:px-4 max-w-2xl">
            Our e-commerce platform is under construction, but our presses are
            warming up for you. We're crafting a revolutionary printing
            experience that combines cutting-edge technology with creative
            branding solutions. Get ready for premium quality prints, innovative
            designs, and exceptional service.
          </h1>

          <p className="text-[#D8BE75] text-base xs:text-lg">
            Be the first to know when we launch.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col  md:flex-row gap-3 sm:gap-4 w-full xs:w-5/6 sm:w-4/6 md:w-3/6 max-w-md mx-auto mb-6 sm:mb-8 px-4 xs:px-0"
          >
            <div className="flex-grow relative">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#345635] w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-white border border-[#345635] rounded-lg focus:ring-2 focus:ring-[#D8BE75] focus:border-transparent transition-all duration-300 text-[#0D2B1D] text-sm sm:text-base"
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto bg-[#345635] text-[#E8E4E0] px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-[#D8BE75] hover:text-[#0D2B1D] transition-all duration-300 flex items-center justify-center whitespace-nowrap text-sm sm:text-base"
            >
              {isSubmitted ? "Thanks!" : "Notify Me"}
              {!isSubmitted && (
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </form>

          <div className="flex space-x-4 sm:space-x-6 mt-2 sm:mt-4">
            <a
              href="https://www.instagram.com/leosteph_prints_brands"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D8BE75] hover:text-[#E8E4E0] transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://www.facebook.com/Leostephgraphix"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D8BE75] hover:text-[#E8E4E0] transition-colors duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://maps.app.goo.gl/yK85XWxoLCi31S9t6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D8BE75] hover:text-[#E8E4E0] transition-colors duration-300"
              aria-label="Location"
            >
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
