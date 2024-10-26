import SideBarLink from "@/components/SideBarLink";
import LogoHitam from "@/assets/images/logo-hitam.svg";
import SimpleLogo from "@/assets/images/simple-logo.svg";
import { Bill, Calculator, Edit, Home, Setting } from "iconsax-react";
import sideBarStore from "@/store/SidebarStore";
import { ReactNode } from "react";

const menuObject = ({title, icon, link}:{title: string, icon: ReactNode, link: string}) => {
  return {
    title,
    icon,
    link
  }
}

const SideBar = () => {
  const { expand } = sideBarStore();
  const menus = [
    menuObject({title: "Dashboard", icon: <Home size="24" variant="Bulk" />, link: "/"}),
    menuObject({title: "Employee Schedule", icon: <Edit size="24" variant="Bulk" />, link: "/"}),
    menuObject({title: "Employee Attendance", icon: <Bill size="24" variant="Bulk" />, link: "/"}),
    menuObject({title: "Analytic Summary", icon: <Calculator size="24" variant="Bulk" />, link: "/"}),
    menuObject({title: "Settings", icon: <Setting size="24" variant="Bulk" />, link: "/"}),
  ]

  return (
    <nav className="py-4 bg-secondary h-100 sidenav">
      <div className="w-100 d-flex justify-content-center mb-5">
        {expand ? (
          <img src={LogoHitam} alt="" style={{ width: "9rem" }} />
        ) : (
          <img src={SimpleLogo} alt="" style={{ width: "1.4rem" }} />
        )}
      </div>
      <ul className="px-4 d-flex flex-column gap-4">
        {menus.map((menu, index) => (
          <li key={index}>
          <SideBarLink tooltip={menu.title} link={menu.link} active={index == 0 ? true : false}>
            {menu.icon}
            {expand && menu.title}
          </SideBarLink>
        </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;
