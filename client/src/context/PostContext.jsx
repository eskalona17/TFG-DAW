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
import { toast } from "react-toastify";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [feedPosts, setFeedPosts] = useState([]);
  const [filteredPostsByFilter, setFilteredPostsByFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputKey, setInputKey] = useState(Math.random().toString());
  // const { selectedImage } = imageData;


  const [newPostContent, setNewPostContent] = useState("");
  const [imageData, setImageData] = useState({
    selectedImage: null,
    imagePreview: null,
  });

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const getPosts = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/posts/feed`, {
        withCredentials: true,
      });
      if (response && response.data) {
        setFeedPosts(response.data);
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const newPost = async () => {
    try {
      const formData = new FormData();
      formData.append("content", newPostContent);

      if (imageData.selectedImage) {
        formData.append("media", imageData.selectedImage);
      }

      await axios.post(`${apiUrl}/api/posts/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      getPosts();
      toast.success("Post Publicado", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error al crear el nuevo post:", error.message);
      console.error("Detalles del error:", error.response.data);
      toast.error("Error al publicar el post", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setInputKey(Math.random().toString());
      setImageData({ selectedImage: null, imagePreview: null });
      setNewPostContent("");
    }
  };

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

  const handleDeletePost = useCallback(
    async (postId) => {
      try {
        const response = await axios.delete(
          `${apiUrl}/api/posts/delete/${postId}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          toast.success("Post eliminado correctamente", {
            position: "top-center",
            autoClose: 3000,
          });

          const updatedPosts = feedPosts.filter((post) => post._id !== postId);
          setFeedPosts(updatedPosts);
        }
      } catch (error) {
        console.error("Error al eliminar el post: ", error.message);
        toast.error("Error al borrar el post", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    },
    [feedPosts]
  );

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    // update preview of the image
    const lector = new FileReader();
    lector.onloadend = () => {
      setImageData({
        selectedImage: selectedFile,
        imagePreview: lector.result,
      });
    };

    if (selectedFile) {
      lector.readAsDataURL(selectedFile);
    } else {
      setImageData({
        selectedImage: null,
        imagePreview: null,
      });
    }
  };

  useEffect(() => {
    getPosts();
  }, [currentUser, getPosts]);

  useEffect(() => {
    filterPostByFilter(currentFilter);
  }, [currentUser, currentFilter, filterPostByFilter]);

  return (
    <PostContext.Provider
      value={{
        loading,
        newPost,
        inputKey,
        getPosts,
        feedPosts,
        filteredPostsByFilter,
        filterPostByFilter,
        currentFilter,
        handleFilterChange,
        handleDeletePost,
        newPostContent,
        setNewPostContent,
        imageData,
        setImageData,
        handleImageChange
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  return useContext(PostContext);
};
