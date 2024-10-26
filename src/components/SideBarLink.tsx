import clsx from "clsx";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

type Props = {
  link: string;
  active?: boolean;
  tooltip?: string
};

const SideBarLink = ({ link, active, tooltip, children }: PropsWithChildren<Props>) => {
  return (
    <Link
      className={clsx(
        "sidenav-link",
        active ? "text-primary fw-semibold" : "text-muted"
      )}
      to={link}
    >
      {tooltip && <span className="sidenav-tooltip">{tooltip}</span>}
      {children}
    </Link>
  );
};

export default SideBarLink;
