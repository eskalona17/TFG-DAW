import Styles from './navitem.module.css'

const NavItem = ({label}) => (
  <li className={Styles.navitem}>
    <span>i</span>
    {label}
  </li>
);

export default NavItem