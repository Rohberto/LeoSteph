import { Icon } from "@iconify/react/dist/iconify.js";
import { PropTypes } from "prop-types";

const Card = ({ name, style, total, data }) => {
  const icon = data.up
    ? { icon: "ant-design:rise-outlined", style: "green" }
    : { icon: "ant-design:fall-outlined", style: "red" };

  return (
    <div
      className={`col-span-3 p-2 flex flex-col rounded-md h-40 bg-gradient-to-r from-neutral-300 to-stone-400 hover:bg-gradient-to-r hover:from-teal-600 hover:to-teal-800 hover:text-gray-200 cursor-pointer ${style}`}
    >
      <div className="font-semibold text-xl">{name}</div>
      <div className="text-4xl flex-1 font-semibold text-black hover:text-white">
        {total}
      </div>
      <div>
        <div className="flex items-center gap-x-1">
          <div className={`${data.up ? "text-green-300" : "text-rose-600"}`}>
            <Icon icon={icon.icon} color={icon.style} width={24} />
          </div>
          <div className="">{data.percentage}% from last month</div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string,
  style: PropTypes.string,
  total: PropTypes.string,
  data: PropTypes.object,
};

export default Card;
