const AdminFooter = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-center mb-4">
          {/* Branding or Logo */}
          <div className="flex items-center space-x-4">
            <img src="/logo.svg" alt="Admin Logo" className="w-12 h-12" />
            <span className="text-lg font-semibold">Admin Dashboard</span>
          </div>

          {/* Quick Links */}
          <div className="flex space-x-6 text-sm">
            <a
              href="/about"
              className="hover:underline hover:text-gray-400 transition"
            >
              About Us
            </a>
            <a
              href="/contact"
              className="hover:underline hover:text-gray-400 transition"
            >
              Contact
            </a>
            <a
              href="/faq"
              className="hover:underline hover:text-gray-400 transition"
            >
              FAQs
            </a>
            <a
              href="/support"
              className="hover:underline hover:text-gray-400 transition"
            >
              Support
            </a>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex flex-wrap justify-between items-center border-t border-gray-700 pt-4">
          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.892-4.787 4.656-4.787 1.324 0 2.462.098 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.311h3.588l-.467 3.622h-3.12V24h6.116c.731 0 1.324-.593 1.324-1.324V1.325C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557a9.828 9.828 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 3.3a9.864 9.864 0 0 1-3.127 1.184 4.916 4.916 0 0 0-8.373 4.482A13.944 13.944 0 0 1 1.67 3.149a4.91 4.91 0 0 0 1.523 6.564A4.886 4.886 0 0 1 .964 9.6v.062a4.917 4.917 0 0 0 3.946 4.827 4.902 4.902 0 0 1-2.213.084 4.92 4.92 0 0 0 4.6 3.42A9.869 9.869 0 0 1 0 21.538a13.93 13.93 0 0 0 7.548 2.211c9.057 0 14.009-7.514 14.009-14.008 0-.213-.004-.425-.014-.636A10.01 10.01 0 0 0 24 4.557z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.23 0H1.77C.79 0 0 .774 0 1.727V22.27C0 23.226.79 24 1.77 24h20.46c.98 0 1.77-.774 1.77-1.727V1.727C24 .774 23.21 0 22.23 0zM7.12 20.452H3.554V9.546H7.12v10.906zM5.337 7.986a2.077 2.077 0 1 1 0-4.155 2.077 2.077 0 0 1 0 4.155zM20.452 20.452h-3.563v-5.75c0-1.377-.027-3.149-1.922-3.149-1.922 0-2.218 1.502-2.218 3.054v5.845h-3.563V9.546h3.42v1.492h.05c.477-.901 1.64-1.853 3.372-1.853 3.606 0 4.27 2.372 4.27 5.455v5.812z" />
              </svg>
            </a>
          </div>

          {/* Copyright Section */}
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Admin Dashboard. All Rights
            Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
