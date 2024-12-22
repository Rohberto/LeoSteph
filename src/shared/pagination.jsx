/* eslint-disable react/prop-types */

import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronsLeft,
  FaChevronsRight,
} from "react-icons/fa";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  showFirstLast = true,
  showPrevNext = true,
  pageRangeDisplayed = 3,
  itemsPerPage = 10,
  totalItems,
}) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const leftOffset = Math.floor(pageRangeDisplayed / 2);
    let start = Math.max(1, currentPage - leftOffset);
    let end = Math.min(totalPages, start + pageRangeDisplayed - 1);

    if (end - start + 1 < pageRangeDisplayed) {
      start = Math.max(1, end - pageRangeDisplayed + 1);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageButton = (page, label = page) => (
    <button
      key={page}
      onClick={() => handlePageChange(page)}
      className={`px-3 py-1 mx-1 rounded ${
        currentPage === page
          ? "bg-blue-500 text-white"
          : "bg-white text-blue-500 hover:bg-blue-100"
      } border border-blue-500 transition-colors duration-300`}
      disabled={currentPage === page}
    >
      {label}
    </button>
  );

  return (
    <div className={`flex items-center justify-center mt-4 ${className}`}>
      {showFirstLast && (
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="p-1 mx-1 rounded bg-white text-blue-500 hover:bg-blue-100 border border-blue-500 transition-colors duration-300 disabled:opacity-50"
        >
          <FaChevronsLeft size={20} />
        </button>
      )}
      {showPrevNext && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1 mx-1 rounded bg-white text-blue-500 hover:bg-blue-100 border border-blue-500 transition-colors duration-300 disabled:opacity-50"
        >
          <FaChevronLeft size={20} />
        </button>
      )}
      {getPageNumbers().map((page) => renderPageButton(page))}
      {showPrevNext && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1 mx-1 rounded bg-white text-blue-500 hover:bg-blue-100 border border-blue-500 transition-colors duration-300 disabled:opacity-50"
        >
          <FaChevronRight size={20} />
        </button>
      )}
      {showFirstLast && (
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-1 mx-1 rounded bg-white text-blue-500 hover:bg-blue-100 border border-blue-500 transition-colors duration-300 disabled:opacity-50"
        >
          <FaChevronsRight size={20} />
        </button>
      )}
      {totalItems && (
        <span className="ml-4 text-sm text-gray-600">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} -{" "}
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
          items
        </span>
      )}
    </div>
  );
};

export default Pagination;
