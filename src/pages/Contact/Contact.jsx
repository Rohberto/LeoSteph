/* eslint-disable react/no-unescaped-entities */
import { HelmetProvider, Helmet } from "react-helmet-async";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { BsClock } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaGoogle } from "react-icons/fa";

const ContactUs = () => {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        {/* SEO Metadata */}
        <Helmet>
          <title>Contact Us - LeoSteph Prints</title>
          <meta
            name="description"
            content="Get in touch with      LeoSteph Prints. Visit our office, check out our business hours, connect with us on social media, and find our location easily on Google Maps."
          />
          <meta
            name="keywords"
            content="     LeoSteph Prints, Contact Us, Printing, Branding, Lagos, Google Profile"
          />
        </Helmet>

        <header className="bg-midnightBlue text-white py-6 text-center">
          <h1 className="text-3xl lg:text-4xl font-bold font-MetrischBold changeFontSpacing">Contact Us</h1>
          <p className="text-sm mt-2 font-Roobert changeFontSpacing">We'd love to hear from you!</p>
        </header>

        <main className="container mx-auto px-4 py-8 grid gap-8 lg:grid-cols-2 font-Roobert changeFontSpacing">
          {/* Map Section */}
          <div className="bg-white rounded-lg shadow p-4 lg:col-span-1">
            <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509489!2d3.3684089!3d6.5390982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8dbb387563eb%3A0xf235a2873f704d97!2sDe%20Rigo%20Enterprises!5e0!3m2!1sen!2sng!4v1681254777591!5m2!1sen!2sng"
              title="Google Map"
              className="w-full h-96 rounded-lg"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          {/* Information Section */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Company Info Card */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-oliveGreen text-2xl mb-4" />
                Company Information
              </h2>
              <p className="font-bold text-lg mb-5 mt"> LeoSteph Prints</p>
              <p>
                3 Sunday St, off Shipeolu Street, Somolu, Lagos 234001, Lagos
              </p>
            </div>

            {/* Business Hours Card */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BsClock className="text-oliveGreen text-2xl" />
                Business Hours
              </h2>
              <ul className="text-sm space-y-6">
                <li className="font-serif">
                  Monday - Friday: 8:30 AM - 8:00 PM
                </li>
                <li>Saturday: 8:30 AM - 8:30 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>

            {/* Contact Info Card */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold mb-4">
                Contact Information
              </h2>
              <ul className="space-y-5">
                <li className="flex items-center gap-2">
                  <FaPhoneAlt className="text-oliveGreen text-xl" />
                  <a
                    href="tel:+2348001234567"
                    className="text-forestGreen hover:underline"
                  >
                    08021268687
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <FaEnvelope className="text-oliveGreen text-xl" />
                  <a
                    href="mailto:info@derigo.com"
                    className="text-forestGreen hover:underline"
                  >
                    info@derigo.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links Card */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
              <ul className="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-5">
                <li className="flex items-center gap-2">
                  <FaInstagram className="text-pink-600 text-xl" />
                  <a
                    href="https://www.instagram.com/leosteph_graphix_prints"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forestGreen hover:underline"
                  >
                    LeoSteph Prints
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <FaFacebook className="text-blue-600 text-xl" />
                  <a
                    href="https://www.facebook.com/Leostephgraphix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forestGreen hover:underline"
                  >
                    LeoSteph Prints
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <FaGoogle className="text-red-600 text-xl" />
                  <a
                    href="https://www.google.com/maps/place/De+Rigo+Enterprises/@6.5390982,3.3684089"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forestGreen hover:underline"
                  >
                    LeoSteph Prints
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </HelmetProvider>
  );
};

export default ContactUs;
