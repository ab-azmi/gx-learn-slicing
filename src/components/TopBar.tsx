import { HambergerMenu, Logout, Moon, Notification, Sun } from "iconsax-react";
import User from "../assets/images/user.jpg";
import sideBarStore from "../store/SidebarStore";
import useLogout from "../hooks/useLogout";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeProvider";

const TopBar = () => {
  const {signout} = useLogout();
  const { expand, setExpand } = sideBarStore();
  const {darkMode, setDarkMode} = useContext(DarkModeContext);

  return (
    <div className="top-bar w-100 bg-secondary d-flex justify-content-between px-4 py-3">
      <div className="d-flex gap-4 align-items-center">
        <button className="hamburger" onClick={() => setExpand(!expand)}>
          <HambergerMenu size="24" />
        </button>
        <span className="fs-6">Dashboard</span>
      </div>

      <div className="d-flex gap-4 align-items-center">
        <div className="position-relative">
          <span className="position-absolute translate-middle text-xs bg-danger rounded-circle" style={{ width: "10px", height:"10px", top:"0", right: "-4px" }}>
          </span>
          <Notification size="24" className="text-muted" variant="Bulk" />
        </div>
        <button onClick={() => setDarkMode(darkMode == "dark" ? "light" : "dark")} type="button" className="d-flex align-items-center gap-2 bg-transparent border-0">
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
            style={{ width: "2.3rem", height: "2.3rem"}}
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          <ul className="dropdown-menu border-0 shadow rounded-0">
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
              <button onClick={signout} className="dropdown-item d-flex justify-content-between text-danger">
                Logout
                <Logout size="24" variant="Bulk"/>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
