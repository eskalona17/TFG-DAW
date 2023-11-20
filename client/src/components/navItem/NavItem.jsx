// NavItem.js
import { Link, useNavigate } from "react-router-dom";
import Styles from "./navitem.module.css";

const NavItem = ({ label, path, icon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <li className={Styles.navitem}>
      <Link to={path} onClick={handleClick}>
        {icon}
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default NavItem;
