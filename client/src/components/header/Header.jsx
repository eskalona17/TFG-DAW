import { useContext } from "react";
import { Link } from "react-router-dom";
import Styles from "./header.module.css";
import { IoSearch } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const {
    header,
    title_container,
    logo,
    search_container,
    search_form,
    search,
    search_button,
    notifications_container,
    notifications,
  } = Styles;

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className={header}>
      <div className={title_container}>
        <Link to="/">
          <img
            src="../src/assets/img/logo.svg"
            alt="Insta Pet Logo"
            className={logo}
          />
        </Link>
      </div>
      <div className={search_container}>
        <form className={search_form}>
          <input type="text" placeholder="Buscar..." className={search} />
          <button className={search_button}>
            <IoSearch />
          </button>
        </form>
      </div>
      <div className={notifications_container}>
        <span className={notifications} onClick={handleLogout}>
          <IoExitOutline />
        </span>
      </div>
    </header>
  );
};

export default Header;
