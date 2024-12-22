import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
const TextField = ({ errMsg, helperText, styles, update, ...props }) => {
  const type = props.type;
  const textType = (
    <input
      className={`appearance-none block w-full bg-white text-gray-700 border border-gray-600 rounded-lg py-3 px-4 mb-3 ${styles}`}
      type={props.type}
      id={props.name}
      onChange={props.onChange}
      onBlur={props.onBlur}
      {...props}
    />
  );

  const bigTextField = (
    <textarea
      className={`resize-none appearance-none block w-full bg-white text-gray-700 border border-gray-600 rounded-lg py-3 px-4 mb-3`}
      rows="4"
      type={props.type}
      id={props.name}
      onChange={props.onChange}
      onBlur={props.onBlur}
      {...props}
    />
  );

  const field = () => {
    switch (type) {
      case "text":
        return textType;
      case "textarea":
        return bigTextField;
      default:
        return textType;
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="mb-4">
        <label
          htmlFor={props.name}
          className="block cursor-pointer text-gray-700 text-sm font-bold mb-2"
        >
          {props.label}
        </label>
        <div className="flex flex-col">
          {field()}
          <div className="">
            <p className="text-xs font-light -mt-3 mb-1 text-black">
              {helperText}
            </p>
            <p className="text-xs -mt-1 text-rose-600">{errMsg}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const props = {
  label: PropTypes.string,
  name: PropTypes.string,
  errMsg: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

TextField.propTypes = props;
export default TextField;
