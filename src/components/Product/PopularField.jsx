/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const PopularField = ({ getValue, initialValue = {}, reset }) => {
  const [isPopular, setIsPopular] = useState(initialValue); // Use initialValue

  useEffect(() => {
    setIsPopular(initialValue); // Update when initialValue changes
  }, [initialValue]);
  // In PopularField.jsx
  const handleReset = () => {
    // Reset your isPopular state here, e.g., set it to false
    setIsPopular(false);
  };

  // Call handleReset when reset prop is called
  useEffect(() => {
    if (reset) {
      handleReset();
    }
  }, [reset]);

  // Call handleReset when reset prop is called
  useEffect(() => {
    if (reset) {
      handleReset();
    }
  }, [reset]);

  const onChange = (e) => {
    const value = e.target.value;
    const isTrue = "true";
    const isChecked = value === isTrue;
    setIsPopular(isChecked); // Update local state
    getValue(isChecked);
  };

  return (
    <div className="w-full my-4 mb-8">
      <label htmlFor="yes" className="cursor-pointer font-semibold mb-2">
        Mark as popular product ?
      </label>
      <div className="flex flex-row gap-x-10 items-center">
        <div className="flex items-center gap-x-2">
          <input
            checked={isPopular} // Set checked based on isPopular
            value={true}
            onChange={onChange}
            id="yes"
            type="radio"
            name="popular"
          />
          <label className="cursor-pointer" htmlFor="yes">
            Yes
          </label>
        </div>
        <div className="flex items-center gap-x-2">
          <input
            checked={!isPopular} // Set checked based on isPopular
            value={false}
            onChange={onChange}
            id="no"
            type="radio"
            name="popular"
          />
          <label className="cursor-pointer" htmlFor="no">
            No
          </label>
        </div>
      </div>
    </div>
  );
};

const props = {
  getValue: PropTypes.func,
};

PopularField.propTypes = props;

export default PopularField;
