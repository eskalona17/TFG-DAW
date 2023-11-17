import { useNavigate } from 'react-router-dom';
import Styles from './navitem.module.css'

const NavItem = ({ label, path }) => {
  const navigate = useNavigate()
  return (
    <li className={Styles.navitem}>
      <a onClick={() => navigate(path)}>
        <span>i</span>
        {label}
      </a>
    </li>

  )
}

export default NavItem