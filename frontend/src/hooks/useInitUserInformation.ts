import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkoutAddressAction } from "../actions/checkoutActions";
import { getActiveOrder } from "../actions/orderActions";
import { getUser } from "../actions/userActions";

const useInitUserInformation = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => {
    return state.userLogin;
  });

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      dispatch(getActiveOrder());
      dispatch(getUser());
      dispatch(checkoutAddressAction("sssss"));
    }
  }, [dispatch, user]);
};

export default useInitUserInformation;
