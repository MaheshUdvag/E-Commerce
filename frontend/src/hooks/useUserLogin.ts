import { useSelector } from "react-redux";

const useUserLogin = () => {
  const { user, error } = useSelector((state: any) => {
    return state.userLogin;
  });

  return { user, error };
};

export default useUserLogin;
