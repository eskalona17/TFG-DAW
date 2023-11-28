import { useContext } from "react";
import useUserImage from "../../hooks/useUserImage";
import Styles from "./newPost.module.css";
import { VscSend, VscVmRunning, VscLocation, VscBookmark  } from "react-icons/vsc";
import { AuthContext } from "../../context/authContext";

const NewPost = () => {
  const { currentUser } = useContext(AuthContext);
  const { userImage } = useUserImage(currentUser);

  const {
    newPost,
    newPost_container,
    user_img,
    newPost_form,
    newPost_input,
    newPost_button,
    multimedia_Container,
    multimedia_button,
    icon
  } = Styles;
  
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
        <form className={newPost_form}>
          <input
            type="text"
            placeholder="¿Qué estás pensando?"
            className={newPost_input}
          />
          <button className={newPost_button}>
            <VscSend className={icon} />
          </button>
        </form>
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
