import { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  link: string;
  tooltip?: string;
};

const SideBarLink = ({
  link,
  tooltip,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `sidenav-link ${isActive ? "text-primary fw-semibold" : "text-muted"}`
      }
      to={link}
    >
      {tooltip && <span className="sidenav-tooltip">{tooltip}</span>}
      {children}
    </NavLink>
  );
};

export default SideBarLink;
