import { Icon } from "@iconify/react/dist/iconify.js";

const Tab = (tab) => {
  const active = tab.active;
  const click = () => tab.click(tab);

  return (
    <div
      className={`flex items-center gap-x-2 sm:gap-x-3 p-2 rounded-lg transition-colors hover:bg-gray-100 cursor-pointer ${
        active ? "text-cyan-700 font-semibold" : "text-gray-700"
      }`}
      onClick={click}
    >
      <div className="relative">
        {active && (
          <div className="h-5 sm:h-6 w-1.5 sm:w-2 absolute -top-2 sm:-top-3 -left-2 sm:-left-3 rounded-full bg-cyan-700" />
        )}
      </div>
      <div className="flex items-center justify-center">
        <Icon icon={tab.icon} className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <div className="text-base sm:text-lg md:text-xl">{tab.name}</div>
    </div>
  );
};

export default Tab;
