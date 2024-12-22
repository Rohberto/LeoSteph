/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import del from "../../../../services/Admin/del";
import notify from "../../../../utils/notify";
import catchErrors from "../../../../utils/catchErrors";

const Actions = ({ id }) => {
  const navigate = useNavigate();

  const deleteProduct = async () => {
    try {
      const res = await del.deleteProduct(id);
      notify.success(res.message);
      setTimeout(() => {
        navigate(`/admin?view=products`);
      }, 2000);
    } catch (error) {
      const msg = catchErrors(error);
      notify.error(msg);
    }
  };

  return (
    <div className=" bg-gray-100 min-w-[10rem] py-2 rounded-md rounded-tr-[4rem]">
      <div className="font-medium mb-2 p-2">Actions</div>
      <div className="flex items-center cursor-pointer gap-2 active:bg-gray-800 active:text-white  hover:underline p-1 px-2">
        <div className="">
          <Icon icon="line-md:edit-twotone" width={24} />
        </div>
        <div
          onClick={() => navigate(`/admin?action=edit-product&id=${id}`)}
          className="text-xl"
        >
          edit
        </div>
      </div>
      <div className="flex items-center cursor-pointer gap-2 active:bg-gray-800 active:text-white  hover:underline p-1 px-2">
        <Icon icon="mdi:delete-off-outline" width={24} />
        <div onClick={deleteProduct} className="text-xl">
          delete
        </div>
      </div>
    </div>
  );
};

export default Actions;
