import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const usePosts = (activeFilter) => {
  const { currentUser } = useContext(AuthContext);

  const location = useLocation(); // Obtiene la ubicación actual

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
        const segments = location.pathname.split("/");
        const usernameFromPath = segments[segments.length - 1];
        console.log(segments)
        console.log(usernameFromPath)
        // Verificar si estás en una página de perfil
        if (usernameFromPath) {
          endpoint = `/api/posts/user/${usernameFromPath}`;
        } 
        console.log("Active Filter changed:", activeFilter);
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
          params,
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
