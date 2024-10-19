import SideBarLink from "./SideBarLink";
import LogoHitam from "../assets/images/logo-hitam.svg";
import SimpleLogo from "../assets/images/simple-logo.svg";
import { Bill, Calculator, Edit, Home, Setting } from "iconsax-react";
import { useState } from "react";

const SideBar = () => {
  const [expand, setExpand] = useState(false);

  return (
    <nav className="py-4 bg-white h-100 sidenav">
      {expand ? (
        <div className="w-100 d-flex justify-content-center mb-5">
          <img src={LogoHitam} alt="" style={{ width: "11rem" }} />
        </div>
      ) : (
        <div className="w-100 d-flex justify-content-center mb-5">
        <img src={SimpleLogo} alt="" style={{ width:"1.5rem" }}/>
      </div>
      )}
      <ul className="px-4 d-flex flex-column gap-4">
        <li>
          <SideBarLink link="/" active={true}>
            <Home size="24" variant="Bulk" />
            {expand && "Dashboard"}
          </SideBarLink>
        </li>
        <li>
          <SideBarLink link="/">
            <Edit size="24" variant="Bulk" />
            {expand && "Employee Schedule"}
          </SideBarLink>
        </li>
        <li>
          <SideBarLink link="/">
            <Bill size="24" variant="Bulk" />
            {expand && "Employee Attendance"}
          </SideBarLink>
        </li>
        <li>
          <SideBarLink link="/">
            <Calculator size="24" variant="Bulk" />
            {expand && "Analytic Summary"}
          </SideBarLink>
        </li>
        <li>
          <SideBarLink link="/">
            <Setting size="24" variant="Bulk" />
            {expand && "Settings"}
          </SideBarLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
