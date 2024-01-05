import { AuthContext } from "../../context/AuthContext";
import { PostContext } from "../../context/PostContext";
import useUserImage from "../../hooks/useUserImage";
import { VscVmRunning } from "react-icons/vsc";
import { useContext, useState } from "react";
import Styles from "./newPost.module.css";
import Input from "../input/Input";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const NewPost = () => {
  const { currentUser } = useContext(AuthContext);
  const { userImage } = useUserImage(currentUser);
  const { getPosts } = useContext(PostContext);
  const [newPostContent, setNewPostContent] = useState("");
  const [inputKey, setInputKey] = useState(Math.random().toString());
  const [imageData, setImageData] = useState({
    selectedImage: null,
    imagePreview: null,
  });

  const { selectedImage } = imageData;

  const {
    newPost,
    newPost_container,
    user_img,
    multimedia_Container,
    multimedia_button,
    previewStyle,
  } = Styles;

  const handleFileButtonClick = () => {
    // Disparar el clic en el input al hacer clic en el botón
    document.getElementById("fileInput").click();
  };

  const handleSendClick = async () => {
    try {
      const formData = new FormData();
      formData.append("content", newPostContent);

      if (selectedImage) {
        formData.append("media", selectedImage);
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

  return (
    <div className={newPost}>
      <div className={newPost_container}>
        <img src={userImage} alt="" className={user_img} />
        <Input
          type="text"
          value={newPostContent}
          placeholder="¿Qué estás pensando?"
          onChange={(e) => setNewPostContent(e.target.value)}
          onClick={handleSendClick}
          className="newPost"
        />
      </div>
      <div className={multimedia_Container}>
        <input
          id="fileInput"
          key={inputKey}
          type="file"
          className={multimedia_button}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <VscVmRunning onClick={handleFileButtonClick} />
      </div>
      {imageData.selectedImage && (
        <div className={previewStyle}>
          <img src={imageData.imagePreview} alt="Preview" />
        </div>
      )}
    </div>
  );
};

export default NewPost;
