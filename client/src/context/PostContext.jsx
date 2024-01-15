import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "./hola";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [feedPosts, setFeedPosts] = useState([]);
  const [filteredPostsByFilter, setFilteredPostsByFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputKey, setInputKey] = useState(Math.random().toString());
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
      if (currentUser) {
        const response = await axios.get(`${apiUrl}/api/posts/feed`, {
          withCredentials: true,
        });
        if (response && response.data) {
          setFeedPosts(response.data);
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  const newPost = async () => {
    try {
      if (currentUser) {
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
        toast.success("Has publicado un nuevo post", {
          position: "top-center",
          autoClose: 3000, theme:"colored"
        });
      }
    } catch (error) {
      console.error("Error al crear el nuevo post:", error.message);
      console.error("Detalles del error:", error.response.data);
      toast.error("Error al publicar el post", {
        position: "top-center",
        autoClose: 3000, theme:"colored"
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
            autoClose: 3000, theme:"colored"
          });

          const updatedPosts = feedPosts.filter((post) => post._id !== postId);
          setFeedPosts(updatedPosts);
        }
      } catch (error) {
        console.error("Error al eliminar el post: ", error.message);
        toast.error("Error al borrar el post", {
          position: "top-center",
          autoClose: 3000, theme:"colored"
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
    if (currentUser) {
      getPosts();
    }
  }, [currentUser, getPosts]);

  useEffect(() => {
    if (currentUser) {
      filterPostByFilter(currentFilter);
    }
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
        handleImageChange,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  return useContext(PostContext);
};
