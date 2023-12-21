import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./header.module.css";
import { IoSearch } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";
import logoLight from "../../assets/img/logoLight.svg";
import logoDark from "../../assets/img/logoDark.svg";

const serverImagePath =
  import.meta.env.VITE_REACT_APP_API_URL + "/public/profilePic/";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Header = () => {
  // console.log("header render");
  const {
    header,
    title_container,
    logo,
    user_img,
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

  const { logout } = useContext(AuthContext);

  // Can change color of theme whith theme variable that is now available because of ThemeContext
  const { theme, toggleTheme } = useTheme();
  // console.log(theme);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchResultClick = () => {
    // Navigate to the profile page and clear the search results
    navigate(`/profile`);
    setSearchResults([]);
  };

  const handleOutsideClick = (e) => {
    // Check if the click is outside the search container
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  useEffect(() => {
    // Attach click event listener to document
    document.addEventListener("click", handleOutsideClick);

    return () => {
      // Detach click event listener on component unmount
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

    // if there's a query
    if (searchQuery.trim() !== "") {
      fetchSearchResults();
    } else {
      // if the query's empty, clean the results
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleLogoClick = () => {
    // Clear search results when clicking on the logo
    navigate("/");
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <header className={header}>
      <div className={title_container} onClick={handleLogoClick}>
        <img
          src={theme === "light" ? logoLight : logoDark}
          alt="Insta Pet Logo"
          className={logo}
        />
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
              <li onClick={() => handleSearchResultClick(result.user._id)}>
                <img
                  src={serverImagePath + result.user.profilePic}
                  alt=""
                  className={user_img}
                />
                <span>{result.user.username}</span>
              </li>
            </ul>
          ))}
        </div>
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
