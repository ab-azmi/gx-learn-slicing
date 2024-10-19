import { Outlet, Navigate } from "react-router-dom";
import SideBar from "../components/SideBar";

const Layout = () => {
  const authenticated: boolean = true;

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="d-flex w-100 bg-background vh-100">
      <div className="col-md-2">
        <SideBar />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
