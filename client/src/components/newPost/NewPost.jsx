import { useContext, useState } from "react";
import useUserImage from "../../hooks/useUserImage";
import Styles from "./newPost.module.css";
import { VscVmRunning, VscLocation, VscBookmark  } from "react-icons/vsc";
import { AuthContext } from "../../context/authContext";
import Input from "../input/Input";
import axios from "axios";

const NewPost = () => {
  const { currentUser } = useContext(AuthContext);
  const { userImage } = useUserImage(currentUser);
  const [newPostContent, setNewPostContent] = useState("");

  const {
    newPost,
    newPost_container,
    user_img,
   
    multimedia_Container,
    multimedia_button,
    
  } = Styles;
  
  const handleSendClick = async () => {
    try {
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
      const response = await axios.post(
        `${apiUrl}/api/posts/create`,
        {
          author: currentUser._id,
          content: newPostContent,
        },
        { withCredentials: true }
      );

      console.log("Nuevo post creado:", response.data.newPost);

      setNewPostContent("");
    } catch (error) {
      console.error("Error al crear el nuevo post:", error.message);
    }
  }
  const handleMultimediaClick=() => {
    console.log("boton multimedia");
  };
  const handleUbicacionClick=() => {
    console.log("boton Ubicacion");
  };
  const handleEtiquetaClick=() => {
    console.log("boton Etiqueta");
  };
  return (
    <div className={newPost}>
      <div className={newPost_container}>
        <img src={userImage} alt="" className={user_img} />
        <Input 
          type="text" 
          placeholder="¿Qué estás pensando?" 
          onChange={(e) => setNewPostContent(e.target.value)}
          onClick={handleSendClick}
          newPost="newPost"/>
      </div>
      <div className={multimedia_Container}>
            <button className={multimedia_button} onClick={handleMultimediaClick}>
              <VscVmRunning />Multimedia
            </button>
            <button className={multimedia_button} onClick={handleUbicacionClick}>
              <VscLocation/>Ubicación
            </button>
            <button className={multimedia_button} onClick={handleEtiquetaClick}>
              <VscBookmark/>Etiqueta
            </button>
      </div>
    </div>
  );
};

export default NewPost;
