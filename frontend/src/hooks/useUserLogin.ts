import { useSelector } from "react-redux";

const useUserLogin = () => {
  const { user, error, authenticated } = useSelector((state: any) => {
    return state.userLogin;
  });

  return { user, error, authenticated };
};

export default useUserLogin;
