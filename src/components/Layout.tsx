import { Outlet, Navigate } from "react-router-dom";
import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import AuthStore from "@/store/AuthStore";
import { loginPath } from "@/path/auth.path";

const Layout = () => {
  const {authenticated} = AuthStore();

  if (!authenticated) {
    return <Navigate to={loginPath} replace />;
  }

  return (
    <div className="d-flex min-vh-100 bg-background">
      <SideBar />
      <div className="overflow-auto w-100">
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
