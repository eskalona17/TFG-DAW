import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const useGetUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/users/profile/${username}`, { withCredentials: true });
        const data = res.data
        if (data.error) {
          console.error(data.error);
          return;
        }
        setUser(data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error('El usuario no existe');
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [username]);

  return { loading, user };
};

export default useGetUserProfile;