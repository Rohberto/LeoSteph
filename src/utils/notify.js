import { toast } from "react-toastify";

const notify = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  info: (message) => toast.info(message),
  warning: (message) => toast.warn(message),
};

export default notify;
