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
    <div className="d-flex bg-background position-relative vh-100">
      <div className="sticky-top z-2">
        <SideBar />
      </div>

      <div className="w-100 h-100 position-relative d-flex flex-column">
        <div className="sticky-top">
          <TopBar />
        </div>
        <div className="flex-grow-1 overflow-auto">
        <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
