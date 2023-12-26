import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/posts/feed`, { withCredentials: true });
      setPosts(response.data);
      setFilteredPosts(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  }

  const filterPostsByAuthorProfile = (profile) => {
    if (profile === 'all') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.author.profile === profile));
    }
  };

  useEffect(() => {
    getPosts();
  }, [currentUser]);

  return (
    <PostContext.Provider value={{ filteredPosts, getPosts, setFilteredPosts, filterPostsByAuthorProfile, loading}}>
      {children}
    </PostContext.Provider>
  );
}

export const usePost = () => {
  return useContext(PostContext);
};