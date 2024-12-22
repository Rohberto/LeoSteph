import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const useField = ({
  type,
  isArray,
  name,
  label,
  isRequired = false,
  min,
  max,
  styles = "",
  update = "",
}) => {
  const [value, setValue] = useState("");
  const [splittedValues, setSplittedValues] = useState([]);
  const [errMsg, setErrMsg] = useState("");

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

  useEffect(() => {
    if (update) {
      if (isArray) {
        const joined = update.join(",");
        setValue(joined);
      } else {
        setValue(update);
      }
    }
  }, [update, isArray]);

  return {
    value: isArray & !update ? splittedValues : value,
    onChange,
    onBlur,
    errMsg,
    type,
    name,
    label,
    reset,
    required: isRequired,
    styles,
  };
};

const propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  styles: PropTypes.string,
  update: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  isRequired: PropTypes.bool,
  isArray: PropTypes.bool,
};

useField.propTypes = propTypes;

export default useField;
