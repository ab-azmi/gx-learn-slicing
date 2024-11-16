import { useNavigate } from "react-router-dom";
import AuthStore from "@/store/AuthStore";
import { loginPath } from "@/path/auth.path";
import { logout } from "@/service/api/auth.api";

const useLogout = () => {
  const store = AuthStore();
  const navigate = useNavigate();

  const signout = () => {
    logout().then(() => {
      store.clearToken();
      navigate(loginPath, { replace: true });
    });
  };
  return {
    signout,
  };
};

export default useLogout;
