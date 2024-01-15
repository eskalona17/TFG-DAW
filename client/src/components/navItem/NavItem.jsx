import { Link, useLocation, useNavigate } from "react-router-dom";
import Styles from "@/components/navItem/navitem.module.css";
import { SocketContext } from "@/context/SocketContext";
import { useContext } from "react";

const NavItem = ({ label, path, icon, notify }) => {
  const { unread } = useContext(SocketContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(path);
  };

  const isUnreadEmpty = Object.keys(unread).length === 0 || unread[Object.keys(unread)[0]] === false;

  return (
    <li className={Styles.navitem}>
      <Link to={path} onClick={handleClick}>
        {icon}
        <span className={`${notify && !isUnreadEmpty ? Styles.notification : ''} ${path === location.pathname ? Styles.active : ''}`}>{label}</span>
      </Link>
    </li>
  );
};

export default NavItem;
