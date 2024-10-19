import { HambergerMenu, Notification } from "iconsax-react";
import User from '../assets/images/user.jpg';
import sideBarStore from "../store/SidebarStore";

const TopBar = () => {
    const {expand, setExpand} = sideBarStore();

  return (
    <div className="top-bar w-100 bg-white d-flex justify-content-between px-4 py-3">
      <div className="d-flex gap-4 align-items-center">
        <button className="hamburger" onClick={() => setExpand(!expand)}><HambergerMenu size="24" /></button>
        <span className="fs-6">Dashboard</span>
      </div>
      <div className="d-flex gap-4 align-items-center">
        <div className="position-relative">
          <span className="position-absolute top-0 start-100 translate-middle badge text-xs rounded-pill bg-danger">
            1
          </span>
          <Notification size="24" className="text-muted" variant="Bulk" />
        </div>
        <div>
            <img src={User} alt="" className="rounded-circle object-fit-cover" style={{ width:"2.3rem", height:"2.3rem" }}/>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
