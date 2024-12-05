import SideBarLink from "@/components/SideBarLink";
import Logo from '@/assets/images/logo.png';
import {
  Cake,
  Calculator,
  Home,
  ReceiptItem,
  Setting,
} from "iconsax-react";
import sideBarStore from "@/store/SidebarStore";
import { ReactNode } from "react";
import clsx from "clsx";
import { transactionPath } from "@/path/transaction.path";

const menuObject = ({
  title,
  icon,
  link,
}: {
  title: string;
  icon: ReactNode;
  link: string;
}) => {
  return {
    title,
    icon,
    link,
  };
};

const SideBar = () => {
  const { expand } = sideBarStore();
  const menus = [
    menuObject({
      title: "Dashboard",
      icon: <Home size="24" variant="Bulk" />,
      link: "/",
    }),
    menuObject({
      title: "Cashier",
      icon: <Calculator size="24" variant="Bulk" />,
      link: transactionPath.cashier,
    }),
    menuObject({
      title: "Transactions",
      icon: <ReceiptItem size="24" variant="Bulk" />,
      link: "/transactions",
    }),
    menuObject({
      title: "Employee Attendance",
      icon: <Cake size="24" variant="Bulk" />,
      link: "/cakes",
    }),
    menuObject({
      title: "Settings",
      icon: <Setting size="24" variant="Bulk" />,
      link: "/sett",
    }),
  ];

  return (
    <>
      {/* DONE : Responsive Sidebar */}
      <nav className="py-4 bg-white min-vh-100 sidenav d-sm-block d-none">
        <div className="w-100 d-flex justify-content-center mb-5">
          <img src={Logo} alt="" style={{ width: "2rem" }} />
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
      <nav className={clsx("py-4 bg-secondary min-vh-100 sidenav position-fixed z-2", expand ? "d-block" : "d-none")}>
        <div className="w-100 d-flex justify-content-center mb-5">
        <img src={Logo} alt="" style={{ width: "2rem" }} />
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
    </>
  );
};

export default SideBar;
