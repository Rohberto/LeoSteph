import PropTypes from "prop-types";
import { Icon } from "@iconify/react/dist/iconify.js";

const PasswordField = ({ errMsg, helperText, toggler, state, ...props }) => {
  const field = (
    <input
      className="appearance-none block focus:-translate-y-1 focus:-translate-x-1 transition-all duration-75  focus:scale-[1.0] w-full bg-white text-gray-700 border border-gray-600 rounded-lg py-3 px-4 mb-3"
      id={props.name}
      onChange={props.onChange}
      onBlur={props.onBlur}
      placeholder="********"
      {...props}
    />
  );
  const icon = !state ? (
    <Icon icon="lets-icons:view-hide-light" width={24} />
  ) : (
    <Icon icon="bx:show-alt" width={24} />
  );

  return (
    <div className="flex flex-col gap-y-2">
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block cursor-pointer text-gray-700 text-sm font-bold mb-2"
        >
          Password
        </label>
        <div className="relative flex flex-col">
          {field}
          <div
            className="absolute right-2 cursor-pointer top-[20%]"
            onClick={toggler}
          >
            {icon}
          </div>
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
  name: PropTypes.string,
  errMsg: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  toggler: PropTypes.func,
  state: PropTypes.bool,
};

PasswordField.propTypes = props;
export default PasswordField;
