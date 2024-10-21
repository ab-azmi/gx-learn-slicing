import { useNavigate } from "react-router-dom";
import AuthStore from "../store/AuthStore";

const useLogout = () => {
  const store = AuthStore();
  const navigate = useNavigate();

  const signout = () => {
    store.logout();
    navigate("/login", { replace: true });
  };
  return {
    signout,
  };
};

export default useLogout;
