/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchModal = ({ isOpen, onClose, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

const {products} = useContext(DataContext);
const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      const filteredResults = products.filter((product) =>
        product.category.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleResultSelect = (product) => {
    navigate(`/shop/${product.name}`, { state: { product } });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white w-1/3 xs:w-full lg:w-1/2 max-w-md mx-4 rounded-lg shadow-lg">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Search</h2>
            <button onClick={onClose} className="p-1">
              <X className="w-6 h-6" />
            </button>
          </div>
          <input
            type="text"
            placeholder="Search For Banners, Flyers ..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            autoFocus
          />
          {searchResults.length > 0 && (
            <ul className="mt-2 border-t max-h-[300px] overflow-y-auto">
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleResultSelect(result)}
                >
                  <div className="search_results">
                    <div className="result_text">
                      <h2 className="result_text_name">{result.name}</h2>
                    <p className="result_category">{result.category.name}</p>
                    </div>
                    <div className="search_result_image">
                      <img src={result.images[0]} alt="graphical illustration of images" />
                    </div>
                  </div>
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
