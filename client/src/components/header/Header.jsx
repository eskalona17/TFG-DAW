import SearchResult from "@/components/searchResult/SearchResult";
import { useState, useEffect, useContext, useRef } from "react";
import { IoSearch, IoExitOutline } from "react-icons/io5";
import { AuthContext } from "@/context/AuthContext";
import logoLight from "@/assets/img/logoLight.svg";
import { useTheme } from "@/context/ThemeContext";
import logoDark from "@/assets/img/logoDark.svg";
import useUserImage from "@/hooks/useUserImage";
import { useNavigate } from "react-router-dom";
import Modal from "@/components/modal/Modal";
import Styles from "./header.module.css";
import axios from "axios";

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
    user_img
  } = Styles;

  const { currentUser } = useContext(AuthContext);
  const { userImage } = useUserImage(currentUser);
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
      <div className={title_container}>
        <img
          src={theme === "light" ? logoLight : logoDark}
          alt="Insta Pet Logo"
          className={logo}
          onClick={handleLogoClick}
        />
        <h1 className={title} onClick={handleLogoClick}>InstaPet</h1>
        <div onClick={() => navigate(`/${currentUser.username}`)}>
          <img src={userImage} alt="" className={user_img} />
        </div>
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
