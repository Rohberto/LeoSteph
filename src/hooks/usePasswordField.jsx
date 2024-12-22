import PropTypes from "prop-types";
import { useState } from "react";

const usePasswordField = ({
  isArray,
  name,
  label,
  isRequired = false,
  min,
  max,
}) => {
  const [value, setValue] = useState("");
  const [splittedValues, setSplittedValues] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [isPwdOpen, setIsPwdOpen] = useState(false);

  const onChange = (e) => {
    const input = e.target.value;
    const splitted = input.split(",").map((val) => val.trim());
    setValue(input);
    setSplittedValues(splitted);
  };

  const onBlur = (e) => {
    const input = e.target.value;

    if (isRequired) {
      if (!input.trim()) {
        setErrMsg(`${label} is required.`);
      } else if (min > 0 && input.length < min) {
        setErrMsg(`${label} must be at least ${min} characters long.`);
      } else if (max < Infinity && input.length > max) {
        setErrMsg(`${label} must be no more than ${max} characters long.`);
      } else setErrMsg("");
    } else if (isArray) {
      if (!input.includes(",")) {
        setErrMsg(`${label} should contain commas.`);
      } else {
        setErrMsg("");
      }
    }
  };

  const reset = () => {
    setValue("");
    setSplittedValues([]);
    setErrMsg("");
  };

  const togglePasswordVisibility = () => {
    setIsPwdOpen(!isPwdOpen);
  };

  return {
    value: isArray ? splittedValues : value,
    onChange,
    onBlur,
    errMsg,
    name,
    label,
    reset,
    required: true,
    toggler: togglePasswordVisibility,
    state: isPwdOpen,
    type: isPwdOpen ? "text" : "password",
  };
};

const propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  isRequired: PropTypes.bool,
  isArray: PropTypes.bool,
};

usePasswordField.propTypes = propTypes;

export default usePasswordField;
