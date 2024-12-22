/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from "react";

import { X } from "lucide-react";

const SearchModal = ({ isOpen, onClose, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const products = [
    "Laptop",
    "Smartphone",
    "Headphones",
    "Backpack",
    "Shoes",
    "T-shirt",
    "Watch",
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      const filteredResults = products.filter((product) =>
        product.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleResultSelect = (result) => {
    onSearch(result);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white  w-1/3 xs:w-full max-w-md mx-4 rounded-lg shadow-lg">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Search</h2>
            <button onClick={onClose} className="p-1">
              <X className="w-6 h-6" />
            </button>
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            autoFocus
          />
          {searchResults.length > 0 && (
            <ul className="mt-2 border-t">
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleResultSelect(result)}
                >
                  {result}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
