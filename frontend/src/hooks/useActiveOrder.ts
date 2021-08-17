import { useSelector } from "react-redux";

const useActiveOrder = () => {
  const activeOrder = useSelector((state: any) => {
    return state.activeOrder;
  });
  const { order, error } = activeOrder;

  return { order, error };
};

export default useActiveOrder;
