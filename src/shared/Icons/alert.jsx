/* eslint-disable react/prop-types */

const Alert = ({ children }) => (
  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
    {children}
  </div>
);

export default Alert;
