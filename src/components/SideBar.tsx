import SideBarLink from './SideBarLink';

const SideBar = () => {
  return (
    <nav>
        <ul>
          <li>
            <SideBarLink link="/" text="Home"/>
          </li>
          <li>
            <SideBarLink link="/products" text="Products"/>
          </li>
          <li>
            <SideBarLink link="/about" text="About"/>
          </li>
          <li>
            <SideBarLink link="/contact" text="Contact"/>
          </li>
        </ul>
      </nav>
  )
}

export default SideBar