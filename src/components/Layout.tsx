import { Outlet, Navigate } from "react-router-dom";
import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import AuthStore from "@/store/AuthStore";
import { loginPath } from "@/path/auth.path";

const Layout = () => {
  const { authenticated } = AuthStore();

  if (!authenticated) {
    return <Navigate to={loginPath} replace />;
  }

  return (
    <div className="d-flex bg-background position-relative">
      <div className="h-100 sticky-sm-top z-2">
        <SideBar />
      </div>

      <div className="w-100 position-relative">
        <div className="sticky-top">
          <TopBar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
