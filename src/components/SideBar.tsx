import SideBarLink from "./SideBarLink";
import LogoHitam from "../assets/images/logo-hitam.svg";
import { Bill, Calculator, Edit, Home, Setting } from "iconsax-react";

const SideBar = () => {
  return (
    <nav className="py-4 bg-white h-100 sidenav">
      <div className="w-100 d-flex justify-content-center mb-5">
        <img src={LogoHitam} alt="" style={{ width:"11rem" }}/>
      </div>
      <ul className="px-4 d-flex flex-column gap-4">
        <li>
          <SideBarLink link="/" active={true}>
            <Home size="24" variant="Bulk" />
            Dashboard
          </SideBarLink>
        </li>
        <li>
          <SideBarLink link="/">
            <Edit size="24" variant="Bulk" />
            Employee Schedule
          </SideBarLink>
        </li>
        <li>
          <SideBarLink link="/">
            <Bill size="24" variant="Bulk" />
            Employee Attendance
          </SideBarLink>
        </li>
        <li>
          <SideBarLink link="/">
            <Calculator size="24" variant="Bulk" />
            Analytic Summary
          </SideBarLink>
        </li>
        <li>
          <SideBarLink link="/">
            <Setting size="24" variant="Bulk" />
            Settings
          </SideBarLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
