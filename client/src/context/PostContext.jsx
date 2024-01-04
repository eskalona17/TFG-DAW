import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [feedPosts, setFeedPosts] = useState([]);
  const [filteredPostsByFilter, setFilteredPostsByFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [endOfList, setEndOfList] = useState(false);

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const fetchPosts = useCallback(async () => {
    try {
      if (endOfList) {
        return; // No hace nada si ya se ha alcanzado el final de la lista
      }

      const response = await axios.get(
        `${apiUrl}/api/posts/feed?offset=${index}&limit=5`,
        { withCredentials: true }
      );

      console.log(response);
      console.log(index);

      if (response.data.length === 0) {
        setEndOfList(true); // No hay más posts, marca el final de la lista
      } else {
        setFeedPosts((prevPosts) => [...prevPosts, ...response.data]);
        setIndex((prevIndex) => prevIndex + response.data.length);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error:", error.message);
      setLoading(false);
    }
  }, [index, loading, endOfList]);

  const filterPostByFilter = useCallback(
    (filter) => {
      if (filter === "all") {
        setFilteredPostsByFilter(feedPosts);
      } else {
        const filteredPosts = feedPosts.filter(
          (post) => post.author.profile === filter
        );
        setFilteredPostsByFilter(filteredPosts);
      }
    },
    [feedPosts]
  );

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiUrl}/api/posts/feed?offset=0&limit=5`,
          { withCredentials: true }
        );
        setFeedPosts(response.data);
        setIndex(response.data.length); // Ajusta el índice al tamaño de la respuesta inicial
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    filterPostByFilter(currentFilter);
  }, [currentUser, currentFilter, filterPostByFilter]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (!endOfList && scrollTop + clientHeight >= scrollHeight - 20) {
        fetchPosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchPosts]);

  return (
    <PostContext.Provider
      value={{
        loading,
        fetchPosts,
        feedPosts,
        filteredPostsByFilter,
        filterPostByFilter,
        currentFilter,
        handleFilterChange,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  return useContext(PostContext);
};
