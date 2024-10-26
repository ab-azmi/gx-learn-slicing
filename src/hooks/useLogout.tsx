import { useNavigate } from "react-router-dom";
import AuthStore from "@/store/AuthStore";
import { loginPath } from "@/path/auth.path";

const useLogout = () => {
  const store = AuthStore();
  const navigate = useNavigate();

  const signout = () => {
    store.logout();
    navigate(loginPath, { replace: true });
  };
  return {
    signout,
  };
};

export default useLogout;
