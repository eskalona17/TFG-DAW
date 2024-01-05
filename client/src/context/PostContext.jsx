import { createContext, useCallback, useContext, useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

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

  const getPosts = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/posts/feed`, { withCredentials: true });
      setFeedPosts(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const filterPostByFilter = useCallback((filter) => {
    if (filter === 'all') {
      setFilteredPostsByFilter(feedPosts);
    } else {
      const filteredPosts = feedPosts.filter(post => post.author.profile === filter);
      setFilteredPostsByFilter(filteredPosts);
    }
  }, [feedPosts]);

  const handleDeletePost = useCallback(async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/api/posts/delete/${postId}`, { withCredentials: true });
      if (response.status === 200) {
        toast.success('Post eliminado correctamente', {
          position: 'top-center',
          autoClose: 3000,
        });

        const updatedPosts = feedPosts.filter(post => post._id !== postId);
        setFeedPosts(updatedPosts);
      }
    } catch (error) {
      console.error('Error al eliminar el post: ', error.message);
      toast.error('Error al borrar el post', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  }, [feedPosts]);

  useEffect(() => {
    getPosts();
  }, [currentUser, getPosts]);

  useEffect(() => {
    filterPostByFilter(currentFilter);
  }, [currentUser, currentFilter, filterPostByFilter]);

  return (
    <PostContext.Provider value={{ loading, getPosts, feedPosts, filteredPostsByFilter, filterPostByFilter, currentFilter, handleFilterChange, handleDeletePost }}>
      {children}
    </PostContext.Provider>
  );
}

export const usePost = () => {
  return useContext(PostContext);
};