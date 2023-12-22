import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Loader from "../components/loader/Loader"; // Ajusta la ruta según tu estructura de archivos
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const usePosts = (activeFilter) => {
  const { currentUser } = useContext(AuthContext);

  const location = useLocation(); // Obtiene la ubicación actual

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true); // Nuevo estado
  const [page, setPage] = useState(1);

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
      console.error("Error fetching user:", error.message);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
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
          params.profileType = filtro;
        }

        params.page = page;
        params.limit = 5;

        const response = await axios.get(`${apiUrl}${endpoint}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
          params,
        });

        const data = response.data;

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
                key: post._id
              };
            })
          );
          // Actualizar el estado de los posts agregando los nuevos posts
          setPosts((prevPosts) => [...prevPosts, ...updatedPosts]);
        }
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        if (initialLoading) {
          // Desactivar el loader de carga inicial
          setInitialLoading(false);
        }
        // Desactivar el loader cuando se completa la carga de posts
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentUser?.token, activeFilter, page, initialLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return { loading, posts, initialLoading };
};

export default usePosts;
