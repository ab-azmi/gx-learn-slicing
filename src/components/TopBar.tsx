import { HambergerMenu, Logout, Moon, Sun } from "iconsax-react";
import User from "@/assets/images/user.jpg";
import sideBarStore from "@/store/SidebarStore";
import useLogout from "@/hooks/useLogout";
import { useContext, useState } from "react";
import { DarkModeContext } from "@/context/DarkModeProvider";
import useGlobalContext from "@/hooks/useGlobalContext";
import { useLocation } from "react-router-dom";
import ModalConfirm from "./ModalConfirm";

const TopBar = () => {
  const {pathname} = useLocation();
  const { signout } = useLogout();
  const { expand, setExpand } = sideBarStore();
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [confirm, setConfirm] = useState(false);
  const {state} = useGlobalContext();

  const getPathName = () => {
    const cleanPath = pathname.split("/").filter((path) => path !== "");
    if(cleanPath.length < 1) {
      return "Dashboard";
    }
    
    return cleanPath[0];
  }

  return (
    <div className="top-bar w-100 bg-white d-flex justify-content-between px-4 py-3">
      <div className="d-flex gap-4 align-items-center">
        <button className="hamburger" onClick={() => setExpand(!expand)}>
          <HambergerMenu size="24" />
        </button>
        <span className="fs-6 text-capitalize">{getPathName()}</span>
      </div>

      <div className="d-flex gap-4 align-items-center">
        <button
          onClick={() => setDarkMode(darkMode == "dark" ? "light" : "dark")}
          type="button"
          className="d-flex align-items-center gap-2 bg-transparent border-0"
        >
          {darkMode == "dark" ? (
            <Moon size="24" className="text-muted" variant="Bulk" />
          ) : (
            <Sun size="24" className="text-yellow" variant="Bulk" />
          )}
          <span className="text-xs">
            {darkMode == "dark" ? "Dark" : "Light"}
          </span>
        </button>
        <div className="dropdown">
            <img
              src={User}
              alt=""
              role="button"
              className="rounded-circle object-fit-cover"
              style={{ width: "2.3rem", height: "2.3rem" }}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            />
          <ul className="dropdown-menu border-0 shadow rounded-0">
            {state.isAdmin && (
              <li>
              <a className="dropdown-item text-xs text-primary" href="#">
                You're an Admin
              </a>
            </li>
            )}
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <button
                onClick={() => setConfirm(true)}
                className="dropdown-item d-flex justify-content-between text-danger"
              >
                Logout
                <Logout size="24" variant="Bulk" />
              </button>
            </li>
          </ul>
        </div>
      </div>

      <ModalConfirm
        show={confirm}
        onClose={() => setConfirm(false)}
        title="Logout Confirm"
        message="Are you sure want to logout?"
        onConfirm={() => {
          signout();
        }}
      />
    </div>
  );
};

export default TopBar;
