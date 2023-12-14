import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const usePosts = (activeFilter) => {
  const { currentUser } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserById = async (userId) => {
    try {
      const res = await fetch(`${apiUrl}/api/users/user-info/${userId}`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${currentUser?.token}`, 
        },
      });
      const userData = await res.json();
      return userData;
    } catch (error) {
      console.error('Error fetching user:', error.message);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let endpoint = "/api/posts/feed";
        const params = {};

        if(activeFilter && activeFilter != "Todo"){
          
          let filtro = activeFilter.toLowerCase();
          console.log(filtro);
          params.profileType = filtro;
        }
        const response = await axios.get(`${apiUrl}${endpoint}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
          params, // Se añaden los parámetros a la URL automáticamente
        });
        const data = response.data;
        console.log(response);

        if (data.error) {
          console.error(data.error);
        } else {
          // Obtener información del autor del post
          const updatedPosts = await Promise.all(
            data.map(async (post) => {
              const authorData = await getUserById(post.author);
              return {
                ...post,
                authorData,
              };
            })
          );
          setPosts(updatedPosts);
        }
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentUser?.token, activeFilter]);

  return { loading, posts };
};

export default usePosts;
