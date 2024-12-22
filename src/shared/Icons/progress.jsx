/* eslint-disable react/prop-types */

const ProgressBar = ({ value }) => (
  <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
    <div
      className="bg-blue-500 h-1 rounded-full transition-all duration-300"
      style={{ width: `${value}%` }}
    />
  </div>
);

export default ProgressBar;
