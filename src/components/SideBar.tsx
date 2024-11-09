import SideBarLink from "@/components/SideBarLink";
import LogoHitam from "@/assets/images/logo-hitam.svg";
import SimpleLogo from "@/assets/images/simple-logo.svg";
import { Bill, Calculator, HierarchySquare2, Home, Setting } from "iconsax-react";
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
    menuObject({title: "Leads", icon: <HierarchySquare2 size="24" variant="Bulk" />, link: "/leads"}),
    menuObject({title: "Employee Attendance", icon: <Bill size="24" variant="Bulk" />, link: "/empl"}),
    menuObject({title: "Analytic Summary", icon: <Calculator size="24" variant="Bulk" />, link: "/analytic"}),
    menuObject({title: "Settings", icon: <Setting size="24" variant="Bulk" />, link: "/sett"}),
  ]

  return (
    // TODO : Responsive Sidebar
    <nav className="py-4 bg-secondary min-vh-100 sidenav d-sm-block d-none">
      {/* DONE : Sticky sidebar */}
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
          <SideBarLink tooltip={menu.title} link={menu.link}>
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
