import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import get from "../services/Admin/get";
import Loading from "../components/Admin/Misc/Loading";
import notify from "../utils/notify";
import { useQuery } from "@tanstack/react-query";

const WithAdmin = (Component) => {
  const WrappedComponent = (props) => {
    const { data, isLoading, error } = useQuery({
      queryKey: ["me"],
      queryFn: get.getMe,
    });
    const navigate = useNavigate();

    useEffect(() => {
      if (isLoading) return;

      if (error) {
        notify.error("Error fetching your data");
        navigate("/admin/login");
        return;
      }

      if (!data?.user?.roles?.includes("admin")) {
        notify.error("You don't have permission to access this page");
        navigate("/admin/login");
        return;
      }
    }, [error, navigate, isLoading, data?.user?.roles]);

    if (isLoading) return <Loading />;

    if (!data?.user?.roles?.includes("admin")) {
      return null;
    }

    return <Component {...props} {...data} />;
  };

  return <WrappedComponent />;
};

export default WithAdmin;
