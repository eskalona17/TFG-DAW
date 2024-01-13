import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./header.module.css";
import { IoSearch } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";
import logoLight from "../../assets/img/logoLight.svg";
import logoDark from "../../assets/img/logoDark.svg";
import SearchResult from "../searchResult/SearchResult";
import Modal from "../modal/Modal";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Header = () => {
  const {
    header,
    title_container,
    logo,
    title,
    search_container,
    search_form,
    search,
    search_button,
    notifications_container,
    notifications,
    search_results,
  } = Styles;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { logout } = useContext(AuthContext);
  const { theme } = useTheme();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchResultClick = (username) => {
    navigate(`/${username}`);
    setSearchResults([]);
  };

  const handleOutsideClick = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const toggleLogoutModal = () => {
    setShowLogoutModal((prev) => !prev);
  };

  const handleLogout = async () => {
    toggleLogoutModal();
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/users/search?q=${searchQuery}`,
          {
            withCredentials: true,
          }
        );
        const data = response.data;
        setSearchResults(data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    if (searchQuery.trim() !== "") {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleLogoutConfirmation = async () => {
    await logout();
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/");
    setSearchQuery("");
    setSearchResults([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={header + " header"}>
      <div className={title_container} onClick={handleLogoClick}>
        <img
          src={theme === "light" ? logoLight : logoDark}
          alt="Insta Pet Logo"
          className={logo}
        />
        <h1 className={title}>InstaPet</h1>
      </div>
      <div className={search_container} ref={searchRef}>
        <form className={search_form}>
          <input
            type="text"
            placeholder="Buscar..."
            className={search}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="button" className={search_button}>
            <IoSearch />
          </button>
        </form>

        <div className={search_results}>
          {searchResults.map((result) => (
            <ul key={result.user._id}>
              <SearchResult
                item={result}
                handleSearchResultClick={handleSearchResultClick}
              />
            </ul>
          ))}
        </div>
      </div>
      <div className={notifications_container}>
        <span className={notifications} onClick={toggleLogoutModal}>
          <IoExitOutline />
        </span>
        {showLogoutModal && (
          <Modal
            title="¿Estás seguro que deseas salir?"
            description="Esta acción cerrará tu sesión actual."
            onClose={toggleLogoutModal}
            onConfirm={handleLogoutConfirmation}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
