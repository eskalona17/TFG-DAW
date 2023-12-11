import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import Styles from "./header.module.css"
import { IoSearch } from "react-icons/io5"
import { IoExitOutline } from "react-icons/io5"
import { AuthContext } from "../../context/authContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const serverImagePath =
  import.meta.env.VITE_REACT_APP_API_URL + "/public/profilePic/"

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL

const Header = () => {
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
  } = Styles

  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const navigate = useNavigate()

  const { logout } = useContext(AuthContext)

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/users/search?q=${searchQuery}`,
          {
            withCredentials: true,
          }
        )
        const data = response.data
        setSearchResults(data)
      } catch (error) {
        console.error("Error:", error.message)
      }
    }

    // if there's a query
    if (searchQuery.trim() !== "") {
      fetchSearchResults()
    } else {
      // if the query's empty, clean the results
      setSearchResults([])
    }
  }, [searchQuery])

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

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
              <li>
              <Link to={`/profile/${result.user.username}`}>
                <img
                  src={serverImagePath + result.user.profilePic}
                  alt=""
                  className={user_img}
                />
                <span>{result.user.username}</span>
                </Link>
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
  )
}

export default Header
