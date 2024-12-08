import SideBarLink from "@/components/SideBarLink";
import Logo from '@/assets/images/logo.png';
import {
  Bag2,
  Cake,
  Calculator,
  DollarCircle,
  Home,
  ReceiptItem,
  Setting,
  TicketDiscount,
} from "iconsax-react";
import sideBarStore from "@/store/SidebarStore";
import { ReactNode } from "react";
import clsx from "clsx";
import transactionPath from "@/path/transaction.path";
import cakePath from "@/path/cakes.path";
import settingPath from "@/path/setting.path";
import fixedCostPath from "@/path/fixedCost.path";
import ingredientPath from "@/path/ingredient.path";

const menuObject = ({
  title,
  icon,
  link,
  childrens,
}: {
  title: string;
  icon: ReactNode;
  link: string;
  childrens?: {
    link: string;
    icon?: ReactNode;
    title: string;
  }[];
}) => {
  return {
    title,
    icon,
    link,
    childrens,
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
      link: transactionPath.index,
    }),
    menuObject({
      title: "Cakes",
      icon: <Cake size="24" variant="Bulk" />,
      link: cakePath.index,
      childrens: [
        {
          title: "Cake",
          icon: <Cake size="24" variant="Bulk" />,
          link: cakePath.index,
        },
        {
          title: "Ingredient",
          icon: <Bag2 size="24" variant="Bulk" />,
          link: ingredientPath.index,
        },
        {
          title: "Discount",
          icon: <TicketDiscount size="24" variant="Bulk" />,
          link: cakePath.index,
        }
      ]
    }),
    menuObject({
      title: "Settings",
      icon: <Setting size="24" variant="Bulk" />,
      link: settingPath.index,
      childrens: [
        {
          title: "Setting",
          icon: <Setting size="24" variant="Bulk" />,
          link: settingPath.index,
        },
        {
          title: "Monthly Bills",
          icon: <DollarCircle size="24" variant="Bulk" />,
          link: fixedCostPath.index,
        }
      ]
    }),
  ];

  return (
    <>
      <nav className="py-4 bg-white min-vh-100 sidenav d-sm-block d-none">
        <div className="w-100 d-flex justify-content-center mb-5">
          <img src={Logo} alt="" style={{ width: "2rem" }} />
        </div>
        <ul className="px-4 d-flex flex-column gap-4">
          {menus.map((menu, index) => (
            <li key={index}>
              <SideBarLink
                icon={menu.icon}
                link={menu.link}
                title={menu.title}
                isExpand={expand}
                childrens={menu.childrens} />
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
              <SideBarLink
                icon={menu.icon}
                link={menu.link}
                title={menu.title}
                isExpand={expand} 
                childrens={menu.childrens}/>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default SideBar;
