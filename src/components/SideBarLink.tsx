import clsx from "clsx"
import { PropsWithChildren } from "react"
import { Link } from "react-router-dom"

type Props = {
    link: string,
    active?: boolean
}

const SideBarLink = ({link, active, children}: PropsWithChildren<Props>) => {
  return (
    <Link className={clsx("sidenav-link", active ? "text-yellow fw-semibold": "text-muted")} to={link}>{children}</Link>
  )
}

export default SideBarLink