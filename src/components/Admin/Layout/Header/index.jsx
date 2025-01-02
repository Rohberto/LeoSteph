/* eslint-disable react/prop-types */
import AdminName from "./AdminName";
import Extras from "./Extras";
import SearchBar from "./SearchBar";

const AdminHeader = ({ data }) => {
  return (
    <div className="w-full grid grid-cols-10 bg-transparent rounded-md mds:p-2 items-center font-Roobert changeFontSpacing admin_header">
      <div className="col-span-2 text-xs sm:text-base mds:text-xl  text-uppercase">
        <AdminName data={data} />
      </div>

      <div className=" col-span-4 mds:col-span-5">
        <SearchBar />
      </div>

      <div className=" col-span-4 mds:col-span-3 flex justify-end">
        <Extras />
      </div>
    </div>
  );
};

export default AdminHeader;
