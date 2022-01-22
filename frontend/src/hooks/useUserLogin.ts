import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/userActions";

const useUserLogin = () => {
  const dispatch = useDispatch();
  const { user, error, authenticated } = useSelector((state: any) => {
    return state.userLogin;
  });
  const { invalidSession } = useSelector((state: any) => {
    return state.session;
  });

  if (invalidSession) {
    dispatch(logoutUser());
  }

  return { user, error, authenticated };
};

export default useUserLogin;
