import SuggestedUser from "../components/suggestedUser/SuggestedUser";
import Loader from '../components/loader/Loader';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Styles from "./pages.module.css";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const Following = () => {
  const { username } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFollowing = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users/${username}/following`, {
          withCredentials: true
        })
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getFollowing()
  }, [username]);

  return (
    <main className="main">
      {loading
        ? <Loader />
        : users.length > 0
          ? users.map((user) => (
            <SuggestedUser key={user._id} user={user} version='full' />
          ))
          : <p className={Styles.no_following}>No sigues a nadie</p>
      }
    </main>
  )
}

export default Following