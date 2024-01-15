import { useContext } from "react";
import Styles from "@/components/newPost/newPost.module.css";
import Input from "@/components/input/Input";
import { AuthContext } from "@/context/AuthContext";
import { PostContext } from "@/context/PostContext";
import useUserImage from "@/hooks/useUserImage";
import { VscVmRunning } from "react-icons/vsc";

const NewPost = () => {
  const { currentUser } = useContext(AuthContext);
  const { userImage } = useUserImage(currentUser);
  const {
    newPost,
    inputKey,
    handleImageChange,
    newPostContent,
    setNewPostContent,
    imageData,
    // setImageData,
  } = useContext(PostContext);


  const {
    newPost_container,
    newPost_content,
    user_img,
    multimedia_Container,
    multimedia_button,
    previewStyle,
  } = Styles;

  const handleFileButtonClick = () => {
    // Disparar el clic en el input al hacer clic en el botón
    document.getElementById("fileInput").click();
  };


  return (
    <div className={newPost_container}>
      <div className={newPost_content}>
        <img src={userImage} alt="" className={user_img} />
        <Input
          type="text"
          value={newPostContent}
          placeholder="¿Qué estás pensando?"
          onChange={(e) => setNewPostContent(e.target.value)}
          onClick={newPost}
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
