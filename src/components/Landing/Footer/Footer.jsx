/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CreditCard,
  Facebook,
  Headphones,
  Instagram,
  Linkedin,
  RefreshCcw,
  Truck,
  Twitter,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { logo } from "../../../constant/images/index";

const FooterSection = ({ title, children, mobileCollapsible = true }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-3">
      {title && (
        <div
          className={`flex justify-between items-center ${
            mobileCollapsible ? "cursor-pointer md:cursor-default" : ""
          }`}
          onClick={() => mobileCollapsible && setIsOpen(!isOpen)}
        >
          <h3 className="font-semibold text-lg">{title}</h3>
          {mobileCollapsible && (
            <ChevronDown
              className={`w-5 h-5 transition-transform md:hidden ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </div>
      )}
      <div
        className={`${
          mobileCollapsible && !isOpen ? "hidden md:block" : "block"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };

  const services = [
    {
      icon: <Truck />,
      title: "Fast Delivery",
      description: "Orders are processed fast ",
    },
    {
      icon: <RefreshCcw />,
      title: "14 Days Return",
      description: "Quality guarantee",
    },
    {
      icon: <CreditCard />,
      title: "Secure Payment",
      description: "100% Protected",
    },
    {
      icon: <Headphones />,
      title: "24/7 Support",
      description: "Ready to help",
    },
  ];

  const quickLinks = [
    { text: "My Account", path: "/my-account" },
    { text: "Cart", path: "/cart" },
    { text: "Wishlist", path: "/wishlist" },
    { text: "Shop", path: "/shop" },
  ];

  const legalLinks = [
    { text: "Privacy Policy", path: "/privacy-policy" },
    { text: "Terms of Use", path: "/terms-of-use" },
    { text: "FAQ", path: "/faq" },
    { text: "Contact", path: "/contact" },
  ];

  const socialIcons = [
    { Icon: Facebook, label: "Facebook" },
    { Icon: Twitter, label: "Twitter" },
    { Icon: Instagram, label: "Instagram" },
    { Icon: Linkedin, label: "LinkedIn" },
  ];

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      text: " 3 Sunday Street, off Shipeolu Street, Somolu, Lagos 234001, Lagos",
      href: null,
    },
    {
      icon: <Mail className="w-5 h-5" />,
      text: "leosteph@gmail.com",
      href: "mailto:leosteph@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      text: "080808080808080",
      href: "tel:080808080808080",
    },
  ];

  return (
    <footer className="font-Roobert changefontspacing">
      {/* Services Grid */}
      <div className="max-container border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="bg-gray-100 p-3 rounded-full text-[#0D2B1D] shrink-0">
                  {service.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-[#0D2B1D] text-white">
        <div className="max-container max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {/* Company Info - Wider Column */}
            <div className="lg:col-span-4 space-y-6 mr-6">
              <Link to="/" className="flex items-center ">
                <img src={logo} alt="Logo" className="rounded h-20" />
              </Link>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-gray-400"
                  >
                    <span className="text-red-500 mt-1">{item.icon}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm hover:text-red-500 transition-colors"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-sm">{item.text}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                {socialIcons.map(({ Icon, label, url }, index) => (
                  <a
                    key={index}
                    href={url}
                    className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <FooterSection title="Quick Links">
                <ul className="space-y-3 text-gray-400">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="text-sm hover:text-red-500 transition-colors"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </FooterSection>
            </div>

            {/* Legal Links */}
            <div className="lg:col-span-2">
              <FooterSection title="Information">
                <ul className="space-y-3 text-gray-400">
                  {legalLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.path}
                        className="text-sm hover:text-red-500 transition-colors"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </FooterSection>
            </div>

            {/* Newsletter Subscribe */}
            <div className="lg:col-span-4">
              <FooterSection title="Get Updates">
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-transparent border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500 pr-10"
                      required
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-red-500 hover:text-red-600 focus:outline-none"
                      aria-label="Subscribe"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Subscribe to get special offers and updates
                  </p>
                </form>
              </FooterSection>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <p className="text-center text-sm text-gray-400">
              © {new Date().getFullYear()} LeoSteph. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
