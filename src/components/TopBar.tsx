import { HambergerMenu, Logout, Moon, Notification, Sun } from "iconsax-react";
import User from "../assets/images/user.jpg";
import sideBarStore from "../store/SidebarStore";
import { Link } from "react-router-dom";
import darkModeStore from "../store/DarkModeStore";
import { useEffect } from "react";

const TopBar = () => {
  const { expand, setExpand } = sideBarStore();
  const {darkMode, setDarkMode} = darkModeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", darkMode);
  }, [darkMode])

  return (
    <div className="top-bar w-100 bg-white d-flex justify-content-between px-4 py-3">
      <div className="d-flex gap-4 align-items-center">
        <button className="hamburger" onClick={() => setExpand(!expand)}>
          <HambergerMenu size="24" />
        </button>
        <span className="fs-6">Dashboard</span>
      </div>
      <div className="d-flex gap-4 align-items-center">
        <div className="position-relative">
          <span className="position-absolute top-0 start-100 translate-middle badge text-xs rounded-pill bg-danger">
            1
          </span>
          <Notification size="24" className="text-muted" variant="Bulk" />
        </div>
        <button onClick={() => setDarkMode(darkMode == "dark" ? "light" : "dark")} type="button" className="d-flex align-items-center gap-2 bg-transparent border-0">
          {darkMode == "dark" ? (
            <Moon size="24" className="text-muted" variant="Bulk" />
          ) : (
            <Sun size="24" className="text-muted" variant="Bulk" />
          )}
          <span className="text-xs">
            {darkMode == "dark" ? "Dark" : "Light"}
          </span>
        </button>
        <div className="dropdown">
          <img
            src={User}
            alt=""
            className="rounded-circle object-fit-cover"
            style={{ width: "2.3rem", height: "2.3rem", cursor: "pointer" }}
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
              <Link to={'/login'} className="dropdown-item d-flex justify-content-between text-danger">
                Logout
                <Logout size="24" variant="Bulk"/>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
