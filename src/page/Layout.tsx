import { Outlet, Navigate } from "react-router-dom";
import SideBar from "../components/SideBar";

const Layout = () => {
  const authenticated:boolean = false;

  if (!authenticated) {
    return <Navigate to="/login" replace/>;
  }
  
  return (
    <div>
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Layout;
