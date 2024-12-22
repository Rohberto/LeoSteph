/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react/dist/iconify.js";

const GoBack = ({ title, style }) => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div
      onClick={goBack}
      className={`w-[11rem] flex  text-black p-2 rounded-md items-center gap-x-2 bg-gray-100 ${style}`}
    >
      <div className="">
        <Icon icon="ion:return-up-back-outline" width={24} />
      </div>
      <div className="">{title}</div>
    </div>
  );
};

export default GoBack;
