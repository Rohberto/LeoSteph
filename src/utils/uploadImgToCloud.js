import axios from "axios";
import { toast } from "react-toastify";

const uploadImgToCloud = async (file) => {
  const cloud_name = "dryjz5fvt";
  if (typeof file === "string" && file.includes("https://")) return file; // handles already uploaded files
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "di99gv95");
    formData.append("cloud_name", cloud_name);
    formData.append("folder", "ihsan");

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    return response?.data?.secure_url;
  } catch (e) {
    toast.error(e.message);
    throw e;
  }
};

export default uploadImgToCloud;
