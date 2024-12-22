import { useSearchParams } from "react-router-dom";

const useBackNav = (view = "") => {
  const [, setParams] = useSearchParams();

  const goBack = () => {
    setParams({ view });
  };
  return goBack;
};

export default useBackNav;
