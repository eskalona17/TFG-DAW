import { createContext, useContext, useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [feedPosts, setFeedPosts] = useState([]);
  const [filteredPostsByFilter, setFilteredPostsByFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  }

  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/posts/feed`, { withCredentials: true });
      setFeedPosts(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  }

  const filterPostByFilter = (filter) => {
    if (filter === 'all') {
      setFilteredPostsByFilter(feedPosts);
    } else {
      const filteredPosts = feedPosts.filter(post => post.author.profile === filter);
      setFilteredPostsByFilter(filteredPosts);
    }
  }

  useEffect(() => {
    getPosts();
  }, [currentUser]);


  return (
    <PostContext.Provider value={{ loading, getPosts, feedPosts, filteredPostsByFilter, filterPostByFilter, currentFilter, handleFilterChange }}>
      {children}
    </PostContext.Provider>
  );
}

export const usePost = () => {
  return useContext(PostContext);
};