/* eslint-disable react/prop-types */
import AdminName from "./AdminName";
import Extras from "./Extras";
import SearchBar from "./SearchBar";

const AdminHeader = ({ data }) => {
  return (
    <div className="w-full grid grid-cols-10 bg-white rounded-md p-2 items-center">
      <div className="col-span-2">
        <AdminName data={data} />
      </div>

      <div className="col-span-5">
        <SearchBar />
      </div>

      <div className="col-span-3 flex justify-end">
        <Extras />
      </div>
    </div>
  );
};

export default AdminHeader;