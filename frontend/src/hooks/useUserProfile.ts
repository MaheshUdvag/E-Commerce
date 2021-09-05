import { useSelector } from "react-redux";

const useUserProfile = () => {
  const { user, error } = useSelector((state: any) => state.userProfile);
  return { user, error };
};

export default useUserProfile;
