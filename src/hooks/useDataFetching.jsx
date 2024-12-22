import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDataFetching = (options) => {
  let { key, fn, select, ...rest } = options;

  return useQuery({
    ...rest,
    queryKey: key || ["defaultKey"],
    queryFn: async () => {
      const response = await fn();
      if (response?.error) {
        toast.error("Something went wrong");
        return;
      }

      return response;
    },
    select: select ? (data) => select(data) : undefined,
  });
};

export default useDataFetching;
