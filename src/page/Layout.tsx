import { Outlet, Navigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";

const Layout = () => {
  const authenticated: boolean = true;

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="d-flex w-100 bg-background vh-100">
      <div className="">
        <SideBar />
      </div>
      <div className="w-100">
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
