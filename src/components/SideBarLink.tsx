import { Link } from "react-router-dom"

type Props = {
    link: string
    text: string
}

const SideBarLink = ({link, text}: Props) => {
  return (
    <Link to={link}>{text}</Link>
  )
}

export default SideBarLink