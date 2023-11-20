import Styles from "./header.module.css";
import { IoSearch } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";

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

  return (
    <header className={header}>
      <div className={title_container}>
        <img src="../../src/assets/img/logo.svg" alt="Insta Pet Logo" className={logo} />
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
        <span className={notifications}>
          <IoNotificationsOutline />
        </span>
      </div>
    </header>
  );
};

export default Header;
