import { Icon } from "@iconify/react/dist/iconify.js";

const Loading = () => {
  return (
    <div className="flex min-h-96 w-full flex-col items-center justify-center gap-y-1">
      <div className="text-gray-700">
        <Icon icon="line-md:loading-twotone-loop" width={48} />
      </div>
      <div className="text-2xl font-medium text-center">fetching data...</div>
    </div>
  );
};

export default Loading;
