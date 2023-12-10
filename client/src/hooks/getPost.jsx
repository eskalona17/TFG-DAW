import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const usePosts = (searchType, searchParam) => {
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
        let endpoint = "";

        // Determinar el endpoint de la API según el tipo de búsqueda
        switch (searchType) {
          case "user":
            endpoint = `/api/user/${searchParam}`;
            break;
          case "post":
            endpoint = `/api/post/${searchParam}`;
            break;
          default:
            searchType = "feed";
            endpoint = "/api/posts/feed";
        }

        const res = await fetch(`${apiUrl}${endpoint}`, {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${currentUser?.token}`, 
          },
        });
        const data = await res.json();
        console.log(data);

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
  }, [currentUser?.token, searchType, searchParam]);

  return { loading, posts };
};

export default usePosts;
