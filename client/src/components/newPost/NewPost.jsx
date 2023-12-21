import { useContext, useState } from "react";
import useUserImage from "../../hooks/useUserImage";
import Styles from "./newPost.module.css";
import { VscVmRunning } from "react-icons/vsc";
import { AuthContext } from "../../context/authContext";
import Input from "../input/Input";
import axios from "axios";

const NewPost = () => {
  const { currentUser } = useContext(AuthContext);
  const { userImage } = useUserImage(currentUser);
  const [newPostContent, setNewPostContent] = useState("");
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

  const handleSendClick = async () => {

    try {
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
      const formData = new FormData();
      formData.append('author', currentUser._id);
      formData.append('content', newPostContent);

      if (selectedImage) {
        formData.append('media', selectedImage);
      }

      await axios.post(`${apiUrl}/api/posts/create`, formData, { 
        headers: { 
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error al crear el nuevo post:", error.message);
      console.error("Detalles del error:", error.response.data);
    }
    setNewPostContent("");
  }

  return (
    <div className={newPost}>
      <div className={newPost_container}>
        <img src={userImage} alt="" className={user_img} />
        <Input
          type="text"
          placeholder="¿Qué estás pensando?"
          onChange={(e) => setNewPostContent(e.target.value)}
          onClick={handleSendClick}
          newPost="newPost" />
      </div>
      <div className={multimedia_Container}>
        <input type="file" className={multimedia_button} onChange={(e) => setImageData({ selectedImage: e.target.files[0] })}/>
        <VscVmRunning />
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
