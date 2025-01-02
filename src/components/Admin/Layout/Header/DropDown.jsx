import { dropdowns } from "./data";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react/dist/iconify.js";

const Wrapper = ({ name, icon, fn }) => {
  return (
    <div
      onClick={fn}
      className="flex flex-row gap-x-2 items-center py-2 px-3 active:bg-gray-200 bg:text-white"
    >
      <div className="">
        <Icon icon={icon} width={16} />
      </div>
      <div className="text-black">{name}</div>
    </div>
  );
};

Wrapper.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  fn: PropTypes.func,
};

const DropDown = () => {
  const renderDropDown = () => {
    return dropdowns.map((d) => <Wrapper {...d} key={d.name} />);
  };

  return (
    <div className="w-full flex flex-col gap-y-2 bg-transdashboard rounded-b-md py-1  font-Roobert changeFontSpacing">
      {renderDropDown()}
    </div>
  );
};

export default DropDown;
